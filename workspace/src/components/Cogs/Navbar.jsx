import { Link } from "react-router-dom"
export function Navbar() {
    return(
        <ul>
            <li><Link to="Back">Back</Link></li>
            <li><Link to="Home">Home</Link></li>
            <li><Link to="Recommendation">Recommendation</Link></li>
            <li><Link to="Watched">Watched</Link></li>
            <li><Link to="ToWatch">ToWatch</Link></li>
        </ul>
    )
}