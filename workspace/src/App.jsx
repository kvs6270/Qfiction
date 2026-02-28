import { useState } from 'react'
import { Navbar } from './components/Cogs/Navbar.jsx'



import { createContext } from "react";

import './App.css'


export const WatchContext = createContext({
  moviesToWatch: [],
  moviesWatched: [],
  addToWatch: () => { },
  removeFromWatch: () => { },
  addToWatched: () => { },
  removeFromWatched: () => { },
});

function App({children}) {

  const [watchMovies, setWatchMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);

  const moviesToWatch = watchMovies;
  const moviesWatched = watchedMovies;


  function addToWatch(obj) {
    setWatchMovies(watchMovies.concat(obj))
  }

  function removeFromWatch(obj) {
    let newWatchMovies = watchMovies.filter((item) => {
      return item.id != obj.id;
    })

    setWatchMovies(newWatchMovies);
  }


  function addToWatched(obj) {
    setWatchedMovies(watchedMovies.concat(obj))
  }

  function removeFromWatched(obj) {
    let newWatchedMovies = watchedMovies.filter((item) => {
      return item.id != obj.id;
    })

    setWatchedMovies(newWatchedMovies);
  }




  return (
    
    <WatchContext value={{ moviesToWatch, moviesWatched, addToWatch, addToWatched, removeFromWatch, removeFromWatched }}>

    {children}

    </WatchContext>
  )
}

export default App
