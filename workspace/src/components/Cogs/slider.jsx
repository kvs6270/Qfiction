import { Tile } from "./tile.jsx"
import { useNavigate } from 'react-router'
import style from "../CogCSS/slider.module.css"

export function Slider({suggestionType, movieArray, identifier}) {

    const navigate = useNavigate();

    let slideShow = movieArray.map(item => {

        return (
            <Tile movieObj={item} key={item.id}></Tile>
        )
    })

    return (

        <div className={style.sliderContainer}>
            <div className = {style.viewAll} onClick={() => {


                navigate(`${suggestionType}/${identifier}`);
            }}>

                View All</div>

            <div className={style.tileContainer}>{slideShow}</div>

        </div>
    )
}