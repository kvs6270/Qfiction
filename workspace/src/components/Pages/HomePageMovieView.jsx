import { useOutletContext } from "react-router";
import { MoviePage } from "../Cogs/MoviePage";
import { MovieGrid } from "../Cogs/MovieGrid";


export function HomePageMovieView() {

    const {movieObj, genreBasedMovies} = useOutletContext();
    const {type, identifier} = useParams();

    if(type == "Movie") {

        const myObj = movieObj.find((item) => {
           return item.id == identifier;
        })

        if(!myObj) {
            for (genre in genreBasedMovies) {
                const myObj = genreBasedMovies[genre].find(item => item.id == identifier)
            }
        }







        return (
            <MoviePage movieObj={myObj}>

            </MoviePage>
        )
    }

    else if(type = "TopRated" ) {
        const movieArray = [];
        for (genre in genreBasedMovies) {
            if(genre == identifier) {
                movieArray = genreBasedMovies[genre];
            }
        }

        return (
            <MovieGrid movieArray = {movieArray}></MovieGrid>
        )
    }
}