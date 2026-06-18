import { Link } from "react-router-dom"
import style from "../CogCSS/Navbar.module.css"
import icon from "./icon.png"
import { useState } from "react"
export function Navbar({ search, searchSetter, active = true, welcome = false }) {

    const [menuOpen, setMenuOpen] = useState(false)

    return (
<div className={style.fullNavContainer}>
    
            <div style={active ? {} : { opacity: "0.5", pointerEvents: "none" }} className={style.navbar}>
    
    
                <div className={style.contentContainer}>
                    <div className={style.Logo}>
                        <img className={style.LogoImage} src={icon} alt="Qflicks" />
                        <p>FLICKS</p>
    
                    </div>
    
                    <div className={style.desktopNav}>
                        <ul className={style.Navigators}>
                            <li><Link to="/">Back</Link></li>
                            <li><Link to="/Home">Home</Link></li>
                            <li><Link to="/Recommendation">Recommendation</Link></li>
                            <li><Link to="/Watched">Watched</Link></li>
                            <li><Link to="/ToWatch">ToWatch</Link></li>
    
                        </ul>
                    </div>
    
                    <button className={style.HamIcon} onClick={() => setMenuOpen(!menuOpen)}>
                            ☰
                    </button>
    
                    <div className={style.SearchArea}>
                        <ul>
                            {welcome ?
                            ""
                            :
                            <li onClick={() => {
                                searchSetter();
                            }} style={{ color: "white", cursor: "pointer" }}>{
    
                                    !search ?
    
    
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
    
                                        :
    
                                        "X"
                                }
                            </li>}
                        </ul>
    
                    </div>
                </div>
    
    
            </div>
    
            <div className={menuOpen?`${style.underNavbar} ${style.open}`:`${style.underNavbar}`}>
               
    
                <ul className={menuOpen?`${style.HamburgNavigators} ${style.open}`:`${style.HamburgNavigators}`}>
                            <li><Link to="/">Back</Link></li>
                            <li><Link to="/Home">Home</Link></li>
                            <li><Link to="/Recommendation">Recommendation</Link></li>
                            <li><Link to="/Watched">Watched</Link></li>
                            <li><Link to="/ToWatch">ToWatch</Link></li>
    
                </ul>
    

            </div>
</div>

        
    )
}