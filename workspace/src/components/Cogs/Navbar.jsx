import { Link } from "react-router-dom"
import style from "../CogCSS/Navbar.module.css"
export function Navbar() {
    return(
        <div className={style.navbar}>
            <ul>
                <li><Link to="/">Back</Link></li>
                <li><Link to="/Home">Home</Link></li>
                <li><Link to="/Recommendation">Recommendation</Link></li>
                <li><Link to="/Watched">Watched</Link></li>
                <li><Link to="/ToWatch">ToWatch</Link></li>
            </ul>
        </div>
    )
}