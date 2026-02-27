import { useOutletContext } from "react-router";

import { MovieGrid } from "../Cogs/MovieGrid";
import { useParams } from "react-router";


export function HomeGridView() {

    const { movieObj, genreBasedMovies } = useOutletContext();
    const { identifier } = useParams();

            
        if (identifier in genreBasedMovies) {

            
            return (
                
                <MovieGrid movieArray={genreBasedMovies[identifier]}></MovieGrid>
            )
        }

        else {
            return <MovieGrid movieArray = {movieObj}></MovieGrid>
        }


    
}