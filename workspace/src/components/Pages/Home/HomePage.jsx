import { Slider } from "../../Cogs/slider";
import { topRated } from "../../../logic/TopRated";
import {useMemo} from "react";
import { useOutletContext } from "react-router";
import { Navbar } from "../../Cogs/Navbar";







export function HomePage() {

    // const {topRatedMovieObj, error, loading} = useSingleFetch(/* Insert URL */);
    // const {genreBasedTopRatedMoviesObj, error: error2, loading: loading2} = useMultiFetch(/* genres array*/);

    const {movieObj, error, loading, genreBasedMovies, error2, loading2} = useOutletContext();

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


    return (

        <div>
            <Navbar></Navbar>
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
        return <Slider movieArray={topRatedMoviesOf2026} identifierType = {"Year"} identifier = {2026}></Slider>
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

            arrayOfSLiders.push(<Slider movieArray={genreBasedTopRatedMoviesObj[genre]} key={genre} identifierType = {"genre"} identifier = {genre}></Slider>)
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
