import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import CreateGame from './components/CreateGame';
import JoinGame from './components/JoinGame';
import GameLobby from './components/GameLobby';
import GamePlay from './components/GamePlay';
import { SocketProvider } from './contexts/SocketContext';
import { GameProvider } from './contexts/GameContext';
import './App.css';

function App() {
  const [lang, setLang] = useState(() => {
    // Restore language from localStorage, fallback to browser language then 'en'
    try {
      const saved = localStorage.getItem('chameleon-language');
      if (saved) return saved;
      
      // Try to detect browser language
      const browserLang = navigator.language?.split('-')[0];
      return ['en', 'fr'].includes(browserLang) ? browserLang : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const joinCode = urlParams.get('join');
    if (joinCode) {
      sessionStorage.setItem('joinCode', joinCode);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleSetLang = (newLang) => {
    setLang(newLang);
    try {
      localStorage.setItem('chameleon-language', newLang);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  };

  return (
    <SocketProvider>
      <GameProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home lang={lang} setLang={handleSetLang} />} />
              <Route path="/create" element={<CreateGame lang={lang} />} />
              <Route path="/join" element={<JoinGame lang={lang} />} />
              <Route path="/lobby/:gameCode" element={<GameLobby lang={lang} />} />
              <Route path="/game/:gameCode" element={<GamePlay lang={lang} />} />
              <Route path="/player/:gameCode/:playerId/:pseudo" element={<GameLobby lang={lang} />} />
              <Route path="/play/:gameCode/:playerId/:pseudo" element={<GamePlay lang={lang} />} />
            </Routes>
          </div>
        </Router>
      </GameProvider>
    </SocketProvider>
  );
}

export default App;