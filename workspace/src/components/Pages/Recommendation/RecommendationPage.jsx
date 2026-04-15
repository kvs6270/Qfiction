import { Slider } from "../../Cogs/slider";
import { topRated } from "../../../logic/TopRated";
import { useContext, useMemo } from "react";
import { useOutletContext } from "react-router";
import { Navbar } from "../../Cogs/Navbar";

import { movieOrganizer } from "../../../logic/ReccomendationAlgorithm";
import { genreBasedRecommender } from "../../../logic/genreBasedRecommender";
import { ReccStrengthProvider } from "../../../logic/ReccStrengthProvider";
import { WatchContext } from "../../../App";
import { directorBasedRecommender } from "../../../logic/directorBasedRecommender";
import { castbasedRecommender } from "../../../logic/castBasedRecommender";
import { MainSlider2 } from "./MainSlider2";
import style from "./RecommendationPage.module.css"
import { Loading } from "../../Cogs/Loading";





export function RecommendationPage() {


    const { movieObj, error, loading, genreBasedMovies, error2, loading2, castBasedMovies, error3, loading3, directorBasedMovies, error4, loading4 } = useOutletContext();

    const { moviesWatched, moviesToWatch } = useContext(WatchContext);


    const reccStrengthObj = useMemo(() => {
        return ReccStrengthProvider(moviesWatched)
    }, [moviesWatched])

    console.log("reccStrengthObj")
    console.log(reccStrengthObj)



    const movieOrganizerMemo = useMemo(() => {
    if (loading || !movieObj) return null; // wait until data loaded
    return movieOrganizer(moviesWatched, movieObj);
    }, [moviesWatched, movieObj, loading]);






    const recommendedMovieObj = useMemo(() => {
    if (!movieOrganizerMemo) return [];


    return movieOrganizerMemo.finalReccList;
    }, [movieOrganizerMemo]);






    const genreBasedRecommendedMoviesObj = useMemo(() => {

        console.log("Inside genreBasedRecomm....")
        if (loading2) return {}

        const genreBasedRecommendedMoviesObjProto = {};
        

        for (const genre in genreBasedMovies) {
            
            genreBasedRecommendedMoviesObjProto[genre] = genreBasedRecommender(moviesWatched, genreBasedMovies[genre]);
        }

        console.log("genreBasedRecommendedMoviesObjProto")
        console.log(genreBasedRecommendedMoviesObjProto)

        return genreBasedRecommendedMoviesObjProto;

        
    }, [genreBasedMovies, moviesWatched, loading2, error2])





    const castBasedRecommendedMoviesObj = useMemo(() => {
        if (loading3) return {}

        const castBasedRecommendedMoviesObjProto = {};

        for (const cast in castBasedMovies) {

            castBasedRecommendedMoviesObjProto[cast] = castbasedRecommender(moviesWatched, castBasedMovies[cast]);
        }

        return castBasedRecommendedMoviesObjProto;
    }, [castBasedMovies, moviesWatched, loading3, error3])



    


    const directorBasedRecommendedMoviesObj = useMemo(() => {
        if (loading4) return {}

        const directorBasedRecommendedMoviesObjProto = {};

        for (const director in directorBasedMovies) {

            directorBasedRecommendedMoviesObjProto[director] = directorBasedRecommender(moviesWatched, directorBasedMovies[director]);
        }

        return directorBasedRecommendedMoviesObjProto;
    }, [directorBasedMovies, moviesWatched, loading4, error4])


    console.log("genreBasedRecommendedMoviesObj")
    console.log(genreBasedRecommendedMoviesObj)
    console.log("castBasedRecommendedMoviesObj")
    console.log(castBasedRecommendedMoviesObj)
    console.log("directorBasedRecommendedMoviesObj")
    console.log(directorBasedRecommendedMoviesObj)




    return (

        <div>
            <Navbar></Navbar>

            <div className={style.ReccPage}>
                <>
                    <h3>Top Movies of 2026</h3>
                    <MainSlider2 recommendedMoviesOf2026={recommendedMovieObj} error={error} loading={loading}></MainSlider2>
                </>

                <MegaSlider param={"genre"} paramReccStrengthArray={reccStrengthObj.genreReccStrengthArray} paramBasedRecommendedMoviesObj={genreBasedRecommendedMoviesObj} error={error2} loading={loading2} ></MegaSlider>
                <MegaSlider param={"cast"} paramReccStrengthArray={reccStrengthObj.castReccStrengthArray} paramBasedRecommendedMoviesObj={castBasedRecommendedMoviesObj} error={error3} loading={loading3} ></MegaSlider>
                <MegaSlider param={"director"} paramReccStrengthArray={reccStrengthObj.directorReccStrengthArray} paramBasedRecommendedMoviesObj={directorBasedRecommendedMoviesObj} error={error4} loading={loading4} ></MegaSlider>
            </div>


        </div>

    )

}

function MainSlider({ recommendedMoviesOf2026, error, loading }) {





    if (error) {
        return <Error></Error>
    }
    else if (loading) {
        return <Loading></Loading>

    }
    else {
        return <Slider suggestionType={"Recommended"} movieArray={recommendedMoviesOf2026} identifierType={"Year"} identifier={2026}></Slider>
    }

}


function MegaSlider({ param, paramReccStrengthArray, paramBasedRecommendedMoviesObj, error, loading }) {

        


        function sliderTitle(paramValue) {
        let heading;
        if (param == "genre") {
            heading = `Recommended ${paramValue} movies`
        }

        else if (param == "cast") {

            heading = `recommended movies with ${paramValue}`
        }

        else {

            heading = `More of ${paramValue}`

        }

        return heading;
    }



    let arrayOfSLiders = []




    for (const obj of paramReccStrengthArray) {


        let text = sliderTitle(obj[param]);




        arrayOfSLiders.push(



            <div key={obj[param]}>
                <h3 key={text}>{text}</h3>
                <Slider suggestionType={"Recommended"} movieArray={paramBasedRecommendedMoviesObj[obj[param]]}  identifierType={param} identifier={obj[param]} error={error} loading={loading}></Slider>
            </div>

        )
    }

    return (
        <div className="SliderContainer">

            {arrayOfSLiders}
        </div>
    );
}





