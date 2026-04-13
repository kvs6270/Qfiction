import { Outlet } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { fetchFunc } from "../../../logic/fetchFunc.js";

import { genreFilms } from "../../../logic/genreBasedMovies.js";
import { films2026 } from "../../../logic/movies2026.js";

import { castFilms } from "../../../logic/castBasedMovies.js";
import { directorFilms } from "../../../logic/directorBasedMovies.js";



const genre = ["Action", "Comedy", "Thriller", "Romance", "Science Fiction"]
const casts = ["Leonardo DiCaprio","Scarlett Johansson","Robert Downey Jr.","Emma Stone","Tom Cruise","Jennifer Lawrence","Denzel Washington","Margot Robbie","Chris Hemsworth","Zendaya"]
const directors = ["Christopher Nolan", "Martin Scorsese", "Quentin Tarantino", "Ridley Scott", "Alfred Hitchcock", "Steven Spielberg"]



async function fetchGenreIdArray(genre) {

    const API_KEY = "fdbaf2c187e091a33939c1663cbf099c"

    const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    );
    const data = await res.json();

    let genreIdArray = data.genres.filter(obj => {
        return genre.includes(obj.name)
    }).map((obj) => {
        return obj.id
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



function useFetchIds() {
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

        let isMounted = true;

        setError(false);
        setLoading(true);

        async function dataFetching() {

            try {
                const movieObjArray = await fetchFunc(year, page, paramType);
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
    }, [year, page])


   
    



    return { movieObj, error, loading }
}

function useMultiFetch(params, paramType, page,) {

    console.log(paramType)
    console.log(params)

   
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

    }, [params, page])



    
    return { paramBasedMovies, error, loading }

}




export function HomeLayout() {

    const {genreIdArray, castIdArray, directorIdArray} = useFetchIds();

    const { movieObj, error, loading } = useSingleFetch(2026, 1, "Year");

    const { paramBasedMovies: genreBasedMovies, error: error2, loading: loading2 } = useMultiFetch(genreIdArray, "Genre", 1);

    

    const { paramBasedMovies: castBasedMovies, error: error3, loading: loading3 } = useMultiFetch(castIdArray, "Cast", 1);



    const { paramBasedMovies: directorBasedMovies, error: error4, loading: loading4 } = useMultiFetch(directorIdArray, "Director", 1);

    // const movieObj = [...films2026];
    // const error = false;
    // const loading =  false; /* shift */ 
    // const genreBasedMovies = {...genreFilms};
    // const error2 = false;
    // const loading2 =  false; /* shift */

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

