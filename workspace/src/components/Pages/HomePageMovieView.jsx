import { useOutletContext } from "react-router";
import { MoviePage } from "../Cogs/MoviePage";
import { MovieGrid } from "../Cogs/MovieGrid";
import { useParams } from "react-router";


export function HomePageMovieView() {

    const { movieObj, genreBasedMovies } = useOutletContext();
    const { type, identifier } = useParams();

    if (type == "Movie") {

        let myObj = movieObj.find((item) => {
            return item.id == identifier;
        })

        if (!myObj) {
            for (let genre in genreBasedMovies) {
                myObj = genreBasedMovies[genre].find(item => item.id == identifier)
                if(myObj) {
                    break;
                }
            }
        }

        







        return (
            <MoviePage movieObj={myObj}>

            </MoviePage>
        )
    }

    else if (type == "TopRated") {
        
        
        if (identifier in genreBasedMovies) {

            
            return (
                
                <MovieGrid movieArray={genreBasedMovies[identifier]}></MovieGrid>
            )
        }

        else {
            return <MovieGrid movieArray = {movieObj}></MovieGrid>
        }


    }
}