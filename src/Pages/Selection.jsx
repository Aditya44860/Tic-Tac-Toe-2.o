import React, { useState } from "react";
import { useGameContext } from "../context/GameContext";
import { NavLink } from "react-router-dom";

const Selection = () => {
  const { player1, player2 } = useGameContext();
  const [player1Selections, setPlayer1Selections] = useState([]);
  const [player2Selections, setPlayer2Selections] = useState([]);
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
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-red-600 text-center font-aldrich mt-1 mb-2 text-glow-yellow">
        Select Your Characters
      </h1>
      
      {/* Turn indicator */}
      <p className="text-center text-xl text-white mb-4 font-aldrich tracking-widest">
        {currentTurn === 1 ? `${player1}'s` : `${player2}'s`} turn to choose
      </p>

      {/* Main character grid - 6 columns x 4 rows */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-1 max-w-[900px] mx-auto px-4 mt-2 overflow-y-auto">
        {characters.map((char) => {
          const isSelected = [...player1Selections, ...player2Selections].includes(char.id);
          return (
            <div 
              key={char.id} 
              className={`character-box border border-yellow-500 bg-black bg-opacity-50 flex items-center justify-center aspect-square w-full max-w-[120px] relative group ${
                isSelected ? 'opacity-20 cursor-not-allowed' : 'hover:bg-opacity-70 cursor-pointer'
              }`}
              onClick={() => {
                if (isSelected) return;
                
                if (currentTurn === 1 && player1Selections.length < 3) {
                  setPlayer1Selections([...player1Selections, char.id]);
                  setCurrentTurn(2);
                } else if (currentTurn === 2 && player2Selections.length < 3) {
                  setPlayer2Selections([...player2Selections, char.id]);
                  setCurrentTurn(1);
                }
              }}
            >
              <img 
                src={char.image} 
                alt={char.name}
                className={`w-full h-full object-contain p-1 ${!isSelected ? 'character-glow' : ''}`}
              />
              <span className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-[8px] sm:text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity">
                {char.name}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Player selection area */}
      <div className="flex flex-col sm:flex-row justify-between mt-4 max-w-[900px] mx-auto px-4 w-full mt-[4%]">
        {/* Player 1 side */}
        <div className="w-full sm:w-[30%] mb-4 sm:mb-0">
          <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-1">
              {[0, 1, 2].map((index) => (
                <div key={`p1-${index}`} className="border border-blue-500 bg-black bg-opacity-50 aspect-square">
                  {player1Selections[index] && (
                    <img 
                      src={characters.find(c => c.id === player1Selections[index])?.image} 
                      alt="Selected character"
                      className="w-full h-full object-contain p-1"
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
        
        {/* Center - VS and Start button */}
        <div className="flex flex-col items-center justify-end pb-2 mb-4 sm:mb-0">
          <p className="text-red-500 text-xl sm:text-2xl md:text-3xl font-bold mb-1">VS</p>
          <NavLink to="/playing">
            <button 
              className="bg-red-600 text-white px-3 py-1 text-xs sm:text-sm md:text-base rounded-md font-aldrich hover:bg-red-700 disabled:opacity-50"
              disabled={player1Selections.length < 3 || player2Selections.length < 3}
            >
              START
            </button>
          </NavLink>
        </div>
        
        {/* Player 2 side */}
        <div className="w-full sm:w-[30%]">
          <div className="flex flex-col">
            <div className="grid grid-cols-3 gap-1">
              {[0, 1, 2].map((index) => (
                <div key={`p2-${index}`} className="border border-red-500 bg-black bg-opacity-50 aspect-square">
                  {player2Selections[index] && (
                    <img 
                      src={characters.find(c => c.id === player2Selections[index])?.image} 
                      alt="Selected character"
                      className="w-full h-full object-contain p-1"
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
    </div>
  );
};

export default Selection;
