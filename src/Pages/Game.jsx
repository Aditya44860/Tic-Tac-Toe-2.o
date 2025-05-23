import React from 'react';
import { useGameContext } from '../context/GameContext';

const Game = () => {
  const { player1, player2, player1Characters, player2Characters } = useGameContext();

  // Character data array (same as in Selection.jsx)
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
    <div className="min-h-screen w-screen flex flex-col py-10">

      {/* Players and their characters */}

      <div className="flex justify-between items-start max-w-[1200px] mx-auto w-full">
        {/* Player 1 side */}

        <div className="w-[11%]">
          <div className="bg-blue-900 border border-blue-500 p-2 mb-2">
            <p className="text-white font-aldrich text-center">{player1}</p>
          </div>
          <div className="grid gap-2">
            {player1Characters.map((charId) => {
              const character = characters.find(c => c.id === charId);
              return (
                <div key={charId} className="border border-blue-500 bg-black bg-opacity-50 p-1">
                  <img
                    src={character?.image}
                    alt={character?.name}
                    className="w-full h-[100px] object-contain selected-character-glow"
                  />
                  <p className="text-white text-center text-sm mt-1 font-aldrich">{character?.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Game board will go here */}
        <div className="flex-1 mx-8">
          {/* Game board content */}
        </div>

        {/* Player 2 side */}
        <div className="w-[11%]">
          <div className="bg-red-900 border border-red-500 p-2 mb-2">
            <p className="text-white font-aldrich text-center">{player2}</p>
          </div>
          <div className="grid gap-2">
            {player2Characters.map((charId) => {
              const character = characters.find(c => c.id === charId);
              return (
                <div key={charId} className="border border-red-500 bg-black bg-opacity-50 p-1">
                  <img
                    src={character?.image}
                    alt={character?.name}
                    className="w-full h-[100px] object-contain selected-character-glow"
                  />
                  <p className="text-white text-center text-sm mt-1 font-aldrich">{character?.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;