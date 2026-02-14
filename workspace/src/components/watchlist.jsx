import { useContext } from "react";
import { WatchContext } from "../App";

export function WatchList() {

    const {moviesToWatch} = useContext(WatchContext)
    console.log(moviesToWatch)

    let movieElementArray = moviesToWatch.map(element => {
        return (<div key={element.id}>
            <div>{element.title}</div>
            
        </div>)
    });
        
   

    return (

        movieElementArray
       
    )
}