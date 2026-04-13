import { Tile } from "./tile.jsx"
import { useNavigate } from 'react-router'
import style from "../CogCSS/slider.module.css"
import { Loading } from "./Loading.jsx";

export function Slider({ identifierType, sliderTitle, suggestionType, movieArray, identifier, error, loading }) {



    const navigate = useNavigate();

    let slideShow = [];

    if (error) {
        return;

    }

    else if (loading) {
        for (let i = 0; i < 100; i++) {
            let id = crypto.randomUUID();
            slideShow.push(<Tile movieObj={null} key={id}>
                <Loading></Loading>
            </Tile>)
        }
    }

    else /* if (false) */ {


        slideShow = (movieArray || []).map(item => {
            return (
                <Tile movieObj={item} key={item.id}></Tile>
            )
        })


    }



    return (



        <div className={style.sliderContainer}>

            {/* <div className={style.sliderTitle}>{sliderTitle}</div> */}
            <div className={style.viewAll} onClick={() => {

                if (loading) {

                }
                else {
                    navigate(`${suggestionType}/${identifierType}/${identifier}`);
                }
            }}>

                View All</div>

            <div className={style.tileContainer}>{slideShow}</div>

        </div>
    )
}