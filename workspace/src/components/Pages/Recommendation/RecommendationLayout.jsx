import { Outlet } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { fetchFunc } from "../../../logic/fetchFunc.js";
import { WatchContext } from "../../../App.jsx";
import { useContext } from "react";

import { genreFilms } from "../../../logic/genreBasedMovies.js";
import { films2026 } from "../../../logic/movies2026.js";

import { castFilms } from "../../../logic/castBasedMovies.js";
import { directorFilms } from "../../../logic/directorBasedMovies.js";
import { ReccStrengthProvider } from "../../../logic/ReccStrengthProvider.js";














async function fetchCastIdArray(cast) {
    const API_KEY = "fdbaf2c187e091a33939c1663cbf099c";


    async function fetchActorIdByName(name, API_KEY) {
        const res = await fetch(
            `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${encodeURIComponent(name)}`
        );
        const data = await res.json();

        return data.results[0]?.id || null;
    }

    const castFetchPromiseArray = cast.map(actor => fetchActorIdByName(actor, "fdbaf2c187e091a33939c1663cbf099c"));

    const castBasedIdArray = await Promise.allSettled(castFetchPromiseArray);

    let castIdArray = castBasedIdArray.map(obj => obj.value)


    return castIdArray;

}

async function fetchDirectorIdArray(director) {
    const API_KEY = "fdbaf2c187e091a33939c1663cbf099c";


    async function fetchDirectorIdByName(name, API_KEY) {
        const res = await fetch(
            `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${encodeURIComponent(name)}`
        );
        const data = await res.json();

        return data.results[0]?.id || null;
    }

    const directorFetchPromiseArray = director.map(director => fetchDirectorIdByName(director, "fdbaf2c187e091a33939c1663cbf099c"));

    const directorBasedIdArray = await Promise.allSettled(directorFetchPromiseArray);

    let directorIdArray = directorBasedIdArray.map(obj => obj.value)


    return directorIdArray;

}



function useFetchIds(casts, directors) {
    const [castIdArray, setCastIdArray] = useState([]);
    const [directorIdArray, setDirectorIdArray] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function fetchAll() {
            try {
                const [c, d] = await Promise.all([
                    fetchCastIdArray(casts),
                    fetchDirectorIdArray(directors)
                ]);

                if (isMounted) {
                    setCastIdArray(c);
                    setDirectorIdArray(d);
                }
            } catch (e) {
                console.log(e);
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchAll();

        return () => (isMounted = false);
    }, [casts, directors]);

    return { castIdArray, directorIdArray, loading };
}










function useSingleFetch(year, page, paramType) {

    const [movieObj, setMovieObj] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {



        setError(false);
        setLoading(true);

        async function dataFetching() {

            try {
                const movieObjArray = await fetchFunc(year, page, paramType);


                setMovieObj(movieObjArray);
            } catch (error) {
                setError(true)
                console.log(error)

            } finally {
                setLoading(false)
            }
        }

        dataFetching();

    }, [year, page, paramType])




    return { movieObj, error, loading }
}

function useMultiFetch(params, paramType, page,) {



    console.log("Find Me")
    console.log(paramType)
    console.log(params)



    const [paramBasedMovies, setParamBasedMovies] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);




    useEffect(() => {
        if (!params || params.length === 0) return

        let isMounted = true;

        setError(false);
        setLoading(true);

        async function dataFetching() {




            try {

                const paramBasedFetchPromises = params.map(param =>
                    fetchFunc(param, page, paramType)

                );



                const paramBasedMovieArrays = await Promise.allSettled(paramBasedFetchPromises);




                const paramBasedMovieObj = {};

                paramBasedMovieArrays.forEach((movies, index) => {
                    paramBasedMovieObj[params[index]] = movies.value;
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

    }, [params, page, paramType])


    console.log("Look Here")
    console.log(paramBasedMovies)

    return { paramBasedMovies, error, loading }

}




export function RecommendationLayout() {

    const { moviesWatched, moviesToWatch } = useContext(WatchContext)

    const reccStrengthObj = useMemo(() => {
        return ReccStrengthProvider(moviesWatched)
    }, [moviesWatched])


    // const castArray = useMemo(
    //     () => reccStrengthObj.castReccStrengthArray.map(item => item.cast),
    //     [reccStrengthObj]
    // );

    // const directorArray = useMemo(
    //     () => reccStrengthObj.directorReccStrengthArray.map(item => item.director),
    //     [reccStrengthObj]
    // );

    // console.log(castArray)
    // console.log(directorArray)



    // const { castIdArray, directorIdArray } = useFetchIds(castArray, directorArray);



    const genreIdArray = useMemo(
        () => reccStrengthObj.genreReccStrengthArray.map((item => +(item.genre))),
        [reccStrengthObj]
    );
    const castIdArray = useMemo(
        () => reccStrengthObj.castReccStrengthArray.map((item => +(item.cast))),
        [reccStrengthObj]
    );
    const directorIdArray = useMemo(
        () => reccStrengthObj.directorReccStrengthArray.map((item => +(item.director))),
        [reccStrengthObj]
    );

    const { movieObj, error, loading } = useSingleFetch(2026, 1, "Year");

    


    const { paramBasedMovies: genreBasedMovies, error: error2, loading: loading2 } = useMultiFetch(genreIdArray, "Genre", 1);



    const { paramBasedMovies: castBasedMovies, error: error3, loading: loading3 } = useMultiFetch(castIdArray, "Cast", 1);

    const { paramBasedMovies: directorBasedMovies, error: error4, loading: loading4 } = useMultiFetch(directorIdArray, "Director", 1);



    // const { directorBasedMovies, error: error4, loading: loading4 } = useMultiFetch(/* drector array*/);

    // const movieObj = [...films2026];
    // const error = false;
    // const loading =  false; /* shift */ 


    // const genreBasedMovies = { ...genreFilms };
    // const error2 = false;
    // const loading2 = false; /* shift */

    // const castBasedMovies = { ...castFilms };
    // const error3 = false;
    // const loading3 = false; /* shift */

    // const directorBasedMovies = { ...directorFilms };
    // const error4 = false;
    // const loading4 = false; /* shift */




    console.log("genreBasedMovies from Layout:")
    console.log(genreBasedMovies)
    console.log("castBasedMovies from Layout:")
    console.log(castBasedMovies)
    console.log("directorBasedMovies from Layout:")
    console.log(directorBasedMovies)



    return (

        <Outlet context={
            { movieObj, error, loading, genreBasedMovies, error2, loading2, castBasedMovies, error3, loading3, directorBasedMovies, error4, loading4 }
        } />




    )



}