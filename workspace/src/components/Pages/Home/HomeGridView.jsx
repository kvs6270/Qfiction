import { useOutletContext } from "react-router";
import { useState, useEffect } from "react";

import { MovieGrid } from "../../Cogs/MovieGrid";
import { useParams } from "react-router";
import { Navbar } from "../../Cogs/Navbar";
import { films2026} from "../../../logic/movies2026";
import { genreFilms } from "../../../logic/genreBasedMovies";
import { topRated } from "../../../logic/TopRated";
import style from "./HomeGridView.module.css"
import { fetchFunc } from "../../../logic/fetchFunc";
import { Loading } from "../../Cogs/Loading";


// It's own fetching logic.



function useMovieDetailsFetcher(identifier, identifierType, page) {

    const [movieArray, setMovieArray] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {

        let isMounted = true;

        setError(false);
        setLoading(true);

        async function dataFetching() {

            try {
                const movie = await fetchFunc(identifier, page, identifierType);
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




export function HomeGridView() {


    const { identifier, identifierType } = useParams();

    const { movieArray, error, loading } = useMovieDetailsFetcher(identifier, identifierType, 1)

    
    

    if(error) {
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
                    <MovieGrid movieArray={topRated(movieArray, 100)}></MovieGrid>
                </div>
            </div>
        )
    }

    


}