import style from "./NotFound.module.css"
import { Navbar } from "../../Cogs/Navbar"

export function NotFound() {
    return (
        <div className={style.OuterContainer}>
            <Navbar welcome={true}></Navbar>

            <div className={style.Image}>

            </div>
            <div className={style.Text}>
                THE PAGE YOU'RE LOOKING FOR DOESN'T EXIST!
            </div>
        </div>
    )
}