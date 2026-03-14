import { useContext } from "react";
import { WatchContext } from "../../../App";
import { Navbar } from "../../Cogs/Navbar";
import { LibraryTile } from "../../Cogs/libraryTile";

import style from "../../CogCSS/Watched.module.css"

export function WatchedList () {

    const {moviesWatched} = useContext(WatchContext)

    let movieElementArray = moviesWatched.map(element => {

        return (
        
        <LibraryTile movieObj={element} />
        )
    });
        
   
    return (

        <div className={style.WatchedContainer}>
            <Navbar/>
            <div className={style.MovieElementArray}>
                {movieElementArray}
            </div>
        </div>
       
    )
}