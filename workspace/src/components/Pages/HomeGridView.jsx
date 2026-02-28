import { useOutletContext } from "react-router";

import { MovieGrid } from "../Cogs/MovieGrid";
import { useParams } from "react-router";
import { Navbar } from "../Cogs/Navbar";


export function HomeGridView() {

    const { movieObj, genreBasedMovies } = useOutletContext();
    const { identifier } = useParams();

            
        if (identifier in genreBasedMovies) {

            
            return (
                <div>
                    <Navbar />
                    
                    <MovieGrid movieArray={genreBasedMovies[identifier]}></MovieGrid>
                </div>
            )
        }

        else {
            return (<div>
                <Navbar />
                <MovieGrid movieArray = {movieObj}></MovieGrid>
            </div>)
        }


    
}