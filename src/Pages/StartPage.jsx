import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { motion } from "framer-motion";
import { useGameContext } from "../context/GameContext";

const StartPage = () => {
  const { player1, setPlayer1, player2, setPlayer2 } = useGameContext();
  const typeSound = useRef(new Audio("/sounds/type.mp3"));
  const clickedSound = useRef(new Audio("/sounds/clicked.mp3"));

  const jumping = (delay = 0) => ({
    initial: { y: 0 },
    animate: {
      y: [5, -5, 5],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        delay,
      },
    },
  });

  return (
    <div className="px-4 max-w-screen-xl mx-auto overflow-x-hidden ">
      <div className="background absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-10 max-[600px]:scale-[0.8] max-[600px]:top-10">
        <motion.img
          src="/images/spiderman.png"
          alt="spiderman"
          variants={jumping(0)}
          initial="initial"
          animate="animate"
          className="absolute top-[-5%] right-0 h-20 sm:h-28 md:h-40 lg:h-52 opacity-30"
        />

        <motion.img
          src="/images/superman.png"
          alt="superman"
          variants={jumping(0.2)}
          initial="initial"
          animate="animate"
          className="absolute top-[18%] left-[6%] -translate-x-1/2 h-20 sm:h-28 md:h-40 lg:h-52 opacity-30"
        />

        <motion.img
          src="/images/flash.png"
          alt="flash"
          variants={jumping(0.4)}
          initial="initial"
          animate="animate"
          className="absolute top-[32%] left-[16%] h-20 sm:h-28 md:h-40 lg:h-52 scale-x-[-1] opacity-30"
        />

        <motion.img
          src="/images/batman.png"
          alt="batman"
          variants={jumping(0.6)}
          initial="initial"
          animate="animate"
          className="absolute bottom-[0%] left-[3%] h-20 sm:h-28 md:h-40 lg:h-52 opacity-30"
        />

        <motion.img
          src="/images/wonderwoman.png"
          alt="wonderwoman"
          variants={jumping(0.8)}
          initial="initial"
          animate="animate"
          className="absolute bottom-[18%] sm:bottom-[13%] left-[7%] -translate-y-1/2 h-20 sm:h-28 md:h-40 lg:h-52 scale-x-[-1] opacity-30"
        />

        <motion.img
          src="/images/widow.png"
          alt="black_widow"
          variants={jumping(0)}
          initial="initial"
          animate="animate"
          className="absolute bottom-[8%] right-[5%] h-20 sm:h-28 md:h-40 lg:h-52 opacity-30"
        />

        <motion.img
          src="/images/hulk.png"
          alt="hulk"
          variants={jumping(0.2)}
          initial="initial"
          animate="animate"
          className="absolute bottom-[0%] right-[25%] h-20 sm:h-28 md:h-40 lg:h-52 opacity-30"
        />

        <motion.img
          src="/images/ironman.png"
          alt="iron_man"
          variants={jumping(0.4)}
          initial="initial"
          animate="animate"
          className="absolute bottom-[40%] right-[-5%] -translate-x-1/2 h-20 sm:h-28 md:h-40 lg:h-52 opacity-30"
        />

        <motion.img
          src="/images/hawkeye.png"
          alt="hawkeye"
          variants={jumping(0.6)}
          initial="initial"
          animate="animate"
          className="absolute bottom-[29%] right-[18%] h-20 sm:h-28 md:h-40 lg:h-52 opacity-30"
        />

        <motion.img
          src="/images/thor.png"
          alt="thor"
          variants={jumping(0.8)}
          initial="initial"
          animate="animate"
          className="absolute top-[18%] right-[13%] h-20 sm:h-28 md:h-40 lg:h-52 opacity-30"
        />

        <motion.img
          src="/images/greenL.png"
          alt="green_lantern"
          variants={jumping(0)}
          initial="initial"
          animate="animate"
          className="absolute top-[-2%] left-[10%] h-20 sm:h-28 md:h-40 lg:h-52 scale-x-[-1] opacity-30"
        />

        <motion.img
          src="/images/aquaman.png"
          alt="aquaman"
          variants={jumping(0.2)}
          initial="initial"
          animate="animate"
          className="absolute bottom-[9%] left-[20%] h-20 sm:h-28 md:h-40 lg:h-52 mix-blend-screen opacity-30"
        />
      </div>

      <h1 className="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#E6E6FA] font-neuton mt-16 text-glow tracking-[0.1em]">
        Tic Tac Toe{" "}
        <span className="font-aldrich text-[#FF004D] flicker-glow">2.o</span>
      </h1>
      <h3 className="text-center text-[#FFD700] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-neuton tracking-widest mt-4">
        Hero Wars!
      </h3>

      <main>
        <div className="names flex flex-col gap-9 justify-center items-center mt-24 px-4 sm:mt-36">
          {/* Player 1 */}

          <div className="player1 flex flex-col sm:flex-row justify-center items-center w-full max-w-md relative">
            <p className="text-white font-neuton text-xl sm:text-4xl sm:mr-5 mb-2 sm:mb-0 text-center sm:text-left tracking-wider">
              Player 1 :
            </p>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-64">
              <input
                type="text"
                maxLength={15}
                value={player1}
                onChange={(e) => {
                  typeSound.current.currentTime = 0;
                  typeSound.current.play();
                  setPlayer1(e.target.value);
                }}
                className="bg-[#fffffff3] flex-1 h-10 sm:h-12 px-4 text-[#0000006b] rounded-md"
                placeholder="Enter your name"
              />
            </div>
          </div>

          {/* Player 2 */}
          <div className="player2 flex flex-col sm:flex-row justify-center items-center w-full max-w-md relative">
            <p className="text-white font-neuton text-xl sm:text-4xl sm:mr-5 mb-2 sm:mb-0 text-center sm:text-left tracking-wider">
              Player 2 :
            </p>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                maxLength={15}
                value={player2}
                onChange={(e) => {
                  typeSound.current.currentTime = 0;
                  typeSound.current.play();
                  setPlayer2(e.target.value);
                }}
                className="bg-[#fffffff3] w-full h-10 sm:h-12 px-4 pr-10 text-[#0000006b] rounded-md"
                placeholder="Enter your name"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-26 sm:mt-36 pb-8">
          <NavLink to="/selection">
            <button
              className="bg-[#D9D9D9] font-aldrich text-3xl sm:text-4xl px-8 py-3 rounded-full hover:bg-[#FF004D] hover:scale-110 red-glow-hover cursor-pointer transition-all duration-300 border-2 border-red-600 hover:border-yellow-300"
              onClick={(e) => {
                clickedSound.current.play();
                if (player1 === "") {
                  setPlayer1("Player 1");
                }
                if (player2 === "") {
                  setPlayer2("Player 2");
                }
              }}
            >
              Start
            </button>
          </NavLink>
        </div>
      </main>
    </div>
  );
};

export default StartPage;
