

import {useNavigate} from 'react-router'
import style from "../CogCSS/tile.module.css"

export function Tile({movieObj, children}) {

    if (movieObj == null) {

        console.log("yeh dekh")
        return (
            <div className= {style.tile} >
            {children}
        </div>
        )
    }

    

    const navigate = useNavigate();


    const title = movieObj.title;

    


    return (

        
        <div className= {style.tile} onClick={() => {navigate(`/Movie/${movieObj.id}`)}}>
            {movieObj.title}
        </div>
    )
}