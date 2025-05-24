import React, { useEffect, useRef } from 'react'
import Game from './Pages/Game'
import Selection from './Pages/Selection'
import Startpage from './Pages/StartPage'
import Winning from './Pages/Winning'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GameProvider } from './context/GameContext';

const App = () => {
  const backgroundMusic = useRef(new Audio("/sounds/background.mp3"));
  
  useEffect(() => {
    // Set properties for background music
    backgroundMusic.current.volume = 0.25;
    backgroundMusic.current.loop = true;
    
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
      document.removeEventListener('click', playMusic);
      document.removeEventListener('keydown', playMusic);
    };
  }, []);

  const router = createBrowserRouter([
    { path: '/', element: <Startpage/>},
    { path: '/selection', element:<Selection/>},
    { path: '/playing', element:<Game/> },
    { path: '/finished', element:<Winning/> }
  ])

  return (
    <GameProvider>
      <RouterProvider router={router}/>
    </GameProvider>
  );
};

export default App;