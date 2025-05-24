import React, { useState, useRef, useEffect } from 'react';
import { useGameContext } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);
  const [winningLine, setWinningLine] = useState(null);
  const winSound = useRef(new Audio("/sounds/win.mp3"));
  const { player1, player2, player1Characters, player2Characters } = useGameContext();
  const [currentTurn, setCurrentTurn] = useState(1);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player1Hand, setPlayer1Hand] = useState([...player1Characters]);
  const [player2Hand, setPlayer2Hand] = useState([...player2Characters]);
  const [placedCharacters, setPlacedCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const characters = [
    { id: 1, name: "Iron Man", image: "/images/ironman.png" },
    { id: 2, name: "Captain America", image: "/images/america.png" },
    { id: 3, name: "Thor", image: "/images/thor.png" },
    { id: 4, name: "Hulk", image: "/images/hulk.png" },
    { id: 5, name: "Black Widow", image: "/images/widow.png" },
    { id: 6, name: "Hawkeye", image: "/images/hawkeye.png" },
    { id: 7, name: "Spider-Man", image: "/images/spiderman.png" },
    { id: 8, name: "Doctor Strange", image: "/images/strange.png" },
    { id: 9, name: "Black Panther", image: "/images/blackpanther.png" },
    { id: 10, name: "Ant-Man", image: "/images/antman.png" },
    { id: 11, name: "Falcon", image: "/images/falcon.png" },
    { id: 12, name: "Deadpool", image: "/images/deadpool.png" },
    { id: 13, name: "Superman", image: "/images/superman.png" },
    { id: 14, name: "Batman", image: "/images/batman.png" },
    { id: 15, name: "Wonder Woman", image: "/images/wonderwoman.png" },
    { id: 16, name: "Flash", image: "/images/flash.png" },
    { id: 17, name: "Aquaman", image: "/images/aquaman.png" },
    { id: 18, name: "Green Lantern", image: "/images/greenL.png" },
    { id: 19, name: "Cyborg", image: "/images/cyborg.png" },
    { id: 20, name: "Joker", image: "/images/joker.png" },
    { id: 21, name: "Harley Quinn", image: "/images/quinn.png" },
    { id: 22, name: "Daredevil", image: "/images/daredevil.png" },
    { id: 23, name: "Wolverine", image: "/images/wolverine.png" },
    { id: 24, name: "Venom", image: "/images/venom.png" }
  ];

  const checkWinner = (boardState) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      const aPlayer = boardState[a]?.player;
      const bPlayer = boardState[b]?.player;
      const cPlayer = boardState[c]?.player;

      if (aPlayer && aPlayer === bPlayer && bPlayer === cPlayer) {
        // Play win sound
        winSound.current.play();
        
        // Set winning line for highlighting
        setWinningLine(line);
        
        // Navigate after delay
        setTimeout(() => {
          navigate('/finished', {
            state: {
              winner: aPlayer === 1 ? player1 : player2,
            },
          });
        }, 2000);
        
        return true;
      }
    }
    return false;
  };

  const handleCharacterSelect = (charId) => {
    const currentHand = currentTurn === 1 ? player1Hand : player2Hand;
    if (!currentHand.includes(charId)) return;
    setSelectedCharacter(charId);
  };

  const handleCellClick = (index) => {
    if (board[index] || !selectedCharacter) return;

    const currentHand = currentTurn === 1 ? player1Hand : player2Hand;
    const setCurrentHand = currentTurn === 1 ? setPlayer1Hand : setPlayer2Hand;

    const newHand = currentHand.filter(id => id !== selectedCharacter);
    setCurrentHand(newHand);

    const newBoard = [...board];
    const placedObject = { charId: selectedCharacter, player: currentTurn };
    newBoard[index] = placedObject;
    setBoard(newBoard);

    const newPlacedCharacters = [...placedCharacters, { ...placedObject, position: index }];
    setPlacedCharacters(newPlacedCharacters);

    const playerPlaced = newPlacedCharacters.filter(pc => pc.player === currentTurn);
    if (playerPlaced.length > 3) {
      const oldestPlaced = playerPlaced[0];
      newBoard[oldestPlaced.position] = null;
      setBoard(newBoard);
      setCurrentHand([...newHand, oldestPlaced.charId]);
      setPlacedCharacters(newPlacedCharacters.filter(pc => pc !== oldestPlaced));
    }

    if (checkWinner(newBoard)) {
      return;
    }

    setSelectedCharacter(null);
    setCurrentTurn(currentTurn === 1 ? 2 : 1);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col p-2 sm:p-4 overflow-x-hidden">
      {/* Turn indicator and help button for mobile */}
      <div className="md:hidden text-center mb-4">
        <p className="text-white font-aldrich text-lg">
          {currentTurn === 1 ? `${player1}'s turn` : `${player2}'s turn`}
        </p>
        <button 
          onClick={() => setShowHelp(true)}
          className="bg-blue-600 text-white px-3 py-1 text-sm  rounded-md font-aldrich hover:bg-blue-700 mt-4"
        >
          HELP
        </button>
      </div>
      
      <div className="flex flex-col max-w-[1200px] mx-auto w-full">
        {/* Player 1 side - horizontal on mobile, vertical on desktop */}
        <div className="w-full mb-4 md:hidden">
          <div className={`bg-blue-900 border border-blue-500 p-2 mb-2 ${currentTurn === 1 ? 'ring-2 ring-white' : ''}`}>
            <p className="text-white font-aldrich text-center">{player1}</p>
          </div>
          <div className="flex flex-nowrap overflow-x-auto gap-2">
            {player1Hand.map((charId) => {
              const character = characters.find(c => c.id === charId);
              return (
                <div 
                  key={charId} 
                  onClick={() => currentTurn === 1 && handleCharacterSelect(charId)}
                  className={`border border-blue-500 bg-black bg-opacity-50 p-1 cursor-pointer flex-shrink-0 w-[calc(33.33%-0.5rem)]
                    ${currentTurn === 1 ? 'hover:border-white' : 'opacity-50'}
                    ${selectedCharacter === charId ? 'ring-2 ring-white' : ''}`}
                >
                  <img
                    src={character?.image}
                    alt={character?.name}
                    className="w-full h-[60px] object-contain selected-character-glow"
                  />
                  <p className="text-white text-center text-xs mt-1 font-aldrich truncate">{character?.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:flex md:flex-row md:justify-between md:items-start">
          {/* Player 1 side - desktop only */}
          <div className="hidden md:block md:w-[180px] lg:w-[200px]">
            <div className={`bg-blue-900 border border-blue-500 p-2 mb-2 ${currentTurn === 1 ? 'ring-2 ring-white' : ''}`}>
              <p className="text-white font-aldrich text-center">{player1}</p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {player1Hand.map((charId) => {
                const character = characters.find(c => c.id === charId);
                return (
                  <div 
                    key={charId} 
                    onClick={() => currentTurn === 1 && handleCharacterSelect(charId)}
                    className={`border border-blue-500 bg-black bg-opacity-50 p-1 cursor-pointer
                      ${currentTurn === 1 ? 'hover:border-white' : 'opacity-50'}
                      ${selectedCharacter === charId ? 'ring-2 ring-white' : ''}`}
                  >
                    <img
                      src={character?.image}
                      alt={character?.name}
                      className="w-full h-[80px] md:h-[100px] object-contain selected-character-glow"
                    />
                    <p className="text-white text-center text-sm mt-1 font-aldrich truncate">{character?.name}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Game board */}
          <div className="w-full md:flex-1 md:mx-4 lg:mx-8 mb-4 md:mb-0">
            
              <button 
                onClick={() => setShowHelp(true)}
                className="bg-blue-600 text-white px-3 py-1 text-sm rounded-md font-aldrich hover:bg-blue-700 hidden md:block md:mb-10"
              >
                HELP
              </button>
            
            <div className="grid grid-cols-3 gap-2 max-w-[500px] mx-auto">
              {board.map((cell, index) => (
                <div
                  key={index}
                  onClick={() => handleCellClick(index)}
                  className={`border-2 border-yellow-500 aspect-square bg-black bg-opacity-50 p-2 cursor-pointer hover:bg-opacity-70 
                    ${winningLine?.includes(index) ? 'animate-pulse border-4 border-green-500 winning-glow' : ''}`}
                >
                  {cell && (
                    <img
                      src={characters.find(c => c.id === cell.charId)?.image}
                      alt="character"
                      className="w-full h-full object-contain selected-character-glow"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Player 2 side - desktop only */}
          <div className="hidden md:block md:w-[180px] lg:w-[200px]">
            <div className={`bg-red-900 border border-red-500 p-2 mb-2 ${currentTurn === 2 ? 'ring-2 ring-white' : ''}`}>
              <p className="text-white font-aldrich text-center">{player2}</p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {player2Hand.map((charId) => {
                const character = characters.find(c => c.id === charId);
                return (
                  <div 
                    key={charId} 
                    onClick={() => currentTurn === 2 && handleCharacterSelect(charId)}
                    className={`border border-red-500 bg-black bg-opacity-50 p-1 cursor-pointer
                      ${currentTurn === 2 ? 'hover:border-white' : 'opacity-50'}
                      ${selectedCharacter === charId ? 'ring-2 ring-white' : ''}`}
                  >
                    <img
                      src={character?.image}
                      alt={character?.name}
                      className="w-full h-[80px] md:h-[100px] object-contain selected-character-glow"
                    />
                    <p className="text-white text-center text-sm mt-1 font-aldrich truncate">{character?.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Player 2 side - horizontal on mobile, vertical on desktop */}
        <div className="w-full mt-4 md:hidden">
          <div className={`bg-red-900 border border-red-500 p-2 mb-2 ${currentTurn === 2 ? 'ring-2 ring-white' : ''}`}>
            <p className="text-white font-aldrich text-center">{player2}</p>
          </div>
          <div className="flex flex-nowrap overflow-x-auto gap-2">
            {player2Hand.map((charId) => {
              const character = characters.find(c => c.id === charId);
              return (
                <div 
                  key={charId} 
                  onClick={() => currentTurn === 2 && handleCharacterSelect(charId)}
                  className={`border border-red-500 bg-black bg-opacity-50 p-1 cursor-pointer flex-shrink-0 w-[calc(33.33%-0.5rem)]
                    ${currentTurn === 2 ? 'hover:border-white' : 'opacity-50'}
                    ${selectedCharacter === charId ? 'ring-2 ring-white' : ''}`}
                >
                  <img
                    src={character?.image}
                    alt={character?.name}
                    className="w-full h-[60px] object-contain selected-character-glow"
                  />
                  <p className="text-white text-center text-xs mt-1 font-aldrich truncate">{character?.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-2 border-yellow-500 rounded-lg p-4 max-w-md w-full">
            <h2 className="text-xl text-yellow-500 font-aldrich mb-4 text-center">How to Play</h2>
            
            <ul className="text-white space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">1.</span>
                <span>Select a character from your hand by clicking on it.</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">2.</span>
                <span>Place your selected character on the board by clicking an empty cell.</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">3.</span>
                <span>You can only have 3 characters on the board at once. When you place a 4th character, your oldest character will be returned to your hand.</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">4.</span>
                <span>Get three of your characters in a row (horizontally, vertically, or diagonally) to win!</span>
              </li>
            </ul>
            
            <div className="flex justify-center">
              <button 
                onClick={() => setShowHelp(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-md font-aldrich hover:bg-red-700"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;