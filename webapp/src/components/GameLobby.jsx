import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QRCode from 'qrcode';
import { useSocket } from '../contexts/SocketContext';
import { useGame } from '../contexts/GameContext';
import { t } from '../utils/i18n';
import Toast from './Toast';

function GameLobby({ lang }) {
  const { gameCode, playerId: urlPlayerId, pseudo: urlPseudo } = useParams();
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { gameState, updateGameState, resetGame } = useGame();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [previousPlayerCount, setPreviousPlayerCount] = useState(0);
  const [toasts, setToasts] = useState([]);
  
  const isHost = gameState.playerId === gameState.hostId;

  const openShareModal = async () => {
    try {
      const joinUrl = `${window.location.origin}/?join=${gameCode}`;
      const qrDataUrl = await QRCode.toDataURL(joinUrl);
      setQrCode(qrDataUrl);
      setShowModal(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  useEffect(() => {
    if (!socket) return;

    let mounted = true;
    let hasJoined = false;

    // First, handle player info restoration from URL
    if (urlPlayerId && urlPseudo) {
      const decodedPseudo = decodeURIComponent(urlPseudo);
      if (!gameState.playerId || gameState.playerId !== urlPlayerId || gameState.gameCode !== gameCode) {
        updateGameState({
          gameCode,
          playerId: urlPlayerId,
          pseudo: decodedPseudo,
          password: gameState.password || null
        });
      }
    }

    // Set up event listeners
    const handleRoomUpdate = ({ players, hostId }) => {
      if (mounted) {
        const prevCount = gameState.players.length;
        updateGameState({ players, hostId });
        
        // Auto-show modal for host when alone, ONLY if it's the initial state (coming from 0 players)
        if (gameState.playerId === hostId && players.length === 1 && prevCount === 0) {
          openShareModal();
        }
        
        setPreviousPlayerCount(players.length);
      }
    };

    const handleGameStarted = () => {
      if (!mounted) return;
      const currentPlayerId = gameState.playerId || urlPlayerId;
      const currentPseudo = gameState.pseudo || decodeURIComponent(urlPseudo || '');
      navigate(`/play/${gameCode}/${currentPlayerId}/${encodeURIComponent(currentPseudo)}`);
    };

    const handleGameStatus = ({ status }) => {
      if (!mounted) return;
      if (status === 'playing') {
        const currentPlayerId = gameState.playerId || urlPlayerId;
        const currentPseudo = gameState.pseudo || decodeURIComponent(urlPseudo || '');
        navigate(`/play/${gameCode}/${currentPlayerId}/${encodeURIComponent(currentPseudo)}`);
      }
    };

    const handleError = ({ message }) => {
      console.error('Socket error:', message);
      console.log('Current gameState:', gameState);
      console.log('URL params:', { urlPlayerId, urlPseudo, gameCode });
      if (mounted && (message === 'Game not found' || message === 'Wrong password' || message === 'Game ended')) {
        resetGame();
        navigate('/');
      }
    };

    const handleHostLeft = ({ message }) => {
      console.log('Host left the game:', message);
      if (mounted) {
        resetGame();
        navigate('/');
      }
    };

    const handlePlayerLeft = ({ playerName }) => {
      if (mounted) {
        const message = `${playerName} ${t(lang, 'lobby.playerLeft')}`;
        addToast(message, 'info');
      }
    };

    socket.on('room:update', handleRoomUpdate);
    socket.on('game:started', handleGameStarted);
    socket.on('game:status', handleGameStatus);
    socket.on('host:left', handleHostLeft);
    socket.on('player:left', handlePlayerLeft);
    socket.on('error', handleError);

    // Only join once per socket connection
    const currentPlayerId = gameState.playerId || urlPlayerId;
    const currentPseudo = gameState.pseudo || decodeURIComponent(urlPseudo || '');

    if (currentPlayerId && currentPseudo && !hasJoined) {
      hasJoined = true;
      console.log(`Attempting to join game ${gameCode} as ${currentPlayerId} (${currentPseudo})`);
      console.log('Current gameState before join:', gameState);
      
      socket.emit('joinGame', {
        gameCode,
        playerId: currentPlayerId,
        pseudo: currentPseudo,
        password: gameState.password
      });
    } else if (!urlPlayerId || !urlPseudo) {
      // Only navigate away if URL params are also missing (not just gameState)
      console.log('Missing URL params, navigating home:', { urlPlayerId, urlPseudo });
      navigate('/');
      return;
    } else {
      console.log('Waiting for gameState or socket reconnection...');
    }

    return () => {
      mounted = false;
      socket.off('room:update', handleRoomUpdate);
      socket.off('game:started', handleGameStarted);
      socket.off('game:status', handleGameStatus);
      socket.off('host:left', handleHostLeft);
      socket.off('player:left', handlePlayerLeft);
      socket.off('error', handleError);
    };
  }, [socket]);

  const handleStartGame = async () => {
    if (!isHost || gameState.players.length < 3) return;
    
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/parties/${gameCode}/start`, {
        method: 'POST'
      });
      
      if (!response.ok) {
        console.error('Failed to start game');
      }
    } catch (error) {
      console.error('Error starting game:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveGame = () => {
    socket.emit('leaveGame');
    resetGame();
    navigate('/');
  };

  return (
    <div className="game-lobby">
      <div className="lobby-header">
        <h2>{t(lang, 'lobby.title')}</h2>
        <button 
          onClick={openShareModal}
          className="btn-secondary btn-small"
        >
          {t(lang, 'game.shareGame')}
        </button>
      </div>
      
      <div className="players-list">
        <h3>{t(lang, 'lobby.players')} ({gameState.players.length})</h3>
        <ul>
          {gameState.players.map(player => (
            <li key={player.id}>
              {player.pseudo}
              {player.id === gameState.hostId && ' 👑'}
              {player.id === gameState.playerId && ' (You)'}
            </li>
          ))}
        </ul>
      </div>
      
      {gameState.players.length < 3 && (
        <p className="waiting-message">{t(lang, 'lobby.waitingForPlayers')}</p>
      )}
      
      {isHost && (
        <div className="host-controls">
          <p>{t(lang, 'lobby.youAreHost')}</p>
          
          <div className="host-buttons">
            <button 
              onClick={handleStartGame}
              disabled={gameState.players.length < 3 || loading}
              className="btn-primary"
            >
              {gameState.players.length < 3 
                ? t(lang, 'lobby.needMorePlayers')
                : loading ? '...' : t(lang, 'lobby.startGame')
              }
            </button>

            <button 
              onClick={handleLeaveGame}
              className="btn-danger"
            >
              {t(lang, 'lobby.leaveGame')}
            </button>
          </div>
        </div>
      )}

      {!isHost && (
        <div className="player-controls">
          <button 
            onClick={handleLeaveGame}
            className="btn-secondary"
          >
            {t(lang, 'lobby.leaveGame')}
          </button>
        </div>
      )}

      {/* Share Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{t(lang, 'game.shareGame')}</h3>
              <button onClick={closeModal} className="modal-close">×</button>
            </div>
            <div className="modal-body">
              <div className="share-code">
                <span className="share-label">{t(lang, 'game.gameCode')}:</span>
                <div className="game-code-large">{gameCode}</div>
              </div>
              {qrCode && (
                <div className="share-qr">
                  <div>{t(lang, 'lobby.scanToJoin')}</div>
                  <img src={qrCode} alt="QR Code" className="qr-code-large" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast notifications */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

export default GameLobby;