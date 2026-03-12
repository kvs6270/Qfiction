import style from "../CogCSS/libraryTile.module.css"

export function LibraryTile ({movieObj}) {
    return (
        <div className={style.TileContainer}>
            <div className = {style.ImageBox}>

            </div>
            <div className={style.ContentBox}>
                {movieObj.title}
            </div>
        </div>
    )
}



