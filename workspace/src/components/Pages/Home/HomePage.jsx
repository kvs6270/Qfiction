import { Slider } from "../../Cogs/slider";
import { topRated } from "../../../logic/TopRated";
import { useMemo } from "react";
import { useOutletContext } from "react-router";
import { Navbar } from "../../Cogs/Navbar";







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
            <MainSlider topRatedMoviesOf2026={topRatedMovieObj} error={error} loading={loading}></MainSlider>
            <MegaSlider paramBasedTopRatedMoviesObj={genreBasedTopRatedMoviesObj} error={error2} loading={loading2} ></MegaSlider>
            <MegaSlider paramBasedTopRatedMoviesObj={castBasedTopRatedMoviesObj} error={error3} loading={loading3} ></MegaSlider>
            <MegaSlider paramBasedTopRatedMoviesObj={directorBasedTopRatedMoviesObj} error={error4} loading={loading4} ></MegaSlider>
        </div>

    )

}

function MainSlider({ topRatedMoviesOf2026, error, loading }) {



    if (error) {
        return <Error></Error>
    }
    else if (loading) {
        return <Loading></Loading>

    }
    else {
        return <Slider suggestionType={"TopRated"} movieArray={topRatedMoviesOf2026} identifierType={"Year"} identifier={2026}></Slider>
    }

}


function MegaSlider({ paramBasedTopRatedMoviesObj, error, loading }) {



    if (error) {
        return <Error></Error>
    }
    else if (loading) {
        return <Loading></Loading>
    }
    else {
        let arrayOfSLiders = []
        for (const param in paramBasedTopRatedMoviesObj) {

            arrayOfSLiders.push(<Slider suggestionType={"TopRated"} movieArray={paramBasedTopRatedMoviesObj[param]} key={param} identifier={param}></Slider>)
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
