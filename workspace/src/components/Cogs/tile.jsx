import { useContext, useState } from "react"

import {useNavigate} from 'react-router'
import { HomeContext } from "../Pages/HomeLayout";

export function Tile({movieObj}) {

    

    const navigate = useNavigate();


    const title = movieObj.title;

    


    return (

        
        <div onClick={() => {navigate(`/movie/${movieObj.id}`)}}>
            {movieObj.title}
        </div>
    )
}