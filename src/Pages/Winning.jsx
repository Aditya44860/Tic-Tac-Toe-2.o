import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGameContext } from "../context/GameContext";
import { motion } from "framer-motion";
import ReactConfetti from "react-confetti";

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
    setPlayer2Score,
  } = useGameContext();
  const winnerSound = useRef(new Audio("/sounds/winner.mp3"));
  const scoreUpdated = useRef(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update window dimensions when window resizes
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Play winner sound when component mounts
    winnerSound.current.play();

    // Update score based on winner
    if (!scoreUpdated.current) {
      if (winner === player1) {
        setPlayer1Score((prevScore) => prevScore + 1);
      } else if (winner === player2) {
        setPlayer2Score((prevScore) => prevScore + 1);
      }
      scoreUpdated.current = true;
    }
  }, []);

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-black bg-opacity-90 overflow-hidden relative">
      {/* React Confetti */}
      <ReactConfetti
        width={windowDimensions.width}
        height={windowDimensions.height}
        recycle={false}
        numberOfPieces={100}
        gravity={0.5}
      />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="mb-6"
      >
        <span className="trophy-icon">🏆</span>
      </motion.div>

      <motion.h1
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-red-600 font-aldrich mb-[5%] winner-glow text-center"
      >
        Congratulations {winner}!
      </motion.h1>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center items-center gap-8 mb-[5%]"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`p-4 rounded-lg ${
            winner === player1
              ? "bg-blue-900 border-2 border-blue-500 shadow-lg shadow-blue-500/50"
              : "bg-gray-800"
          }`}
        >
          <p className="text-white font-aldrich text-xl">{player1}</p>
          <p className="text-3xl font-bold text-yellow-400 text-center mt-2">
            {player1Score}
          </p>
        </motion.div>

        <div className="text-white text-2xl font-bold">VS</div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`p-4 rounded-lg ${
            winner === player2
              ? "bg-red-900 border-2 border-red-500 shadow-lg shadow-red-500/50"
              : "bg-gray-800"
          }`}
        >
          <p className="text-white font-aldrich text-xl">{player2}</p>
          <p className="text-3xl font-bold text-yellow-400 text-center mt-2">
            {player2Score}
          </p>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex mt-5 gap-10"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/playing")}
          className="bg-red-600 text-white px-6 py-2 text-xl rounded-md font-aldrich hover:bg-red-700 mt-8 shadow-lg shadow-red-600/50 transition-all"
        >
          PLAY AGAIN
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-600 text-white px-6 py-2 text-xl rounded-md font-aldrich hover:bg-yellow-700 mt-8 shadow-lg shadow-yellow-600/50 transition-all"
          onClick={() => {
            setPlayer1Characters([]);
            setPlayer2Characters([]);
            navigate("/selection");
          }}
        >
          RESELECT
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Winning;
