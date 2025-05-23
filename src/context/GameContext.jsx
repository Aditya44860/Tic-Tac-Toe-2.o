import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [player1, setPlayer1] = useState("Player1");
  const [player2, setPlayer2] = useState("Player2");
  const [player1Characters, setPlayer1Characters] = useState([]);
  const [player2Characters, setPlayer2Characters] = useState([]);

  return (
    <GameContext.Provider value={{ 
      player1, 
      setPlayer1, 
      player2, 
      setPlayer2,
      player1Characters,
      setPlayer1Characters,
      player2Characters,
      setPlayer2Characters
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};