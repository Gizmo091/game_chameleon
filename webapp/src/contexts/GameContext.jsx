import { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(() => {
    // Try to restore from localStorage on initial load
    try {
      const saved = localStorage.getItem('chameleon-game-state');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to restore game state:', error);
    }
    
    return {
      gameCode: null,
      gameId: null,
      playerId: null,
      pseudo: null,
      password: null,
      players: [],
      hostId: null,
      status: 'waiting',
      yourWord: null,
      chameleonId: null,
      mainWord: null,
      decoyWord: null
    };
  });

  const updateGameState = (newState) => {
    setGameState(prev => {
      const updated = { ...prev, ...newState };
      // Save to localStorage whenever state changes
      try {
        localStorage.setItem('chameleon-game-state', JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save game state:', error);
      }
      return updated;
    });
  };

  const resetGame = () => {
    const emptyState = {
      gameCode: null,
      gameId: null,
      playerId: null,
      pseudo: null,
      password: null,
      players: [],
      hostId: null,
      status: 'waiting',
      yourWord: null,
      chameleonId: null,
      mainWord: null,
      decoyWord: null
    };
    setGameState(emptyState);
    // Clear localStorage when resetting
    try {
      localStorage.removeItem('chameleon-game-state');
    } catch (error) {
      console.error('Failed to clear game state:', error);
    }
  };

  return (
    <GameContext.Provider value={{ gameState, updateGameState, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};