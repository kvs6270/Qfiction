import { WatchContext } from "../../App";
import style from "../CogCSS/MoviePage.module.css"
import { useState } from "react";
import { useContext } from "react";

export function MoviePage({movieObj}) {    

    const {moviesToWatch, moviesWatched, addToWatch, addToWatched, removeFromWatch, removeFromWatched} = useContext(WatchContext)

    // const [toWatch , setToWatch] = useState(moviesToWatch.some(movie => movie.id == movieObj.id))
    // const [watched , setWatched] = useState(moviesWatched.some(movie => movie.id == movieObj.id))

    let toWatch = moviesToWatch.some(movie => movie.id === movieObj.id)
    let watched = moviesWatched.some(movie => movie.id === movieObj.id)


    function setMovieAsWatched() {
        addToWatched(movieObj)
        watched = true;
    }

    function removeMovieFromWatched() {
        removeFromWatched(movieObj)
        watched = false;
    }

    function setMovieToWatch() {
        addToWatch(movieObj)
        toWatch = true;
    }

    function removeMovieFromWatch() {
        removeFromWatch(movieObj)
        watched = false;
    }

    return (

        <div className={style.PageContainer}>


        <h1 className={style.TitleHeader}>{movieObj.title}</h1>
        


        {toWatch?(<button className={style.RemoveFromWatchButton} onClick={removeMovieFromWatch}>Remove from Watch</button>):(<button className={style.addToWatchButton} onClick={setMovieToWatch}>Add to Watch</button>)}


        {watched?(<button className={style.RemoveFromWatchedButton} onClick={removeMovieFromWatched}>Remove from Watched</button>):(<button className={style.addToWatchedButton} onClick={setMovieAsWatched}>Mark as Watched</button>)}

        </div>
    )
}