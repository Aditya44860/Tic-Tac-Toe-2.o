import React from 'react'
import Game from './Pages/Game'
import Selection from './Pages/Selection'
import Startpage from './Pages/StartPage'
import Winning from './Pages/Winning'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const App = () => {

  const router = createBrowserRouter([
    { path: '/', element: <Startpage/>},
    { path: '/selection', element:<Selection/>},
    { path: '/playing', element:<Game/> },
    { path: '/finished', element:<Winning/> }
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
};

export default App;