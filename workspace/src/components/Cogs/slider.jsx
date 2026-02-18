import {Tile} from "./tile.jsx"
import {useNavigate} from 'react-router'

export function Slider({movieArray, identifier, identifierType}) {
    const navigate = useNavigate();

    let slideShow = movieArray.map(item => {

        return (
            <Tile movieObj={item} key={item.id}></Tile>
        )
    })

    return (

        <div>
        <div onClick={() => {
            

            navigate(`TopRated/${identifier}`);
        }}>
            
        View All</div>
        {slideShow}
        </div>
    )
}