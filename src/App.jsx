import React, { useEffect, useRef, useState } from 'react'
import Game from './Pages/Game'
import Selection from './Pages/Selection'
import Startpage from './Pages/StartPage'
import Winning from './Pages/Winning'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const App = () => {
  const backgroundMusic = useRef(new Audio("/sounds/background.mp3"));
  const [isMuted, setIsMuted] = useState(false);
  
  // Toggle mute/unmute
  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    backgroundMusic.current.muted = newMutedState;
    
    // If unmuting, try to play the music
    if (!newMutedState) {
      backgroundMusic.current.play().catch(error => {
        console.log("Audio play failed on unmute:", error);
      });
    }
  };

  useEffect(() => {
    // Set properties for background music
    backgroundMusic.current.volume = 0.25;
    backgroundMusic.current.loop = true;
    backgroundMusic.current.muted = isMuted;
    
    // Add event listener for user interaction to start music
    const playMusic = () => {
      backgroundMusic.current.play().catch(error => {
        console.log("Audio play failed:", error);
      });
      // Remove event listeners after first interaction
      document.removeEventListener('click', playMusic);
      document.removeEventListener('keydown', playMusic);
    };
    
    // Add event listeners for user interaction
    document.addEventListener('click', playMusic);
    document.addEventListener('keydown', playMusic);
    
    // Try to play immediately (might work in some browsers)
    backgroundMusic.current.play().catch(() => {
      console.log("Waiting for user interaction to play audio");
    });
    
    return () => {
      backgroundMusic.current.pause();
      // Cleanup event listeners (in case component unmounts before interaction)
      document.removeEventListener('click', playMusic);
      document.removeEventListener('keydown', playMusic);
    };
  }, [isMuted]);

  const router = createBrowserRouter([
    { path: '/', element: <Startpage/>},
    { path: '/selection', element:<Selection/>},
    { path: '/playing', element:<Game/> },
    { path: '/finished', element:<Winning/> }
  ])

  return (
    <GameProvider>
      <div className="sound-control">
        <button 
          onClick={toggleMute}
          className="fixed bottom-4 right-4 z-50 bg-black bg-opacity-50 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
        </button>
      </div>
      <RouterProvider router={router}/>
    </GameProvider>
  );
};

export default App;