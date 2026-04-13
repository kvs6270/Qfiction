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
import { fetchFunc } from "../../../logic/fetchFunc";
import { castbasedRecommender } from "../../../logic/castBasedRecommender";
import { directorBasedRecommender } from "../../../logic/directorBasedRecommender";
import { Loading } from "../../Cogs/Loading";
// It's own fetching logic.



function useMovieDetailsFetcher(identifier, identifierType, page) {

    const [movieArray, setMovieArray] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        let isMounted = true;

        setError(false);
        setLoading(true);

        async function dataFetching() {

            try {
                const movie = await fetchFunc(identifier, page, identifierType);

                console.log("See:\t" + movie)
                if (isMounted) setMovieArray(movie);
            } catch (error) {
                if (isMounted) setError(true)

                console.log("This Error Occured: ")
                console.log(error)

            } finally {
                if (isMounted) setLoading(false)
            }
        }

        dataFetching();


        return () => {
            isMounted = false
        }
    }, [identifier, identifierType])


    return { movieArray, error, loading }
}





export function RecommendationGridView() {

    const { moviesWatched } = useContext(WatchContext)
    const { identifierType, identifier } = useParams();

    let { movieArray, error, loading } = useMovieDetailsFetcher(identifier, identifierType, 1)

    










    if (error) {
        console.log(error)
        console.log("I see red")
    }

    else if (loading) {
        return <Loading />
    }

    else {

        let recommendedMovies = movieArray;


        if (identifierType == "year") {
            recommendedMovies = yearBasedRecommender(moviesWatched, movieArray)
        }
        else if (identifierType == "genre") {
            recommendedMovies = genreBasedRecommender(moviesWatched, movieArray)
        }
        else if (identifierType == "cast") {
            recommendedMovies = castbasedRecommender(moviesWatched, movieArray)
        }
        else if (identifierType == "director") {
            recommendedMovies = directorBasedRecommender(moviesWatched, movieArray)
        }


        return (
            <div>
                <Navbar />

                <div className={style.GridContainer}>
                    <MovieGrid movieArray={recommendedMovies}></MovieGrid>
                </div>
            </div>
        )
    }




}