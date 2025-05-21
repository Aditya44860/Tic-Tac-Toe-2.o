import React from 'react'

const StartPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-[#0A0A0A]">
      <h1 className="text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#E6E6FA] font-neuton text-glow tracking-[0.1em] max-w-full">
        Tic Tac Toe{" "}
        <span className="font-aldrich text-[#FF004D] flicker-glow">2.o</span>
      </h1>
      <h3 className="text-center text-[#00FFFF] text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-neuton tracking-widest mt-4 max-w-full">
        Hero Wars!
      </h3>
    </div>
  );
};



export default StartPage