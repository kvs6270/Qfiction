import { useState } from 'react'
import Tile from "./components/tile"
import Watched from "./components/watched"
import WatchList from "./components/watchlist"

import { createContext } from "react";

import './App.css'


const WatchContext = createContext({
      moviesToWatch: [],
      moviesWatched: [],
      addTowatch: () => {},
      addTowatched: () => {},
    });

function App() {

  const [watchMovies, setWatchMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);

  const moviesToWatch = watchMovies;
  const moviesWatched = watchedMovies;


  function addTowatch(obj) {
    setWatchMovies(watchMovies.concat(obj))
  }

  function addToWatched(obj) {
    setWatchedMovies(watchedMovies.concat(obj))
  }
  
  <WatchContext value={{moviesToWatch, moviesWatched, addTowatch, addToWatched}}>

      <Tile addTowatch = {addTowatch} addToWatched = {addToWatched}></Tile>
      <Watched movieArray = {moviesWatched}></Watched>
      <WatchList movieArray = {moviesToWatch}></WatchList>
    

  </WatchContext>


  return (
    <span></span>
  )
}

export default App
