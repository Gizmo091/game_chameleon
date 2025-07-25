import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { t } from '../utils/i18n';
import QRScanner from './QRScanner';

function JoinGame({ lang }) {
  const [pseudo, setPseudo] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { updateGameState } = useGame();

  useEffect(() => {
    if (location.state?.gameCode) {
      setGameCode(location.state.gameCode);
    }
  }, [location.state]);

  const handleJoin = async () => {
    if (!pseudo.trim() || !gameCode.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/parties/${gameCode}`);
      
      if (!response.ok) {
        setError(t(lang, 'join.invalidCode'));
        return;
      }
      
      const data = await response.json();
      const playerId = `player_${Date.now()}`;
      
      updateGameState({ 
        gameCode,
        gameId: data.gameId,
        playerId,
        pseudo,
        password: password.trim() || null
      });
      
      navigate(`/player/${gameCode}/${playerId}/${encodeURIComponent(pseudo)}`);
      
    } catch (error) {
      console.error('Error joining game:', error);
      setError(t(lang, 'join.invalidCode'));
    } finally {
      setLoading(false);
    }
  };

  const handleQRScan = (code) => {
    setGameCode(code);
    setShowScanner(false);
  };

  const handleScanError = (err) => {
    console.error('QR scan error:', err);
    setError(t(lang, 'join.scanError'));
    setShowScanner(false);
  };

  return (
    <div className="join-game">
      <h2>{t(lang, 'join.title')}</h2>
      
      <div className="join-form">
        <input
          type="text"
          placeholder={t(lang, 'join.yourName')}
          name="firstname"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          maxLength={20}
        />
        
        <input
          type="tel"
          placeholder={t(lang, 'join.gameCode')}
          value={gameCode}
          onChange={(e) => setGameCode(e.target.value.toUpperCase())}
          maxLength={4}
        />
        
        <input
          type="password"
          placeholder={t(lang, 'join.password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={50}
        />
        
        {error && <p className="error">{error}</p>}
        
        <button 
          onClick={handleJoin} 
          disabled={!pseudo.trim() || !gameCode.trim() || loading}
          className="btn-primary"
        >
          {loading ? '...' : t(lang, 'join.join')}
        </button>
        
        <button 
          onClick={() => setShowScanner(true)}
          className="btn-secondary"
          disabled={loading}
        >
          {t(lang, 'join.scanQR')}
        </button>
      </div>
      
      {showScanner && (
        <QRScanner 
          onScan={handleQRScan}
          onError={handleScanError}
          onClose={() => setShowScanner(false)}
          lang={lang}
        />
      )}
    </div>
  );
}

export default JoinGame;