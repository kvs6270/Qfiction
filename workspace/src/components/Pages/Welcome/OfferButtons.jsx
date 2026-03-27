
import style from "./OfferButtons.module.css"
import { Navigate, useNavigate } from "react-router-dom"



export function OfferButtons({ iconPath, text, clickDestination }) {

    let navigate = useNavigate();


    return (

        <div className={style.offerButton} onClick={() => {
            navigate(clickDestination)
        }}>

            <div style={{ backgroundImage: `url(${iconPath})` }} className={style.OfferIcon}></div>

            <div className={style.OfferText}>{text}</div>
        </div>

    )

}