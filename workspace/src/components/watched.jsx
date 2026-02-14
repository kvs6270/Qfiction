import { useContext } from "react";
import { WatchContext } from "../App";

export function WatchedList () {

    const {moviesWatched} = useContext(WatchContext)

    let movieElementArray = moviesWatched.map(element => {
        return (<div key={element.id}>
            <div>{element.title}</div>
            
        </div>)
    });
        
   
    return (

        movieElementArray
       
    )
}