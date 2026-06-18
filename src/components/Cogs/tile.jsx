

import {useNavigate} from 'react-router'
import style from "../CogCSS/tile.module.css"

export function Tile({movieObj, children}) {   

    if (movieObj == null) {

        return (
            <div className= {style.tile} >
            {children}
        </div>
        )
    }

    

    const navigate = useNavigate();


    const title = movieObj.title;

    const bgImg = movieObj.poster


    


    return (

        
        <div style={{backgroundImage: `URL(${bgImg})`}} className= {style.tile} onClick={() => {
            navigate(`/Movie/${movieObj.id}`)}}>
            
        </div>
    )
}