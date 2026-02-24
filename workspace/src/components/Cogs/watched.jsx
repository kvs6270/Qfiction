import { useContext } from "react";
import { WatchContext } from "../../App";

export function WatchedList () {

    const {moviesWatched} = useContext(WatchContext)

    let movieElementArray = moviesWatched.map(element => {

        return (
        
        <div className="WatchedMovie" key={element.id}>
            {element.title}            
        </div>
        )
    });
        
   
    return (

        <div className="WatchedContainer">
            {movieElementArray}
        </div>
       
    )
}