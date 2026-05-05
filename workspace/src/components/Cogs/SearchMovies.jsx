import { searchMovies } from "../../logic/searchMovies";
import style from "../CogCSS/SearchMovies.module.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";



export function SearchMovies({ searchString, clickFunc }) {
    if(searchString == "") {
        return;
    }
    let navigate = useNavigate();



    const [movieArray, setMovieArray] = useState([]);




    useEffect(
        () => {
            async function getMovies() {
                let data = await searchMovies(searchString);
                setMovieArray(data.slice(0, 7));
            }

            getMovies();
        }, [searchString]
    )


    let arrayofTiles = movieArray.map(item => {
        console.log(item)

        return (
            <div className={style.searchTile} onClick={() => {
                clickFunc?clickFunc(item.id):navigate(`/Movie/${item.id}`)
            }} key={item.id}>


                <div style={{ backgroundImage: `url(${item.image})` }} className={style.image}>

                </div>

                <div className={style.Details}>
                    {item.Title}
                </div>

                <div className={style.rating}>

                    
                        <svg className = {style.svg} viewBox="0 0 34 32" fill="currentColor">
                            <polygon points="27.865 31.83 17.615 26.209 7.462 32.009 9.553 20.362 0.99 12.335 12.532 10.758 17.394 0 22.436 10.672 34 12.047 25.574 20.22" />
                        </svg>
                        <span>{item.rating}</span>
                    

                </div>
            </div>
        )
    })



    return (
        <div className={style.searchContainer}>
            {arrayofTiles}
        </div>
    )
}