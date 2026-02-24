import { useContext } from "react";
import { WatchContext } from "../../App";

export function WatchList() {

    const {moviesToWatch} = useContext(WatchContext)
    console.log(moviesToWatch)

    let movieElementArray = moviesToWatch.map(element => {
        return (
        
        <div className="MovieToWatch" key={element.id}>
            {element.title}            
        </div>)
    });
        
   

    return (

        <div className="ToWatchContainer">
            {movieElementArray}
        </div>
       
    )
}