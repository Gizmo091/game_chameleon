const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const wordsDatabase = require('./words-database');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

const games = {};

function generateGameCode() {
  let code;
  do {
    code = Math.floor(1000 + Math.random() * 9000).toString();
  } while (games[code]);
  return code;
}

function getRandomWords(lang = 'en') {
  const langWords = wordsDatabase[lang] || wordsDatabase['en'];
  const categories = Object.keys(langWords);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const categoryWords = langWords[randomCategory];
  return categoryWords[Math.floor(Math.random() * categoryWords.length)];
}

app.post('/parties', (req, res) => {
  const lang = req.query.lang || req.headers['accept-language']?.split(',')[0]?.substring(0, 2) || 'en';
  const { password } = req.body;
  const gameCode = generateGameCode();
  const gameId = `game_${Date.now()}`;
  const words = getRandomWords(lang);
  
  games[gameCode] = {
    gameId,
    gameCode,
    mainWord: words.main,
    decoyWord: words.decoy,
    players: [],
    chameleonId: null,
    status: 'waiting',
    hostId: null,
    createdAt: new Date(),
    lang,
    password: password || null
  };
  
  res.json({ gameCode, gameId });
});

app.get('/parties/:gameCode', (req, res) => {
  const { gameCode } = req.params;
  const game = games[gameCode];
  
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  
  const safeGame = {
    gameId: game.gameId,
    gameCode: game.gameCode,
    players: game.players.map(p => ({ id: p.id, pseudo: p.pseudo })),
    status: game.status,
    hostId: game.hostId
  };
  
  res.json(safeGame);
});

app.post('/parties/:gameCode/start', (req, res) => {
  const { gameCode } = req.params;
  const game = games[gameCode];
  
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  
  if (game.status !== 'waiting') {
    return res.status(400).json({ error: 'Game already started' });
  }
  
  if (game.players.length < 3) {
    return res.status(400).json({ error: 'Need at least 3 players' });
  }
  
  const chameleonIndex = Math.floor(Math.random() * game.players.length);
  game.chameleonId = game.players[chameleonIndex].id;
  game.status = 'playing';
  
  game.players.forEach((player, index) => {
    const socket = io.sockets.sockets.get(player.socketId);
    if (socket) {
      const word = index === chameleonIndex ? game.decoyWord : game.mainWord;
      socket.emit('game:word', { yourWord: word });
    }
  });
  
  io.to(gameCode).emit('game:started', { status: 'playing' });
  
  res.json({ success: true });
});

app.post('/parties/:gameCode/end', (req, res) => {
  const { gameCode } = req.params;
  const game = games[gameCode];
  
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  
  if (game.status !== 'playing') {
    return res.status(400).json({ error: 'Game not in progress' });
  }
  
  game.status = 'ended';
  
  io.to(gameCode).emit('game:ended', { 
    chameleonId: game.chameleonId,
    mainWord: game.mainWord,
    decoyWord: game.decoyWord
  });
  
  res.json({ chameleonId: game.chameleonId });
});

app.post('/parties/:gameCode/restart', (req, res) => {
  const { gameCode } = req.params;
  const game = games[gameCode];
  
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  
  if (game.status !== 'ended') {
    return res.status(400).json({ error: 'Game not ended' });
  }
  
  // Generate new words for the restart
  const words = getRandomWords(game.lang);
  game.mainWord = words.main;
  game.decoyWord = words.decoy;
  
  // Reset game to waiting state first
  game.status = 'waiting';
  game.chameleonId = null;
  
  console.log(`Game ${gameCode} restarted, back to lobby`);
  
  // Notify all players to go back to lobby
  io.to(gameCode).emit('game:restarted', { status: 'waiting' });
  
  // Auto-start the game after a short delay to let clients navigate to lobby
  setTimeout(() => {
    const currentGame = games[gameCode];
    if (currentGame && currentGame.status === 'waiting' && currentGame.players.length >= 3) {
      console.log(`Auto-starting restarted game ${gameCode}`);
      
      // Reset all players joinedDuringGame flag so everyone can play
      currentGame.players.forEach(player => {
        player.joinedDuringGame = false;
      });
      
      // Select new chameleon
      const chameleonIndex = Math.floor(Math.random() * currentGame.players.length);
      currentGame.chameleonId = currentGame.players[chameleonIndex].id;
      currentGame.status = 'playing';
      
      // Send new words to all players
      currentGame.players.forEach((player, index) => {
        const socket = io.sockets.sockets.get(player.socketId);
        if (socket) {
          const word = index === chameleonIndex ? currentGame.decoyWord : currentGame.mainWord;
          socket.emit('game:word', { yourWord: word });
        }
      });
      
      io.to(gameCode).emit('game:started', { status: 'playing' });
    }
  }, 1000); // 1 second delay
  
  res.json({ success: true });
});

io.on('connection', (socket) => {
  console.log('New connection:', socket.id);
  
  socket.on('joinGame', ({ gameCode, playerId, pseudo, password }) => {
    console.log(`Player ${playerId} (${pseudo}) trying to join game ${gameCode}`);
    console.log(`Available games:`, Object.keys(games));
    
    const game = games[gameCode];
    
    if (!game) {
      console.log(`Game ${gameCode} not found`);
      socket.emit('error', { message: 'Game not found' });
      return;
    }
    
    if (game.password && game.password !== password) {
      console.log(`Wrong password for game ${gameCode}`);
      socket.emit('error', { message: 'Wrong password' });
      return;
    }
    
    // Allow rejoining if player already exists in the game
    const existingPlayer = game.players.find(p => p.id === playerId);
    
    // Allow new players to join during game (they become spectators until next round)
    if (!existingPlayer && game.status === 'ended') {
      console.log(`Game ${gameCode} already ended, cannot join`);
      socket.emit('error', { message: 'Game ended' });
      return;
    }
    
    socket.join(gameCode);
    
    if (existingPlayer) {
      existingPlayer.socketId = socket.id;
      console.log(`Player ${playerId} reconnected to game ${gameCode}`);
      
      // Cancel cleanup timer since someone reconnected
      if (game.cleanupTimer) {
        clearTimeout(game.cleanupTimer);
        game.cleanupTimer = null;
        console.log(`Cancelled cleanup timer for game ${gameCode}`);
      }
      
      // Cancel host disconnect timer if host reconnected
      if (game.hostId === playerId && game.hostDisconnectTimer) {
        clearTimeout(game.hostDisconnectTimer);
        game.hostDisconnectTimer = null;
        console.log(`Cancelled host disconnect timer for game ${gameCode}`);
      }
    } else {
      const player = {
        id: playerId || `player_${Date.now()}_${Math.random()}`,
        pseudo,
        socketId: socket.id,
        joinedDuringGame: game.status === 'playing' // Mark if joined during game
      };
      
      if (game.players.length === 0) {
        game.hostId = player.id;
      }
      
      game.players.push(player);
      console.log(`New player ${playerId} (${pseudo}) joined game ${gameCode} (status: ${game.status})`);
    }
    
    socket.gameCode = gameCode;
    socket.playerId = playerId;
    
    // Send game state based on current status
    if (game.status === 'playing') {
      const player = game.players.find(p => p.id === playerId);
      
      if (player && !player.joinedDuringGame) {
        // Existing player gets their word
        const playerIndex = game.players.findIndex(p => p.id === playerId);
        const word = playerIndex === game.players.findIndex(p => p.id === game.chameleonId) 
          ? game.decoyWord 
          : game.mainWord;
        socket.emit('game:word', { yourWord: word });
        socket.emit('game:status', { status: 'playing' });
      } else if (player && player.joinedDuringGame) {
        // New player joined during game - they spectate until next round
        socket.emit('game:spectate', { 
          message: 'You joined during the game. You\'ll play in the next round!',
          status: 'playing'
        });
      }
    } else if (game.status === 'ended') {
      socket.emit('game:ended', { 
        chameleonId: game.chameleonId,
        mainWord: game.mainWord,
        decoyWord: game.decoyWord
      });
    } else {
      socket.emit('game:status', { status: game.status });
    }
    
    io.to(gameCode).emit('room:update', {
      players: game.players.map(p => ({ id: p.id, pseudo: p.pseudo })),
      hostId: game.hostId
    });
  });
  
  socket.on('leaveGame', () => {
    handlePlayerLeave(socket, true); // true = voluntary leave
  });
  
  socket.on('disconnect', () => {
    handlePlayerLeave(socket);
  });
});

function handlePlayerLeave(socket, isVoluntary = false) {
  const { gameCode, playerId } = socket;
  if (!gameCode || !playerId) return;
  
  const game = games[gameCode];
  if (!game) return;
  
  const isHost = game.hostId === playerId;
  console.log(`Player ${playerId} ${isHost ? '(HOST)' : ''} ${isVoluntary ? 'left' : 'disconnected from'} game ${gameCode}`);
  
  // If host leaves
  if (isHost) {
    if (isVoluntary) {
      // Host voluntarily left - eject everyone immediately
      console.log(`Host voluntarily left game ${gameCode}, ejecting all players`);
      
      io.to(gameCode).emit('host:left', { 
        message: 'Host left the game',
        gameCode 
      });
      
      delete games[gameCode];
      socket.leave(gameCode);
      return;
    }
    
    console.log(`Host disconnected from game ${gameCode}, giving time to reconnect`);
    
    // Mark host as disconnected but don't delete game immediately
    const hostPlayer = game.players.find(p => p.id === playerId);
    if (hostPlayer) {
      hostPlayer.socketId = null;
    }
    
    // Set a timer to clean up if host doesn't reconnect
    if (game.hostDisconnectTimer) {
      clearTimeout(game.hostDisconnectTimer);
    }
    
    game.hostDisconnectTimer = setTimeout(() => {
      const currentGame = games[gameCode];
      if (currentGame) {
        const currentHost = currentGame.players.find(p => p.id === playerId);
        if (currentHost && !currentHost.socketId) {
          console.log(`Host ${playerId} didn't reconnect to game ${gameCode}, ejecting all players`);
          
          // Notify all players that the host left and they should go home
          io.to(gameCode).emit('host:left', { 
            message: 'Host left the game',
            gameCode 
          });
          
          // Clean up the game
          delete games[gameCode];
        }
      }
    }, 10000); // 10 seconds grace period for host to reconnect
    
    socket.leave(gameCode);
    return;
  }
  
  // Regular player leaving
  const leavingPlayer = game.players.find(p => p.id === playerId);
  const leavingPlayerName = leavingPlayer ? leavingPlayer.pseudo : 'Unknown';
  
  if (isVoluntary) {
    // Remove player completely if leaving voluntarily
    game.players = game.players.filter(p => p.id !== playerId);
    console.log(`Player ${playerId} removed from game ${gameCode}`);
    
    // Notify other players
    socket.to(gameCode).emit('player:left', {
      playerId,
      playerName: leavingPlayerName,
      message: `${leavingPlayerName} left the game`
    });
  } else {
    // Mark as disconnected but keep in game for reconnection
    if (leavingPlayer) {
      leavingPlayer.socketId = null;
    }
  }
  
  // Only remove player and clean up if no players are connected
  const connectedPlayers = game.players.filter(p => p.socketId);
  if (connectedPlayers.length === 0) {
    console.log(`No connected players in game ${gameCode}, will clean up in 5 minutes if no reconnection`);
    // Set a timer to clean up the game if no one reconnects
    // Store the timer ID so we can cancel it if someone reconnects
    if (game.cleanupTimer) {
      clearTimeout(game.cleanupTimer);
    }
    game.cleanupTimer = setTimeout(() => {
      const currentGame = games[gameCode];
      if (currentGame && currentGame.players.filter(p => p.socketId).length === 0) {
        console.log(`Cleaning up empty game ${gameCode}`);
        delete games[gameCode];
      }
    }, 300000); // 5 minutes grace period
  } else {
    // Update room with current connected players
    io.to(gameCode).emit('room:update', {
      players: game.players.map(p => ({ id: p.id, pseudo: p.pseudo })),
      hostId: game.hostId
    });
  }
  
  socket.leave(gameCode);
}

setInterval(() => {
  const now = Date.now();
  Object.keys(games).forEach(code => {
    const game = games[code];
    if (now - game.createdAt.getTime() > 3600000) {
      delete games[code];
    }
  });
}, 300000);

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`Accessible from mobile: http://192.168.1.101:${PORT}`);
});