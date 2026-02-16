import { Slider } from "../Cogs/slider";
import { Tile } from "../Cogs/tile";
import { WatchContext } from "../../App";
import { topRated } from "../../logic/TopRated";
import { useEffect, useMemo, useState } from "react";

const genres = [/*An array of genres*/]

function useSingleFetch (fetchUrl)  {

    const [movieObj, setMovieObj] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

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
    }, [fetchUrl])

    const topRatedMovieObj = useMemo(() => {
        return topRated(movieObj, 1000);
    }, [movieObj])

    return { topRatedMovieObj, error, loading }
}

function useMultiFetch (genres)  {
    const [genreBasedMovies, setGenreBasedMovies] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);




    useEffect(() => {

        setError(false);
        setLoading(true);

        async function dataFetching() {

            try {
                const genreBasedFetchPromises = genres.map(genre =>
                    fetchFunc(/* Fetch movie of genre based on fetchURL*/)
                    /* Inlclude error handling in fetchFunc */
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

    }, [genres])



    const genreBasedTopRatedMoviesObj = useMemo(() => {

        const genreBasedTopRatedMoviesObjProto = {};

        for (const genre in genreBasedMovies) {

            genreBasedTopRatedMoviesObjProto[genre] = topRated(genreBasedMovies[genre], 1000);
        }

        return genreBasedTopRatedMoviesObjProto;
    }, [genreBasedMovies])

    return {genreBasedTopRatedMoviesObj, error, loading}
}




function HomePage() {

    const {topRatedMovieObj, error, loading} = useSingleFetch(/* Insert URL */);
    const {genreBasedTopRatedMoviesObj, error: error2, loading: loading2} = useMultiFetch(/* genres array*/);


    return (

        <div>
            <MainSlider topRatedMoviesOf2026 = {topRatedMovieObj} error = {error} loading = {loading}></MainSlider>
            <MegaSlider genreBasedTopRatedMoviesObj = {genreBasedTopRatedMoviesObj} error = {error2} loading = {loading2} ></MegaSlider>
        </div>

    )

}

function MainSlider({topRatedMoviesOf2026, error, loading}) {



    if (error) {
        return <Error></Error>
    }
    else if (loading) {
        return <Loading></Loading>

    }
    else {
        return <Slider movieArray={topRatedMoviesOf2026}></Slider>
    }

}


function MegaSlider({genreBasedTopRatedMoviesObj, error, loading}) {



    if (error) {
        return <Error></Error>
    }
    else if (loading) {
        return <Loading></Loading>
    }
    else {
        let arrayOfSLiders = []
        for (const genre in genreBasedTopRatedMoviesObj) {

            arrayOfSLiders.push(<Slider movieArray={genreBasedTopRatedMoviesObj[genre]} key={genre}></Slider>)
        }

        return arrayOfSLiders;
    }

}

function Error() {
    /* blah blah blah */
}

function Loading() {
    /* Blah Blah Blah */
}
