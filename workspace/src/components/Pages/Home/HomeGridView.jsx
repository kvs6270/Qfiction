import { useOutletContext } from "react-router";
import { useState, useEffect } from "react";

import { MovieGrid } from "../../Cogs/MovieGrid";
import { useParams } from "react-router";
import { Navbar } from "../../Cogs/Navbar";
import { films2026} from "../../../logic/movies2026";
import { genreFilms } from "../../../logic/genreBasedMovies";
import { topRated } from "../../../logic/TopRated";
import style from "./HomeGridView.module.css"
// It's own fetching logic.



function useMovieDetailsFetcher(identifier) {

    const [movieArray, setMovieArray] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {

        let isMounted = true;

        setError(false);
        setLoading(true);

        async function dataFetching() {

            try {
                const movie = await fetchMovieArray(identifier);
                if (isMounted) setMovieArray(movie);
            } catch (error) {
                if (isMounted) setError(true)
                console.log(error)

            } finally {
                if (isMounted) setLoading(false)
            }
        }

        dataFetching();


        return () => {
            isMounted = false
        }
    }, [identifier])


    return { movieArray, error, loading }
}

function temporaryMovieArrayProvider(identifier) {
    if (identifier == 2026) {
        return topRated(films2026, 1000);
    }

    else {
        return topRated(genreFilms[identifier], 1000)
    }
}


export function HomeGridView() {


    const { identifier } = useParams();

    // const { movieArray, error, loading } = useMovieDetailsFetcher(identifier)

    const movieArray = temporaryMovieArrayProvider(identifier);
    const error = false;
    const loading = false;
    

    if(error) {
        return <Error />
    }

    else if (loading) {
        return <Loading />
    }

    else {


        return (
            <div>
                <Navbar />

                <div className={style.GridContainer}>
                    <MovieGrid movieArray={movieArray}></MovieGrid>
                </div>
            </div>
        )
    }

    


}