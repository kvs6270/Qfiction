import { WatchContext } from "../../App";

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
        <>
        <h1>{movieObj.title}</h1>


        {toWatch?(<button className="RemoveFromWatchButton" onClick={removeMovieFromWatch}>Remove from Watch</button>):(<button className="addToWatchButton" onClick={setMovieToWatch}>Add to Watch</button>)}


        {watched?(<button className="RemoveFromWatchedButton" onClick={removeMovieFromWatched}>Remove from Watched</button>):(<button className="addToWatchedButton" onClick={setMovieAsWatched}>Mark as Watched</button>)}
        </>
    )
}