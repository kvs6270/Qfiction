import { Navigate, useNavigate } from "react-router-dom"
import style from "../CogCSS/libraryTile.module.css"
import { useState } from "react";

export function LibraryTile({ movieObj, removerFunc, position, adderFunc}) {
    const [hovered, setHovered] = useState(false)
    let navigate = useNavigate();

    console.log(movieObj)
    return (
        <div onClick={() => { navigate(`/Movie/${movieObj.id}`) }} onMouseEnter={() => { setHovered(true) }} onMouseLeave={() => { setHovered(false) }} className={hovered ? `${style.TileContainer} ${style.Hovered}` : `${style.TileContainer}`}>
            <div style={{ backgroundImage: `URL(${movieObj.backdrop})` }} className={style.ImageBox}>

            </div>

            <div className={style.ContentBox}>
                <div className={style.Details}>
                    <div className={style.movieTitle}>
                        {movieObj.title} <span>{movieObj.year}</span>
                    </div>
                    <div className={style.genreRuntime}>
                        {movieObj.showkeyGenre}
                    </div>
                    <div className={style.starring}>
                        Starring: {movieObj.castArray.slice(0, 3).map(obj => obj.name).join(", ")}
                    </div>
                    <div className={style.directed}>
                        Directed By: {movieObj.director}
                    </div>
                </div>

                <div className={style.Clickables}>




                    <button onClick={(e) => {
                        e.stopPropagation();
                        removerFunc(movieObj);
                    }}>Remove</button>

                    {(position=="Watched")?
                    
                    <button onClick={console.log()}>Rate</button>
                    
                    :
                    
                    
                    <button onClick={(e) => {
                        e.stopPropagation();
                        adderFunc(movieObj);
                        removerFunc(movieObj);
                    }}>Add to Watched</button>}
                    









                </div>
            </div>
        </div>
    )
}



