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

import { Navbar } from "../../Cogs/Navbar.jsx";
import { useRef } from "react";
import { searchMovies } from "../../../logic/searchMovies.js";
import { useNavigate } from "react-router";
import { SearchMovies } from "../../Cogs/SearchMovies.jsx";


const genreFallbackArray = ["Action", "Comedy", "Thriller"]


const castFallbackArray = ["Leonardo DiCaprio", "Scarlett Johansson", "Robert Downey Jr."]

const directorFallbackArray = ["Christopher Nolan", "Martin Scorsese", "Quentin Tarantino"]























let genreMap = null;
const API_KEY = "fdbaf2c187e091a33939c1663cbf099c"

async function loadGenres() {
    if (!genreMap) {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
        const data = await res.json();

        genreMap = {};
        data.genres.forEach(g => {
            genreMap[g.id] = g.name;
        });
    }
}

async function genreNameArrayFecther(genreIdArray) {
    await loadGenres();
    return genreIdArray.map((id, index) => {
        return { id, name: genreMap[id] }
    }).filter(Boolean);
}


async function getPersonNames(idArray) {
    const results = await Promise.all(
        idArray.map(async (id) => {
            const res = await fetch(
                `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}`
            );

            if (!res.ok) return null;

            const data = await res.json();
            return { id, name: data.name };
        })
    );

    return results.filter(Boolean);
}


const castNameArrayFecther = (castIdArray) => getPersonNames(castIdArray)
const directorNameArrayFecther = (directorIdArray) => getPersonNames(directorIdArray)









async function fetchGenreIdArray(genre) {

    const API_KEY = "fdbaf2c187e091a33939c1663cbf099c"

    const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    );
    const data = await res.json();

    let genreIdArray = data.genres.filter(obj => {
        return genre.includes(obj.name)
    }).map((obj) => {
        return { name: obj.name, id: obj.id }
    });



    return genreIdArray;

}






async function fetchCastIdArray(cast) {
    const API_KEY = "fdbaf2c187e091a33939c1663cbf099c";


    async function fetchActorIdByName(name, API_KEY) {
        const res = await fetch(
            `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${encodeURIComponent(name)}`
        );
        const data = await res.json();

        return { name: name, id: data.results[0]?.id || null };
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

        return { name: name, id: data.results[0]?.id || null };
    }

    const directorFetchPromiseArray = director.map(director => fetchDirectorIdByName(director, "fdbaf2c187e091a33939c1663cbf099c"));

    const directorBasedIdArray = await Promise.allSettled(directorFetchPromiseArray);

    let directorIdArray = directorBasedIdArray.map(obj => obj.value)


    return directorIdArray;

}



function useFetchIds(genre, casts, directors) {
    const [genreIdArray, setGenreIdArray] = useState([]);
    const [castIdArray, setCastIdArray] = useState([]);
    const [directorIdArray, setDirectorIdArray] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function fetchAll() {
            try {
                const [g, c, d] = await Promise.all([
                    fetchGenreIdArray(genre),
                    fetchCastIdArray(casts),
                    fetchDirectorIdArray(directors)
                ]);

                if (isMounted) {
                    setGenreIdArray(g);
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
    }, []);

    return { genreIdArray, castIdArray, directorIdArray, loading };
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

            try {
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

            catch (error) {
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


    return { genreNameArray, castNameArray, directorNameArray, error, loading }
}




export function HomeLayout() {
    const [search, setSearch] = useState(false)
    const [focused, setFocused] = useState(false)
    const [searchText, setSearchText] = useState("")


    const { moviesWatched, moviesToWatch } = useContext(WatchContext)

    if (moviesWatched.length === 0 || !moviesWatched) {

        const { genreIdArray, castIdArray, directorIdArray } = useFetchIds(genreFallbackArray, castFallbackArray, directorFallbackArray);

        const genreIds = useMemo(
            () => genreIdArray?.map(item => item.id) || [],
            [genreIdArray]
        );

        const castIds = useMemo(
            () => castIdArray?.map(item => item.id) || [],
            [castIdArray]
        );

        const directorIds = useMemo(
            () => directorIdArray?.map(item => item.id) || [],
            [directorIdArray]
        );


        const { movieObj, error, loading } = useSingleFetch(2026, 1, "Year");

        const { paramBasedMovies: genreBasedMovies, error: error2, loading: loading2 } = useMultiFetch(genreIds, "Genre", 1);



        const { paramBasedMovies: castBasedMovies, error: error3, loading: loading3 } = useMultiFetch(castIds, "Cast", 1);



        const { paramBasedMovies: directorBasedMovies, error: error4, loading: loading4 } = useMultiFetch(directorIds, "Director", 1);


        console.log("genreFallbackArray")
        console.log(genreFallbackArray)
        console.log("genreFallbackArray")
        console.log("castFallbackArray")
        console.log(castFallbackArray)
        console.log("castFallbackArray")
        console.log("directorFallbackArray")
        console.log(directorFallbackArray)
        console.log("directorFallbackArray")


        return (
            <Outlet context={
                { movieObj, error, loading, genreBasedMovies, error2, loading2, castBasedMovies, error3, loading3, directorBasedMovies, error4, loading4, genreNameArray: genreIdArray, castNameArray: castIdArray, directorNameArray: directorIdArray, nameLoading: false, skipped: true }} />
        )


    }

    else {
        const reccStrengthObj = useMemo(() => {
            return ReccStrengthProvider(moviesWatched)
        }, [moviesWatched])

        console.log("reccStrengthObj")
        console.log(reccStrengthObj)
        console.log("reccStrengthObj")






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

        const { genreNameArray, castNameArray, directorNameArray, error: nameError, loading: nameLoading } = useNameArrayFetcher(genreIdArray, castIdArray, directorIdArray)









        const { movieObj, error, loading } = useSingleFetch(2026, 1, "Year");



        const { paramBasedMovies: genreBasedMovies, error: error2, loading: loading2 } = useMultiFetch(genreIdArray, "Genre", 1);



        const { paramBasedMovies: castBasedMovies, error: error3, loading: loading3 } = useMultiFetch(castIdArray, "Cast", 1);

        const { paramBasedMovies: directorBasedMovies, error: error4, loading: loading4 } = useMultiFetch(directorIdArray, "Director", 1);








        return (

            <Outlet context={
                { movieObj, error, loading, genreBasedMovies, error2, loading2, castBasedMovies, error3, loading3, directorBasedMovies, error4, loading4, genreNameArray, castNameArray, directorNameArray, nameLoading, skipped: false }
            } />






        )
    }



}






