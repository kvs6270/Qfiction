import {Tile} from "./tile.jsx"

export function Slider({movieArray}) {

    let slideShow = movieArray.map(item => {

        return (
            <Tile movieObj={item} key={item.id}></Tile>
        )
    })

    return (
        slideShow
    )
}