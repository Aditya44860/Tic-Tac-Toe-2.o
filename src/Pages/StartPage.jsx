import React from "react";
import { NavLink } from "react-router-dom";

const StartPage = () => {
  return (
    <div className="px-4 max-w-screen-xl mx-auto">
      <h1 className="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#E6E6FA] font-neuton mt-16 text-glow tracking-[0.1em]">
        Tic Tac Toe{" "}
        <span className="font-aldrich text-[#FF004D] flicker-glow">2.o</span>
      </h1>
      <h3 className="text-center text-[#FFD700] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-neuton tracking-widest mt-4">
        Hero Wars!
      </h3>

      <main>
        <div className="names flex flex-col gap-9 justify-center items-center mt-24 px-4 sm:mt-36">
          <div className="player1 flex flex-col sm:flex-row justify-center items-center w-full max-w-md">
            <p className="text-white font-neuton text-xl sm:text-4xl sm:mr-5 mb-2 sm:mb-0 text-center sm:text-left tracking-wider">
              Player 1 :
            </p>
            <input
              type="text"
              maxLength={15}
              className="bg-white w-full sm:w-64 h-10 sm:h-12 px-4 text-[#0000006b]"
              placeholder="Enter your name"
            />
          </div>
          <div className="player2 flex flex-col sm:flex-row justify-center items-center w-full max-w-md">
            <p className="text-white font-neuton text-xl sm:text-4xl sm:mr-5 mb-2 sm:mb-0 text-center sm:text-left tracking-wider">
              Player 2 :
            </p>
            <input
              type="text"
              maxLength={15}
              className="bg-white w-full sm:w-64 h-10 px-4 sm:h-12 text-[#0000006b] "
              placeholder="Enter your name"
            />
          </div>
        </div>
        <div className="flex justify-center mt-26 sm:mt-36">
          <NavLink to="/selection">
            <button
              className="bg-[#D9D9D9] font-aldrich text-3xl sm:text-4xl px-8 py-3 rounded-full hover:bg-[#FF004D] hover:scale-110 red-glow-hover cursor-pointer transition-all duration-300 border-2 border-red-600 hover:border-yellow-300"
            >
              Start
            </button>
          </NavLink>
        </div>
      </main>
      <h1 className=""></h1>
    </div>
  );
};

export default StartPage;
