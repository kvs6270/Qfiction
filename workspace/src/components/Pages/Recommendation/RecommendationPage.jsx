import { Slider } from "../../Cogs/slider";
import { topRated } from "../../../logic/TopRated";
import {useContext, useMemo} from "react";
import { useOutletContext } from "react-router";
import { Navbar } from "../../Cogs/Navbar";

import { movieOrganizer } from "../../../logic/ReccomendationAlgorithm";
import { genreBasedRecommender } from "../../../logic/genreBasedRecommender";

import { WatchContext } from "../../../App";
import { directorBasedRecommender } from "../../../logic/directorBasedRecommender";
import { castbasedRecommender } from "../../../logic/castBasedRecommender";






export function RecommendationPage() {


    const { movieObj, error, loading, genreBasedMovies, error2, loading2, castBasedMovies, error3, loading3,directorBasedMovies, error4, loading4} = useOutletContext();

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

    const castBasedRecommendedMoviesObj = useMemo(() => {
    
            const castBasedRecommendedMoviesObjProto = {};
    
            for (const cast in castBasedMovies) {
    
                castBasedRecommendedMoviesObjProto[cast] = castbasedRecommender(moviesWatched, castBasedMovies[cast]);
            }
    
            return castBasedRecommendedMoviesObjProto;
        }, [castBasedMovies, moviesWatched])


    const directorBasedRecommendedMoviesObj = useMemo(() => {
    
            const directorBasedRecommendedMoviesObjProto = {};
    
            for (const director in directorBasedMovies) {
    
                directorBasedRecommendedMoviesObjProto[director] = directorBasedRecommender(moviesWatched, directorBasedMovies[director]);
            }
    
            return directorBasedRecommendedMoviesObjProto;
        }, [directorBasedMovies, moviesWatched])




    return (

        <div>
            <Navbar></Navbar>
            <MainSlider recommendedMoviesOf2026 = {recommendedMovieObj} error = {error} loading = {loading}></MainSlider>
            <MegaSlider param = {"genre"} paramReccStrengthArray = {movieOrgainzer.genreReccStrengthArray} paramBasedRecommendedMoviesObj = {genreBasedRecommendedMoviesObj} error = {error2} loading = {loading2} ></MegaSlider>
            <MegaSlider param = {"cast"} paramReccStrengthArray = {movieOrgainzer.castReccStrengthArray} paramBasedRecommendedMoviesObj = {castBasedRecommendedMoviesObj} error = {error2} loading = {loading2} ></MegaSlider>
            <MegaSlider param = {"director"} paramReccStrengthArray = {movieOrgainzer.directorReccStrengthArray} paramBasedRecommendedMoviesObj = {directorBasedRecommendedMoviesObj} error = {error2} loading = {loading2} ></MegaSlider>
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


function MegaSlider({param, paramReccStrengthArray, paramBasedRecommendedMoviesObj, error, loading}) {

   function sliderTitle(paramValue) {
    let heading;
     if (param == "genre" ) {
        heading = `Recommended ${paramValue} movies`
    }

    else if(param == "cast") {

        heading = `recommended movies with ${paramValue}`
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

        


        for (const obj of paramReccStrengthArray) {



             
            
            

            arrayOfSLiders.push(

                <>
                <h3>{sliderTitle(obj[param])}</h3>
            <Slider suggestionType={"Recommended"} movieArray={paramBasedRecommendedMoviesObj[obj[param]]} key={obj[param]} identifierType = {"param"} identifier = {obj[param]}></Slider>
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

