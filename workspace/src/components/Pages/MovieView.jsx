import { useEffect, useState } from "react"
import { MoviePage } from "../Cogs/MoviePage";
import { useParams } from "react-router";
import { fetchMovie } from "../../logic/fetchMovie";

import { genreFilms } from "../../logic/genreBasedMovies.js";
import { films2026 } from "../../logic/movies2026.js";
import { Navbar } from "../Cogs/Navbar.jsx";
import { castFilms } from "../../logic/castBasedMovies.js";
import style from "./MovieView.module.css"
import { directorFilms } from "../../logic/directorBasedMovies.js";
import { Loading } from "../Cogs/Loading.jsx";
import { SearchMovies } from "../Cogs/SearchMovies.jsx";


// function temporaryIterator(id) {
//     for (let movie of films2026) {
//         if(movie.id == id) {
//             return movie;
//         }
//     }

//     for(let genre in genreFilms) {
//         for (let movie of genreFilms[genre]) {
//         if(movie.id == id) {
//             return movie;
//         }
//     }
//     }
//     for(let cast in castFilms) {
//         for (let movie of castFilms[cast]) {
//         if(movie.id == id) {
//             return movie;
//         }
//     }
//     }
//     for(let director in directorFilms) {
//         for (let movie of directorFilms[director]) {
//         if(movie.id == id) {
//             return movie;
//         }
//     }
//     }
// }




function useMovieDetailsFetcher(id) {

    const [movieObj, setMovieObj] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);




    useEffect(() => {

        let isMounted = true;

        setError(false);
        setLoading(true);

        async function dataFetching() {

            try {
                const movie = await fetchMovie(id);
                if (isMounted) setMovieObj(movie);
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
    }, [id])


    return { movieObj, error, loading }
}


export function MovieView() {


    const [search, setSearch] = useState(false)
    const [focused, setFocused] = useState(false)
    const [searchText, setSearchText] = useState("")







    const { id } = useParams();




    const { movieObj, error, loading } = useMovieDetailsFetcher(id);

    // let movieObj = temporaryIterator(id);
    // let error = false
    // let loading = false




    if (error) {
        return <Error />

    }


    else {
        return (
            <div>
                <Navbar search={search} searchSetter={() => {
                    setSearch(!search)
                    setFocused(false)
                    setSearchText("")
                }}></Navbar>


                <div className={search ? `${style.searchInput} ${style.Engaged}` : `${style.searchInput}`}>

                    <input

                        onFocus={() => {
                            setFocused(true)
                        }}


                        value={searchText}

                        onChange={(e) => setSearchText(e.target.value)}
                        type="text"
                        placeholder="Search..." />


                </div>


                {focused

                    ?

                    <div className={style.searchFields}>

                        <div className={style.ExternalSearchContainer}>
                            <SearchMovies searchString={searchText} />
                        </div>

                    </div>

                    :

                    <div className={[
                        style.MoviePageContainer,
                        search && style.Searcher,
                        focused && style.Focused
                    ]
                        .filter(Boolean)
                        .join(" ")}>







                        <MoviePage movieObj={movieObj || []} loading={loading} />

                    </div>



                }



            </div>


        )

    }





}