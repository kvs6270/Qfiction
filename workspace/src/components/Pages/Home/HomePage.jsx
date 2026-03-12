import { Slider } from "../../Cogs/slider";
import { topRated } from "../../../logic/TopRated";
import { useMemo } from "react";
import { useOutletContext } from "react-router";
import { Navbar } from "../../Cogs/Navbar";

import { MainSlider2 } from "./MainSlider2";







export function HomePage() {

    // const {topRatedMovieObj, error, loading} = useSingleFetch(/* Insert URL */);
    // const {genreBasedTopRatedMoviesObj, error: error2, loading: loading2} = useMultiFetch(/* genres array*/);

    const { movieObj, error, loading, genreBasedMovies, error2, loading2, castBasedMovies, error3, loading3, directorBasedMovies, error4, loading4 } = useOutletContext();

    const topRatedMovieObj = useMemo(() => {
        return topRated(movieObj, 1000);
    }, [movieObj])



    const genreBasedTopRatedMoviesObj = useMemo(() => {

        const genreBasedTopRatedMoviesObjProto = {};

        for (const genre in genreBasedMovies) {

            genreBasedTopRatedMoviesObjProto[genre] = topRated(genreBasedMovies[genre], 1000);
        }

        return genreBasedTopRatedMoviesObjProto;
    }, [genreBasedMovies])


    const castBasedTopRatedMoviesObj = useMemo(() => {

        const castBasedTopRatedMoviesObjProto = {};

        for (const cast in castBasedMovies) {

            castBasedTopRatedMoviesObjProto[cast] = topRated(castBasedMovies[cast], 1000);
        }

        return castBasedTopRatedMoviesObjProto;
    }, [castBasedMovies])


    const directorBasedTopRatedMoviesObj = useMemo(() => {

        const directorBasedTopRatedMoviesObjProto = {};

        for (const director in directorBasedMovies) {

            directorBasedTopRatedMoviesObjProto[director] = topRated(directorBasedMovies[director], 1000);
        }

        return directorBasedTopRatedMoviesObjProto;
    }, [directorBasedMovies])


    return (

        <div>
            <Navbar></Navbar>
            <MainSlider2 topRatedMoviesOf2026={topRatedMovieObj} error={error} loading={loading}></MainSlider2>
            

            <MegaSlider mainParam = "genre" paramBasedTopRatedMoviesObj={genreBasedTopRatedMoviesObj} error={error2} loading={loading2} ></MegaSlider>
            <MegaSlider mainParam="cast" paramBasedTopRatedMoviesObj={castBasedTopRatedMoviesObj} error={error3} loading={loading3} ></MegaSlider>
            <MegaSlider mainParam="director" paramBasedTopRatedMoviesObj={directorBasedTopRatedMoviesObj} error={error4} loading={loading4} ></MegaSlider>
        </div>

    )

}




function MegaSlider({mainParam, paramBasedTopRatedMoviesObj, error, loading }) {

     function sliderTitle(paramValue) {
    let heading;
     if (mainParam == "genre" ) {
        heading = `Top Rated ${paramValue} movies`
    }

    else if(mainParam == "cast") {

        heading = `Top Rated movies with ${paramValue}`
    } 

    else {

        heading = `More of ${paramValue}`

    }

    return heading;
   }



    if (error) {
        return <Error></Error>
    }
    else if (loading) {
        return <Loading></Loading>
    }
    else {
        let arrayOfSLiders = []
        for (const param in paramBasedTopRatedMoviesObj) {

            let text = sliderTitle(param);
            arrayOfSLiders.push(
            <>
            <h3 key={text}>{text}</h3>
            <Slider suggestionType={"TopRated"} movieArray={paramBasedTopRatedMoviesObj[param]} key={param} identifier={param}></Slider>
            </>
        
        )
        }

        return (
            <div className="SliderContainer">
                {arrayOfSLiders}
            </div>
        );
    }

}

function Error() {
    /* blah blah blah */
}

function Loading() {
    /* Blah Blah Blah */
}
