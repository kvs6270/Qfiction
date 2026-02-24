import { Outlet } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { fetchFunc } from "../../logic/fetchFunc";
import { createContext } from "react";

const genres = [/*An array of genres*/]





function useSingleFetch(fetchUrl) {

    const [movieObj, setMovieObj] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const isMounted = true;

        setError(false);
        setLoading(true);

        async function dataFetching() {

            try {
                const movieObjArray = await fetchFunc(fetchUrl);
                setMovieObj(movieObjArray);
            } catch (error) {
                setError(true)
                console.log(error)

            } finally {
                setLoading(false)
            }
        }

        dataFetching();


        return () => {
            isMounted = false
        }
    }, [fetchUrl])


    return { movieObj, error, loading }
}

function useMultiFetch(genres) {
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

                setGenreBasedMovies(genreBasedMovieObj);

            } catch (error) {
                setError(true);
                console.log(error);

            } finally {
                setLoading(false)
            }

        }

        dataFetching();

        return () => {
            isMounted = false
        }

    }, [genres])





    return { genreBasedMovies, error, loading }

}

export const HomeContext = createContext({
    parentUrl: ""
});


export function HomeLayout() {
    const { movieObj, error, loading } = useSingleFetch(/* Insert URL */);
    const { genreBasedMovies, error: error2, loading: loading2 } = useMultiFetch(/* genres array*/);

    <HomeContext value={"Home"}>

        <Outlet context={
            { movieObj, error, loading, genreBasedMovies, error2, loading2 }
        } />
        
    </HomeContext>


}

