import { useContext } from "react";
import { WatchContext } from "../../../App";
import { Navbar } from "../../Cogs/Navbar";
import { LibraryTile } from "../../Cogs/libraryTile";
import style from "../../CogCSS/Watchlist.module.css"

export function WatchList() {

    const {moviesToWatch, removeFromWatch, addToWatched} = useContext(WatchContext)
    console.log(moviesToWatch)

    let movieElementArray = moviesToWatch.map(element => {
        return (
        
        <LibraryTile movieObj={element} position={"ToWatch"} removerFunc={removeFromWatch} adderFunc={addToWatched}/>
    )
    });
        
   

    return (

        <div className= {style.ToWatchContainer}>
            <Navbar/>
            <div className = {style.MovieElementArray}>{movieElementArray}</div>
        </div>
       
    )
}