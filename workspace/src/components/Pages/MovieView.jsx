import { useEffect, useState } from "react"
import { MoviePage } from "../Cogs/MoviePage";
import { useParams } from "react-router";
import { fetchMovie } from "../../logic/fetchMovie";

import { genreFilms } from "../../logic/genreBasedMovies.js";
import { films2026 } from "../../logic/movies2026.js";

function temporaryIterator(id) {
    for (let movie of films2026) {
        if(movie.id == id) {
            return movie;
        }
    }

    for(let genre in genreFilms) {
        for (let movie of genreFilms[genre]) {
        if(movie.id == id) {
            return movie;
        }
    }
    }
}




function useMovieDetailsFetcher(id) {

    const [movieObj, setMovieObj] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        let isMounted = true;

        setError(false);
        setLoading(true);

        async function dataFetching() {

            try {
                const movie = await fetchMovie(id);
                if (isMounted) setMovieObj(movie);
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
    }, [id])


    return { movieObj, error, loading }
}


export function MovieView() {

    

    
    const { id } = useParams();

    // const { movieObj, error, loading } = useMovieDetailsFetcher(id);

    let movieObj = temporaryIterator(id);
    let error = false
    let loading = false

    console.log(id);
    console.log(movieObj);


    if(error) {
        return <Error />
       
    }   
    
    else if (loading) {
        return <Loading/>
            }

    else {
        return (
    <MoviePage movieObj={movieObj} />

    
)

    }



    

}