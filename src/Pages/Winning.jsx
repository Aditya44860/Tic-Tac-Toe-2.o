import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';

const Winning = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const winner = location.state?.winner;
  const { 
    player1, 
    player2, 
    setPlayer1Characters, 
    setPlayer2Characters,
    player1Score,
    setPlayer1Score,
    player2Score,
    setPlayer2Score 
  } = useGameContext();
  const winnerSound = useRef(new Audio("/sounds/winner.mp3"));
  const scoreUpdated = useRef(false);
  
  useEffect(() => {
    // Play winner sound when component mounts
    winnerSound.current.play();
    
    // Update score based on winner, but only once
    if (!scoreUpdated.current) {
      if (winner === player1) {
        setPlayer1Score(prevScore => prevScore + 1);
      } else if (winner === player2) {
        setPlayer2Score(prevScore => prevScore + 1);
      }
      scoreUpdated.current = true;
    }
  }, []);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-black bg-opacity-90">
      
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-red-600 font-aldrich mb-[10%] winner-glow text-center">
        Congratulations {winner}!
      </h1>
      
      <div className="flex justify-center items-center gap-8 mb-[5%]">
        <div className={`p-4 rounded-lg ${winner === player1 ? 'bg-blue-900 border-2 border-blue-500' : 'bg-gray-800'}`}>
          <p className="text-white font-aldrich text-xl">{player1}</p>
          <p className="text-3xl font-bold text-yellow-400 text-center mt-2">{player1Score}</p>
        </div>
        
        <div className="text-white text-2xl font-bold">VS</div>
        
        <div className={`p-4 rounded-lg ${winner === player2 ? 'bg-red-900 border-2 border-red-500' : 'bg-gray-800'}`}>
          <p className="text-white font-aldrich text-xl">{player2}</p>
          <p className="text-3xl font-bold text-yellow-400 text-center mt-2">{player2Score}</p>
        </div>
      </div>
      <div className='flex mt-5 gap-10'>
        <button
        onClick={() => navigate("/playing")}
        className="bg-red-600 text-white px-6 py-2 text-xl rounded-md font-aldrich hover:bg-red-700 mt-8"
      >
        PLAY AGAIN
      </button>

      <button
        className="bg-yellow-600 text-white px-6 py-2 text-xl rounded-md font-aldrich hover:bg-yellow-700 mt-8"
        onClick={() => {
          setPlayer1Characters([]);
          setPlayer2Characters([]);
          navigate("/selection");
        }}
      >
        RESELECT
      </button>
      </div>
      
    </div>
  );
};

export default Winning;