import { useContext, useState } from "react"

import {useNavigate} from 'react-router'
import { HomeContext } from "../Pages/HomeLayout";

import style from "../CogCSS/tile.module.css"

export function Tile({movieObj}) {

    

    const navigate = useNavigate();


    const title = movieObj.title;

    


    return (

        
        <div className= {style.tile} onClick={() => {navigate(`Movie/${movieObj.id}`)}}>
            {movieObj.title}
        </div>
    )
}