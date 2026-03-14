import { Outlet } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { fetchFunc } from "../../../logic/fetchFunc.js";

import { genreFilms } from "../../../logic/genreBasedMovies.js";
import { films2026 } from "../../../logic/movies2026.js";

import { castFilms } from "../../../logic/castBasedMovies.js";
import { directorFilms } from "../../../logic/directorBasedMovies.js";



const genre = [/*An array of genres*/]
const casts = [/*An array of castes*/]
const directors = [/*An array of directors*/]





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

function useMultiFetch(baseUrl, params) {
    const [paramBasedMovies, setParamBasedMovies] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);




    useEffect(() => {

        let isMounted = true;

        setError(false);
        setLoading(true);

        async function dataFetching() {

            try {
                const paramBasedFetchPromises = params.map(param =>
                    fetchFunc(baseUrl + param)

                );

                const paramBasedMovieArrays = await Promise.all(paramBasedFetchPromises);


                const paramBasedMovieObj = {};

                paramBasedMovieArrays.forEach((movies, index) => {
                    paramBasedMovieObj[params[index]] = movies;
                });

                if (isMounted) setParamBasedMovies(paramBasedMovieObj);

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

    }, [params, baseUrl])





    return { paramBasedMovies, error, loading }

}




export function HomeLayout() {
    // const { movieObj, error, loading } = useSingleFetch(/* Insert URL */);

    // const { genreBasedMovies, error: error2, loading: loading2 } = useMultiFetch(/* genres array*/);
    // const { castBasedMovies, error: error3, loading: loading3 } = useMultiFetch(/* casts  array*/);
    // const { directorBasedMovies, error: error4, loading: loading4 } = useMultiFetch(/* drector array*/);

    const movieObj = [...films2026];
    const error = false;
    const loading =  false; /* shift */ 
    const genreBasedMovies = {...genreFilms};
    const error2 = false;
    const loading2 =  false; /* shift */

    const castBasedMovies = {...castFilms};
    const error3 = false;
    const loading3 = false; /* shift */

    const directorBasedMovies = {...directorFilms};
    const error4 = false;
    const loading4 =  false; /* shift */


        
    
    

    

        return (
            <Outlet context={
            { movieObj, error, loading, genreBasedMovies, error2, loading2, castBasedMovies, error3, loading3,directorBasedMovies, error4, loading4}
        } />
        
        )
   


}

