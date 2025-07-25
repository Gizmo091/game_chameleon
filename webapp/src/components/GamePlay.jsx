import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QRCode from 'qrcode';
import { useSocket } from '../contexts/SocketContext';
import { useGame } from '../contexts/GameContext';
import { t } from '../utils/i18n';
import Toast from './Toast';
import './GamePlay.css';

function GamePlay({ lang }) {
  const { gameCode, playerId: urlPlayerId, pseudo: urlPseudo } = useParams();
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { gameState, updateGameState, resetGame } = useGame();
  const [loading, setLoading] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [isSpectating, setIsSpectating] = useState(false);
  const [spectateMessage, setSpectateMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [showWord, setShowWord] = useState(false);
  const [toasts, setToasts] = useState([]);
  
  const isHost = gameState.playerId === gameState.hostId;

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
    const handleGameWord = ({ yourWord }) => {
      if (mounted) {
        updateGameState({ yourWord, status: 'playing' });
        setIsRestarting(false); // Hide transition screen when new word arrives
        setIsSpectating(false); // Exit spectator mode when getting a word
        setSpectateMessage('');
      }
    };

    const handleGameEnded = ({ chameleonId, mainWord, decoyWord }) => {
      if (mounted) {
        updateGameState({ chameleonId, mainWord, decoyWord, status: 'ended' });
        setGameEnded(true);
      }
    };

    const handleGameRestarted = ({ status }) => {
      if (mounted) {
        updateGameState({ 
          yourWord: null, 
          chameleonId: null, 
          mainWord: null, 
          decoyWord: null, 
          status: status || 'waiting'
        });
        setGameEnded(false);
        setLoading(false);
        setIsRestarting(true); // Show transition screen
      }
    };

    const handleGameStatus = ({ status }) => {
      if (mounted) updateGameState({ status });
    };

    const handleGameSpectate = ({ message, status }) => {
      if (mounted) {
        setIsSpectating(true);
        setSpectateMessage(message);
        updateGameState({ status });
      }
    };

    const handleError = ({ message }) => {
      console.error('Game error:', message);
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

    socket.on('game:word', handleGameWord);
    socket.on('game:ended', handleGameEnded);
    socket.on('game:restarted', handleGameRestarted);
    socket.on('game:status', handleGameStatus);
    socket.on('game:spectate', handleGameSpectate);
    socket.on('host:left', handleHostLeft);
    socket.on('player:left', handlePlayerLeft);
    socket.on('error', handleError);

    // Only join once per socket connection
    const currentPlayerId = gameState.playerId || urlPlayerId;
    const currentPseudo = gameState.pseudo || decodeURIComponent(urlPseudo || '');

    if (currentPlayerId && currentPseudo && !hasJoined) {
      hasJoined = true;
      console.log(`Attempting to join game ${gameCode} as ${currentPlayerId} (${currentPseudo})`);
      
      socket.emit('joinGame', {
        gameCode,
        playerId: currentPlayerId,
        pseudo: currentPseudo,
        password: gameState.password
      });
    } else if (!currentPlayerId || !currentPseudo) {
      navigate('/');
      return;
    }

    return () => {
      mounted = false;
      socket.off('game:word', handleGameWord);
      socket.off('game:ended', handleGameEnded);
      socket.off('game:restarted', handleGameRestarted);
      socket.off('game:status', handleGameStatus);
      socket.off('game:spectate', handleGameSpectate);
      socket.off('host:left', handleHostLeft);
      socket.off('player:left', handlePlayerLeft);
      socket.off('error', handleError);
    };
  }, [socket]);

  const handleEndGame = async () => {
    if (!isHost) return;
    
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/parties/${gameCode}/end`, {
        method: 'POST'
      });
      
      if (!response.ok) {
        console.error('Failed to end game');
      }
    } catch (error) {
      console.error('Error ending game:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayAgain = async () => {
    if (!isHost) return;
    
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/parties/${gameCode}/restart`, {
        method: 'POST'
      });
      
      if (!response.ok) {
        console.error('Failed to restart game');
      }
    } catch (error) {
      console.error('Error restarting game:', error);
    } finally {
      setLoading(false);
    }
  };

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

  // Word reveal handlers
  const handleWordPress = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowWord(true);
  };

  const handleWordRelease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowWord(false);
  };

  // Global mouse/touch handlers to ensure word is hidden when releasing outside
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setShowWord(false);
    };

    const handleGlobalTouchEnd = () => {
      setShowWord(false);
    };

    if (showWord) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchend', handleGlobalTouchEnd);
      
      return () => {
        document.removeEventListener('mouseup', handleGlobalMouseUp);
        document.removeEventListener('touchend', handleGlobalTouchEnd);
      };
    }
  }, [showWord]);

  const handleBackToHome = () => {
    socket.emit('leaveGame');
    resetGame();
    navigate('/');
  };

  // Transition screen during restart
  if (isRestarting) {
    return (
      <div className="game-transition">
        <h2>{t(lang, 'game.preparing')}</h2>
        <div className="transition-animation">
          <p>{t(lang, 'game.newRound')}</p>
          <div className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
      </div>
    );
  }

  if (gameEnded) {
    const chameleon = gameState.players.find(p => p.id === gameState.chameleonId);
    
    return (
      <div className="game-results">
        <h2>{t(lang, 'results.chameleonWas')}</h2>
        <div className="chameleon-reveal">{chameleon?.pseudo || 'Unknown'}</div>
        
        <div className="words-reveal">
          <p><strong>{t(lang, 'results.mainWord')}</strong> {gameState.mainWord}</p>
          <p><strong>{t(lang, 'results.decoyWord')}</strong> {gameState.decoyWord}</p>
        </div>
        
        <div className="result-actions">
          {isHost ? (
            <button onClick={handlePlayAgain} disabled={loading} className="btn-primary">
              {loading ? '...' : t(lang, 'results.playAgain')}
            </button>
          ) : (
            <p>{t(lang, 'results.waitingForHost')}</p>
          )}
          <button onClick={handleBackToHome} className="btn-secondary">
            {t(lang, 'results.backToHome')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-play">
      <div className="game-header">
        <h2>{t(lang, 'game.gameInProgress')}</h2>
        <button 
          onClick={openShareModal}
          className="btn-secondary btn-small"
        >
          {t(lang, 'game.shareGame')}
        </button>
      </div>
      
      {isSpectating ? (
        <div className="spectator-mode">
          <h3>{t(lang, 'game.spectatorMode')}</h3>
          <p>{spectateMessage}</p>
          <p>{t(lang, 'game.spectatorInfo')}</p>
        </div>
      ) : gameState.yourWord ? (
        <div className="word-display">
          <p>{t(lang, 'game.yourWordIs')}</p>
          <div className="word-reveal-container">
            {showWord ? (
              <div className="word">{gameState.yourWord}</div>
            ) : (
              <div className="word-hidden">
                <span>{t(lang, 'game.wordHidden')}</span>
              </div>
            )}
            <button 
              className="btn-reveal"
              onMouseDown={handleWordPress}
              onMouseUp={handleWordRelease}
              onMouseLeave={handleWordRelease}
              onTouchStart={handleWordPress}
              onTouchEnd={handleWordRelease}
              onContextMenu={(e) => e.preventDefault()}
              style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
            >
              {t(lang, 'game.holdToReveal')}
            </button>
          </div>
        </div>
      ) : (
        <p>{t(lang, 'game.waitingToStart')}</p>
      )}
      
      <div className="players-in-game">
        <h3>{t(lang, 'lobby.players')}</h3>
        <div className="players-badges">
          {(() => {
            const currentPlayerId = gameState.playerId || urlPlayerId;
            
            // Tri des joueurs selon la logique demandée
            const sortedPlayers = [...gameState.players].sort((a, b) => {
              // 1. "You" en premier
              if (a.id === currentPlayerId) return -1;
              if (b.id === currentPlayerId) return 1;
              
              // 2. Host en second (sauf si c'est "You")
              if (a.id === gameState.hostId && a.id !== currentPlayerId) return -1;
              if (b.id === gameState.hostId && b.id !== currentPlayerId) return 1;
              
              // 3. Ordre alphabétique pour les autres
              return a.pseudo.localeCompare(b.pseudo);
            });

            return sortedPlayers.map(player => {
              const isYou = player.id === currentPlayerId;
              const isHost = player.id === gameState.hostId;
              
              return (
                <span 
                  key={player.id} 
                  className={`player-badge ${isYou ? 'player-badge-you' : 'player-badge-other'}`}
                >
                  {player.pseudo}
                  {isHost && ' 👑'}
                  {isYou && ' (You)'}
                </span>
              );
            });
          })()}
        </div>
      </div>
      
      {isHost && !isSpectating && gameState.yourWord && (
        <div className="host-controls">
          <button 
            onClick={handleEndGame}
            disabled={loading}
            className="btn-danger"
          >
            {loading ? '...' : t(lang, 'game.revealChameleon')}
          </button>
        </div>
      )}

      {!isSpectating && gameState.yourWord && (
        <div className="player-controls">
          <button 
            onClick={handleBackToHome}
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
              <button className="modal-close" onClick={closeModal}>×</button>
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

export default GamePlay;