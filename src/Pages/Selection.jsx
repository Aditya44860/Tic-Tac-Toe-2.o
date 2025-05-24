import React, { useState, useRef } from "react";
import { useGameContext } from "../context/GameContext";
import { NavLink } from "react-router-dom";

const Selection = () => {
  const [showHelp, setShowHelp] = useState(false);
  const hoverSound = useRef(new Audio("/sounds/click.mp3"));
  const selectSound = useRef(new Audio("/sounds/select.mp3"));
  const { 
    player1, 
    player2, 
    player1Characters, 
    setPlayer1Characters,
    player2Characters, 
    setPlayer2Characters 
  } = useGameContext();
  const [currentTurn, setCurrentTurn] = useState(1); // 1 for player1, 2 for player2
  
  // Create an array of characters using available images
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

  return (
    <div className="min-h-screen w-screen flex flex-col p-2 overflow-y-auto sm:overflow-hidden">
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-red-600 text-center font-aldrich mt-4 mb-2 text-glow-yellow">
        Select Your Characters
      </h1>
      
      {/* Turn indicator */}
      <p className="text-center text-xl text-white mb-4 font-aldrich tracking-widest">
        {currentTurn === 1 ? `${player1}'s` : `${player2}'s`} turn to choose
      </p>

      {/* Main character grid - 6 columns x 4 rows */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-1 max-w-[900px] mx-auto px-4 mt-[2%] overflow-y-auto">
        {characters.map((char) => {
          const isSelected = [...player1Characters, ...player2Characters].includes(char.id);
          return (
            <div 
              key={char.id} 
              className={`character-box border border-yellow-500 bg-black bg-opacity-50 flex items-center justify-center aspect-square w-full max-w-[120px] relative group ${
                isSelected ? 'opacity-20 cursor-not-allowed' : 'hover:bg-opacity-70 cursor-pointer'
              }`}
              onMouseEnter={() => {
                if (!isSelected) {
                  hoverSound.current.currentTime = 0;
                  hoverSound.current.play();
                }
              }}
              onClick={() => {
                if (isSelected) return;
                
                selectSound.current.currentTime = 0;
                selectSound.current.play();
                
                if (currentTurn === 1 && player1Characters.length < 4) {
                  setPlayer1Characters([...player1Characters, char.id]);
                  setCurrentTurn(2);
                } else if (currentTurn === 2 && player2Characters.length < 4) {
                  setPlayer2Characters([...player2Characters, char.id]);
                  setCurrentTurn(1);
                }
              }}
            >
              <img 
                src={char.image} 
                alt={char.name}
                className={`w-full h-full object-contain p-1 ${!isSelected ? 'character-glow' : ''}`}
              />
              <span className="absolute bottom-0 left-0 right-0 bg-opacity-0 text-white text-[8px] sm:text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity">
                {char.name}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Player selection area */}
      <div className="flex flex-col sm:flex-row justify-between max-w-[900px] mx-auto px-4 w-full sm:mt-[3%] mt-30">
        {/* Player 1 side */}
        <div className="w-full sm:w-[30%] mb-4 sm:mb-0">
          <div className="flex flex-col">
            <div className="grid grid-cols-4 gap-1">
              {[0, 1, 2, 3].map((index) => (
                <div key={`p1-${index}`} className="border border-blue-500 bg-black bg-opacity-50 aspect-square">
                  {player1Characters[index] && (
                    <img 
                      src={characters.find(c => c.id === player1Characters[index])?.image} 
                      alt="Selected character"
                      className="w-full h-full object-contain p-1 selected-character-glow"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-1 py-1 px-2 bg-blue-900 border border-blue-500 text-center">
              <p className="text-white font-aldrich text-xs sm:text-sm">{player1}</p>
            </div>
          </div>
        </div>
        
        {/* Center - VS and buttons */}
        <div className="flex flex-col items-center justify-end pb-2 mb-4 sm:mb-0">
          <p className="text-yellow-500 text-xl sm:text-2xl md:text-3xl font-bold mb-5 font-aldrich">VS</p>
          <div className="flex flex-col gap-2">
            
            
            <NavLink to="/playing">
      
              <button 
                className="bg-red-600 text-white px-3 mt-[5%] py-1 text-sm sm:text-base md:text-xl rounded-md font-aldrich hover:bg-red-700 disabled:opacity-50 tracking-wider"
                disabled={player1Characters.length < 4 || player2Characters.length < 4}
              >
                START
              </button>

            </NavLink>
            
            <button 
              onClick={() => setShowHelp(true)}
              className="bg-blue-600 text-white px-3 py-1 text-sm sm:text-base rounded-md font-aldrich hover:bg-blue-700 tracking-wider mt-2"
            >
              HELP
            </button>
          </div>
        </div>
        
        {/* Player 2 side */}
        <div className="w-full sm:w-[30%]">
          <div className="flex flex-col">
            <div className="grid grid-cols-4 gap-1">
              {[0, 1, 2, 3].map((index) => (
                <div key={`p2-${index}`} className="border border-red-500 bg-black bg-opacity-50 aspect-square">
                  {player2Characters[index] && (
                    <img 
                      src={characters.find(c => c.id === player2Characters[index])?.image} 
                      alt="Selected character"
                      className="w-full h-full object-contain p-1 selected-character-glow"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-1 py-1 px-2 bg-red-900 border border-red-500 text-center">
              <p className="text-white font-aldrich text-xs sm:text-[1rem]">{player2}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-2 border-yellow-500 rounded-lg p-4 max-w-md w-full">
            <h2 className="text-xl text-yellow-500 font-aldrich mb-4 text-center">How to Select Characters</h2>
            
            <ul className="text-white space-y-3 mb-6">
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">1.</span>
                <span>Each player must select 4 characters to play with.</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">2.</span>
                <span>Players take turns selecting characters from the grid.</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">3.</span>
                <span>Selected characters appear in your player box.</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">4.</span>
                <span>Once both players have selected 4 characters, click START to begin the game.</span>
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

export default Selection;