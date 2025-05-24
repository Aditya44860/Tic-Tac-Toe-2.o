import React, { createContext, useState, useContext, useEffect } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [player1, setPlayer1] = useState("Player 1");
  const [player2, setPlayer2] = useState("Player 2");
  const [player1Characters, setPlayer1Characters] = useState([]);
  const [player2Characters, setPlayer2Characters] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  return (
    <GameContext.Provider value={{ 
      player1, 
      setPlayer1, 
      player2, 
      setPlayer2,
      player1Characters,
      setPlayer1Characters,
      player2Characters,
      setPlayer2Characters,
      player1Score,
      setPlayer1Score,
      player2Score,
      setPlayer2Score
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