import { useOutletContext } from "react-router";
import { useState, useEffect, useContext } from "react";

import { MovieGrid } from "../../Cogs/MovieGrid";
import { useParams } from "react-router";
import { Navbar } from "../../Cogs/Navbar";
import { films2026 } from "../../../logic/movies2026";
import { genreFilms } from "../../../logic/genreBasedMovies";

import { WatchContext } from "../../../App";
import { yearBasedRecommender } from "../../../logic/yearBasedRecommender";
import { genreBasedRecommender } from "../../../logic/genreBasedRecommender";
import style from "./RecommendationGridView.module.css"
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

    function temporaryMovieArrayProvider(identifier, moviesWatched) {
        if (identifier == "2026") {
            return yearBasedRecommender(moviesWatched, films2026);
        }

        else {
            return genreBasedRecommender(moviesWatched, genreFilms[identifier])
        }
    }



export function RecommendationGridView() {

    const { moviesWatched } = useContext(WatchContext)
    const { identifier } = useParams();

    // let { movieArray, error, loading } = useMovieDetailsFetcher(identifier)
    
    // if(identifier == "2026") {
    //     movieArray = yearBasedRecommender(movieArray, moviesWatched)
    // }
    // else {
    //     movieArray = genreBasedRecommender(movieArray, moviesWatched)
    // }




    

    const movieArray = temporaryMovieArrayProvider(identifier, moviesWatched);
    const error = false;
    const loading = false;


    if (error) {
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