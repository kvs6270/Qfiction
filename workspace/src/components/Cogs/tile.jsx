import { useContext, useState } from "react"
import { WatchContext } from "../../App";
import {useNavigate} from 'react-router'

export function Tile({movieObj, parentRoute}) {
    const navigate = useNavigate();


    const title = movieObj.title;

    


    return (

        
        <div onClick={() => {navigate(`/${parentRoute}/movie/${movieObj.id}`)}}>
            {movieObj.title}
        </div>
    )
}