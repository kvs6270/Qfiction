import { WatchContext } from "../../App";
import style from "../CogCSS/MoviePage.module.css"
import { useState } from "react";
import { useContext } from "react";

export function MoviePage({movieObj}) {
    const [toWatch , setToWatch] = useState(false)
    const [watched , setWatched] = useState(false)

    const {addToWatch, addToWatched, removeFromWatch, removeFromWatched} = useContext(WatchContext)

    function setMovieAsWatched() {
        addToWatched(movieObj)
        setWatched(!watched)
    }

    function removeMovieFromWatched() {
        removeFromWatched(movieObj)
        setWatched(!watched)
    }

    function setMovieToWatch() {
        addToWatch(movieObj)
        setToWatch(!toWatch)
    }

    function removeMovieFromWatch() {
        removeFromWatch(movieObj)
        setToWatch(!toWatch)
    }

    return (

        <div className={style.PageContainer}>


        <h1 className={style.TitleHeader}>{movieObj.title}</h1>
        


        {toWatch?(<button className={style.RemoveFromWatchButton} onClick={removeMovieFromWatch}>Remove from Watch</button>):(<button className={style.addToWatchButton} onClick={setMovieToWatch}>Add to Watch</button>)}


        {watched?(<button className={style.RemoveFromWatchedButton} onClick={removeMovieFromWatched}>Remove from Watched</button>):(<button className={style.addToWatchedButton} onClick={setMovieAsWatched}>Mark as Watched</button>)}

        </div>
    )
}