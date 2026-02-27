import { Tile } from "./tile"
import style from "../CogCSS/MovieGrid.module.css"

export function MovieGrid({movieArray}) {
    console.log(movieArray)
    let TileContainer = movieArray.map(item => {
        return <Tile className = "gridTile" key={item.id} movieObj={item}> </Tile>
    });


    return (

        <div className = {style.GridContainer}>
            {TileContainer}
        </div>

    )
}