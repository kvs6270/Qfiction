import { Tile } from "./tile"

export function MovieGrid(movieArray) {
    let TileContainer = movieArray.map(item => {
        return <Tile className = "gridTile" key={item.id}> </Tile>
    });


    return (

        <div className="GridContainer">
            {TileContainer}
        </div>

    )
}