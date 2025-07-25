import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';
import { t } from '../utils/i18n';

function CreateGame({ lang }) {
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateGameState } = useGame();

  const handleCreate = async () => {
    if (!pseudo.trim()) return;
    
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/parties?lang=${lang}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.trim() || null })
      });
      
      const data = await response.json();
      
      // Skip intermediate step, go directly to lobby
      const playerId = `player_${Date.now()}`;
      updateGameState({ 
        gameCode: data.gameCode,
        playerId,
        pseudo,
        password: password.trim() || null
      });
      navigate(`/player/${data.gameCode}/${playerId}/${encodeURIComponent(pseudo)}`);
      
    } catch (error) {
      console.error('Error creating game:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-game">
      <h2>{t(lang, 'create.title')}</h2>
      
      <div className="create-form">
        <input
          type="text"
          placeholder={t(lang, 'create.yourName')}
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          maxLength={20}
        />
        <input
          type="password"
          placeholder={t(lang, 'create.password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={50}
        />
        <button 
          onClick={handleCreate} 
          disabled={!pseudo.trim() || loading}
          className="btn-primary"
        >
          {loading ? '...' : t(lang, 'create.create')}
        </button>
      </div>
    </div>
  );
}

export default CreateGame;