import { Outlet } from "react-router";
import React, { useEffect, useMemo, useState } from "react";
import { fetchFunc } from "../../../logic/fetchFunc.js";
import { WatchContext } from "../../../App.jsx";
import { useContext } from "react";

import { genreFilms } from "../../../logic/genreBasedMovies.js";
import { films2026 } from "../../../logic/movies2026.js";

import { castFilms } from "../../../logic/castBasedMovies.js";
import { directorFilms } from "../../../logic/directorBasedMovies.js";
import { ReccStrengthProvider } from "../../../logic/ReccStrengthProvider.js";
import style from "./RecommendationLayout.module.css"
import { Navbar } from "../../Cogs/Navbar.jsx";
import { useRef } from "react";


let genreMap = null;

async function loadGenres() {
    if (!genreMap) {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=YOUR_API_KEY`);
        const data = await res.json();

        genreMap = {};
        data.genres.forEach(g => {
            genreMap[g.id] = g.name;
        });
    }
}

async function genreNameArrayFecther(genreIdArray) {
    await loadGenres();
    return genreIdArray.map(id => genreMap[id]).filter(Boolean);
}


async function getPersonNames(idArray) {
    const results = await Promise.all(
        idArray.map(async (id) => {
            const res = await fetch(
                `https://api.themoviedb.org/3/person/${id}?api_key=YOUR_API_KEY`
            );

            if (!res.ok) return null;

            const data = await res.json();
            return data.name;
        })
    );

    return results.filter(Boolean);
}


const castNameArrayFecther = (castIdArray) => getPersonNames(castIdArray)
const directorNameArrayFecther = (directorIdArray) => getPersonNames(directorIdArray)















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

function useNameArrayFetcher(genreIdArray, castIdArray, directorIdArray) {
    const [genreNameArray, setGenreNameArray] = useState([]);
    const [castNameArray, setCastNameArray] = useState([]);
    const [directorNameArray, setDirectorNameArray] = useState([]);
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        let isMounted = true
        setError(false)
        setLoading(true)

        
            const fetcherFunc = async () => {

                try{
                    const [genres, casts, directors] = await Promise.all([
                    genreNameArrayFecther(genreIdArray),
                    castNameArrayFecther(castIdArray),
                    directorNameArrayFecther(directorIdArray),
                ]);

                if (!isMounted) return;
                setGenreNameArray(genres)

                setCastNameArray(casts)

                setDirectorNameArray(directors)

                console.log("UPDATED REF VALUES:");
                console.log("genres:", genres);
                console.log("casts:", casts);
                console.log("directors:", directors);
                }

                catch (error){
                    if (isMounted) setError(true)
                    console.log(error)
                }

                finally {
                    if (isMounted) setLoading(false)

                }
            };

            fetcherFunc();

        

        return () => {
            isMounted = false;
        };
    }, [genreIdArray, castIdArray, directorIdArray]);


    return {genreNameArray, castNameArray, directorNameArray, error, loading}
}




export function RecommendationLayout() {

    const { moviesWatched, moviesToWatch } = useContext(WatchContext)

    if (moviesWatched.length === 0 || !moviesWatched) {
        return (
            <React.Fragment>
                <Navbar />
                <div className={style.EmptyPageContainer}>

                    <div className={style.icon}>
                        <svg fill="#ffffff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>box</title> <path d="M1.735 17.832l12.054 6.081 2.152-6.081-12.053-5.758-2.153 5.758zM16.211 17.832l2.045 6.027 12.484-6.081-2.422-5.704-12.107 5.758zM-0.247 7.212l4.144 4.843 12.053-6.134-3.928-5.005-12.269 6.296zM32.247 7.319l-12.001-6.403-4.090 5.005 12.162 6.134 3.929-4.736zM3.175 19.353l-0.041 5.839 12.713 5.893v-10.98l-1.816 4.736-10.856-5.488zM16.291 20.105v10.979l12.674-5.893v-5.799l-10.99 5.46-1.684-4.747z"></path> </g></svg>
                    </div>

                    <div className={style.text}>
                        <div>Your Library seems to be Empty</div>
                        <div>Please watch something first</div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    const reccStrengthObj = useMemo(() => {
        return ReccStrengthProvider(moviesWatched)
    }, [moviesWatched])

    console.log(reccStrengthObj)


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








    return (

        <Outlet context={
            { movieObj, error, loading, genreBasedMovies, error2, loading2, castBasedMovies, error3, loading3, directorBasedMovies, error4, loading4 }
        } />




    )



}