import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { t, translations } from '../utils/i18n';

function Home({ lang, setLang }) {
  const navigate = useNavigate();
  const { gameState } = useGame();

  useEffect(() => {
    const joinCode = sessionStorage.getItem('joinCode');
    if (joinCode) {
      sessionStorage.removeItem('joinCode');
      navigate('/join', { state: { gameCode: joinCode } });
      return;
    }

    // If user has an active game, redirect back to it
    if (gameState.playerId && gameState.pseudo && gameState.gameCode) {
      if (gameState.status === 'playing' || gameState.yourWord) {
        navigate(`/play/${gameState.gameCode}/${gameState.playerId}/${encodeURIComponent(gameState.pseudo)}`);
      } else {
        navigate(`/player/${gameState.gameCode}/${gameState.playerId}/${encodeURIComponent(gameState.pseudo)}`);
      }
    }
  }, [navigate, gameState]);

  return (
    <div className="home">
      <h1>{t(lang, 'home.title')}</h1>
      
      <div className="language-selector">
        <label>{t(lang, 'home.language')}: </label>
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <div className="home-buttons">
        <button onClick={() => navigate('/create')} className="btn-primary">
          {t(lang, 'home.createGame')}
        </button>
        <button onClick={() => navigate('/join')} className="btn-secondary">
          {t(lang, 'home.joinGame')}
        </button>
      </div>

      <div className="game-rules">
        <h2>{t(lang, 'home.rulesTitle')}</h2>
        <div className="rules-list">
          {(translations[lang] || translations['en']).home.rules.map((rule, i) => (
            <div key={i} className="rule-step">
              <span className="rule-number">{i + 1}</span>
              <p className="rule-text">{rule}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;