import { useState } from 'react'
import {Slider} from "./components/Cogs/slider.jsx"
import { WatchedList } from "./components/Cogs/watched.jsx"
import { WatchList } from "./components/Cogs/watchlist.jsx"
import { movieDB } from "./logic/Mock_Movie_DB.js";
import {movieOrganizer} from "./logic/ReccomendationAlgorithm.js"


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

function App() {

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

      <Slider movieArray = {movieDB}></Slider>

      <WatchedList ></WatchedList>

      <WatchList ></WatchList>


    </WatchContext>
  )
}

export default App
