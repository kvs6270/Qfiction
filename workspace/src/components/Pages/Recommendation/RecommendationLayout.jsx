import { Outlet } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { fetchFunc } from "../../../logic/fetchFunc.js";

import { genreFilms } from "../../../logic/genreBasedMovies.js";
import { films2026 } from "../../../logic/movies2026.js";

const genres = [/*An array of genres*/]





function useSingleFetch(fetchUrl) {

    const [movieObj, setMovieObj] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        let isMounted = true;

        setError(false);
        setLoading(true);

        async function dataFetching() {

            try {
                const movieObjArray = await fetchFunc(fetchUrl);
                if (isMounted) setMovieObj(movieObjArray);
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
    }, [fetchUrl])


    return { movieObj, error, loading }
}

function useMultiFetch(baseUrl, genres) {
    const [genreBasedMovies, setGenreBasedMovies] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);




    useEffect(() => {

        let isMounted = true;

        setError(false);
        setLoading(true);

        async function dataFetching() {

            try {
                const genreBasedFetchPromises = genres.map(genre =>
                    fetchFunc(baseUrl + genre)

                );

                const genreBasedMovieArrays = await Promise.all(genreBasedFetchPromises);


                const genreBasedMovieObj = {};

                genreBasedMovieArrays.forEach((movies, index) => {
                    genreBasedMovieObj[genres[index]] = movies;
                });

                if (isMounted) setGenreBasedMovies(genreBasedMovieObj);

            } catch (error) {
                if (isMounted) setError(true);
                console.log(error);

            } finally {
                if (isMounted) setLoading(false)
            }

        }

        dataFetching();

        return () => {
            isMounted = false
        }

    }, [genres, baseUrl])





    return { genreBasedMovies, error, loading }

}




export function RecommendationLayout() {
    // const { movieObj, error, loading } = useSingleFetch(/* Insert URL */);

    // const { genreBasedMovies, error: error2, loading: loading2 } = useMultiFetch(/* genres array*/);

    const movieObj = [...films2026];
 
    const genreBasedMovies = {...genreFilms};

    const error = false
    const loading = false
    const error2 = false;
    const loading2 = false;

    

        return (
            <Outlet context={
            { movieObj, error, loading, genreBasedMovies, error2, loading2 }
        } />
        
        )
   


}

