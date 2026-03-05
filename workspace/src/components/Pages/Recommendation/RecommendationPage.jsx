import { Slider } from "../../Cogs/slider";
import { topRated } from "../../../logic/TopRated";
import {useContext, useMemo} from "react";
import { useOutletContext } from "react-router";
import { Navbar } from "../../Cogs/Navbar";

import { movieOrganizer } from "../../../logic/ReccomendationAlgorithm";
import { genreBasedRecommender } from "../../../logic/genreBasedRecommender";

import { WatchContext } from "../../../App";






export function RecommendationPage() {

    // const {topRatedMovieObj, error, loading} = useSingleFetch(/* Insert URL */);
    // const {genreBasedTopRatedMoviesObj, error: error2, loading: loading2} = useMultiFetch(/* genres array*/);

    const {movieObj, error, loading, genreBasedMovies, error2, loading2} = useOutletContext();
    const {moviesWatched, moviesToWatch} = useContext(WatchContext);

    

    const movieOrgainzer = movieOrganizer(moviesWatched, movieObj);

    if(!movieOrgainzer) {
        return (<div>
            <h1>Please Watch Something First!</h1>
        </div>)
    }

    console.log(movieOrgainzer.finalReccList)

    const recommendedMovieObj = useMemo(() => {
        return movieOrgainzer.finalReccList;
    }, [movieOrgainzer.finalReccList])

    const genreBasedRecommendedMoviesObj = useMemo(() => {
    
            const genreBasedRecommendedMoviesObjProto = {};
    
            for (const genre in genreBasedMovies) {
    
                genreBasedRecommendedMoviesObjProto[genre] = genreBasedRecommender(moviesWatched, genreBasedMovies[genre]);
            }
    
            return genreBasedRecommendedMoviesObjProto;
        }, [genreBasedMovies, moviesWatched])




    return (

        <div>
            <Navbar></Navbar>
            <MainSlider recommendedMoviesOf2026 = {recommendedMovieObj} error = {error} loading = {loading}></MainSlider>
            <MegaSlider genreReccStrengthArray = {movieOrgainzer.genreReccStrengthArray} genreBasedRecommendedMoviesObj = {genreBasedRecommendedMoviesObj} error = {error2} loading = {loading2} ></MegaSlider>
        </div>

    )

}

function MainSlider({recommendedMoviesOf2026, error, loading}) {





    if (error) {
        return <Error></Error>
    }
    else if (loading) {
        return <Loading></Loading>

    }
    else {
        return <Slider suggestionType={"Recommended"} movieArray={recommendedMoviesOf2026} identifierType = {"Year"} identifier = {2026}></Slider>
    }

}


function MegaSlider({genreReccStrengthArray, genreBasedRecommendedMoviesObj, error, loading}) {




    if (error) {
        return <Error></Error>
    }
    else if (loading) {
        return <Loading></Loading>
    }
    else {
        let arrayOfSLiders = []

        


        for (let obj of genreReccStrengthArray) {

            

            arrayOfSLiders.push(<Slider suggestionType={"Recommended"} movieArray={genreBasedRecommendedMoviesObj[obj.genre]} key={obj.genre} identifierType = {"genre"} identifier = {obj.genre}></Slider>)
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

