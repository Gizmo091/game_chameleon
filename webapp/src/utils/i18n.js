export const translations = {
  en: {
    home: {
      title: 'Chameleon Game',
      createGame: 'Create Game',
      joinGame: 'Join Game',
      language: 'Language'
    },
    create: {
      title: 'Create a New Game',
      yourName: 'Your Name',
      password: 'Password (optional)',
      create: 'Create',
      gameCodeTitle: 'Game Code',
      scanQR: 'Scan this QR code to join',
      or: 'OR',
      shareCode: 'Share this code:'
    },
    join: {
      title: 'Join a Game',
      yourName: 'Your Name',
      gameCode: 'Game Code',
      password: 'Password (if required)',
      join: 'Join',
      invalidCode: 'Invalid game code',
      scanQR: 'Scan QR Code',
      stopScan: 'Stop Scanning',
      scanError: 'Error accessing camera',
      scanning: 'Point camera at QR code...'
    },
    lobby: {
      title: 'Game Lobby',
      waitingForPlayers: 'Waiting for players...',
      players: 'Players',
      startGame: 'Start Game',
      needMorePlayers: 'Need at least 3 players to start',
      youAreHost: 'You are the host',
      showQR: 'Show QR Code',
      hideQR: 'Hide QR Code',
      scanToJoin: 'Scan to join the game',
      leaveGame: 'Leave Game',
      playerLeft: 'left the game'
    },
    game: {
      yourWord: 'Your word is:',
      yourWordIs: 'Your word is:',
      waitingToStart: 'Waiting for host to start the game...',
      gameInProgress: 'Game in progress',
      gameCode: 'Game Code',
      shareGame: 'Share Game',
      wordHidden: '***',
      holdToReveal: 'Hold to reveal word',
      endGame: 'End Game',
      revealChameleon: 'Reveal Chameleon',
      preparing: 'Preparing new round...',
      newRound: 'New words are being distributed',
      spectatorMode: 'Spectator Mode',
      spectatorInfo: 'You can watch the current round and will participate in the next one.'
    },
    results: {
      chameleonWas: 'The Chameleon was:',
      mainWord: 'Main word:',
      decoyWord: 'Decoy word:',
      playAgain: 'Play Again',
      waitingForHost: 'Waiting for host to start new game...',
      backToHome: 'Back to Home'
    }
  },
  fr: {
    home: {
      title: 'Jeu du Caméléon',
      createGame: 'Créer une partie',
      joinGame: 'Rejoindre une partie',
      language: 'Langue'
    },
    create: {
      title: 'Créer une nouvelle partie',
      yourName: 'Votre nom',
      password: 'Mot de passe (optionnel)',
      create: 'Créer',
      gameCodeTitle: 'Code de la partie',
      scanQR: 'Scannez ce QR code pour rejoindre',
      or: 'OU',
      shareCode: 'Partagez ce code :'
    },
    join: {
      title: 'Rejoindre une partie',
      yourName: 'Votre nom',
      gameCode: 'Code de la partie',
      password: 'Mot de passe (si requis)',
      join: 'Rejoindre',
      invalidCode: 'Code de partie invalide',
      scanQR: 'Scanner QR Code',
      stopScan: 'Arrêter le scan',
      scanError: 'Erreur d\'accès à la caméra',
      scanning: 'Pointez la caméra vers le QR code...'
    },
    lobby: {
      title: 'Salle d\'attente',
      waitingForPlayers: 'En attente de joueurs...',
      players: 'Joueurs',
      startGame: 'Démarrer la partie',
      needMorePlayers: 'Il faut au moins 3 joueurs pour commencer',
      youAreHost: 'Vous êtes l\'hôte',
      showQR: 'Afficher QR Code',
      hideQR: 'Masquer QR Code',
      scanToJoin: 'Scannez pour rejoindre la partie',
      leaveGame: 'Quitter la partie',
      playerLeft: 'a quitté la partie'
    },
    game: {
      yourWord: 'Votre mot est :',
      yourWordIs: 'Votre mot est :',
      waitingToStart: 'En attente du démarrage par l\'hôte...',
      gameInProgress: 'Partie en cours',
      gameCode: 'Code de la partie',
      shareGame: 'Partager la partie',
      wordHidden: '***',
      holdToReveal: 'Maintenir pour révéler',
      endGame: 'Terminer la partie',
      revealChameleon: 'Révéler le Caméléon',
      preparing: 'Préparation du nouveau tour...',
      newRound: 'Les nouveaux mots sont distribués',
      spectatorMode: 'Mode Spectateur',
      spectatorInfo: 'Vous pouvez observer le tour actuel et participerez au prochain.'
    },
    results: {
      chameleonWas: 'Le Caméléon était :',
      mainWord: 'Mot principal :',
      decoyWord: 'Mot leurre :',
      playAgain: 'Rejouer',
      waitingForHost: 'En attente que l\'hôte démarre une nouvelle partie...',
      backToHome: 'Retour à l\'accueil'
    }
  }
};

export const t = (lang, path) => {
  const keys = path.split('.');
  let value = translations[lang] || translations['en'];
  
  for (const key of keys) {
    value = value[key];
    if (!value) return path;
  }
  
  return value;
};