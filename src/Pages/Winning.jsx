import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';

const Winning = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const winner = location.state?.winner;
  const { setPlayer1Characters, setPlayer2Characters } = useGameContext();

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-black bg-opacity-90">
      <h1 className="text-4xl sm:text-5xl md:text-6xl text-red-600 font-aldrich mb-8 text-glow-yellow text-center">
        Congratulations {winner}!
      </h1>
      <button
        onClick={() => navigate("/playing")}
        className="bg-red-600 text-white px-6 py-2 text-xl rounded-md font-aldrich hover:bg-red-700 mt-28"
      >
        Play Again
      </button>

      <button
        className="bg-yellow-600 text-white px-6 py-2 text-xl rounded-md font-aldrich hover:bg-yellow-700 mt-4"
        onClick={() => {
          setPlayer1Characters([]);
          setPlayer2Characters([]);
          navigate("/selection");
        }}
      >
        RESELECT
      </button>
    </div>
  );
};

export default Winning;