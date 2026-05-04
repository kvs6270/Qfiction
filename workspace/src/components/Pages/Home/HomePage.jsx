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
import { MainSlider2 } from "./MainSlider2.jsx";
import style from "./HomePage.module.css"
import { Loading } from "../../Cogs/Loading";

import { useState } from "react";
import { SearchMovies } from "../../Cogs/SearchMovies";
import { useNavigate } from "react-router";
import { useEffect } from "react";







export function HomePage() {

    const [search, setSearch] = useState(false)
    const [focused, setFocused] = useState(false)
    const [searchText, setSearchText] = useState("")


    const { movieObj, error, loading, genreBasedMovies, error2, loading2, castBasedMovies, error3, loading3, directorBasedMovies, error4, loading4, genreNameArray, castNameArray, directorNameArray, nameError, nameLoading } = useOutletContext();

    const { moviesWatched, moviesToWatch } = useContext(WatchContext);


    const reccStrengthObj = useMemo(() => {
        return ReccStrengthProvider(moviesWatched)
    }, [moviesWatched])

    console.log("reccStrengthObj")
    console.log(reccStrengthObj)



    // const movieOrganizerMemo = useMemo(() => {
    //     if (loading || !movieObj) return null; // wait until data loaded
    //     return movieOrganizer(moviesWatched, movieObj);
    // }, [moviesWatched, movieObj, loading]);






    const recommendedMovieObj = useMemo(() => {
        if (!movieObj) return [];


        return topRated(movieObj, 100);
    }, [movieObj, error, loading]);






    const genreBasedTopRatedMoviesObj = useMemo(() => {

       
        if (loading2) return {}

        const genreBasedTopRatedMoviesObjProto = {};


        for (const genre in genreBasedMovies) {

            console.log("genreBasedMovies[genre]" )
            console.log(genreBasedMovies[genre] )
            console.log("genreBasedMovies[genre]" )

           

            genreBasedTopRatedMoviesObjProto[genre] = topRated(genreBasedMovies[genre], 100);
        }

        

        return genreBasedTopRatedMoviesObjProto;


    }, [genreBasedMovies, moviesWatched, loading2, error2])





    const castBasedTopRatedMoviesObj = useMemo(() => {
        if (loading3) return {}

        const castBasedTopRatedMoviesObjProto = {};

        for (const cast in castBasedMovies) {

            console.log("castBasedMovies[cast]")
            console.log(castBasedMovies[cast])
            console.log("castBasedMovies[cast]")

            castBasedTopRatedMoviesObjProto[cast] = topRated(castBasedMovies[cast], 100);
        }

        return castBasedTopRatedMoviesObjProto;
    }, [castBasedMovies, moviesWatched, loading3, error3])






    const directorBasedTopRatedMoviesObj = useMemo(() => {
        if (loading4) return {}

        const directorBasedTopRatedMoviesObjProto = {};

        for (const director in directorBasedMovies) {

            console.log("directorBasedMovies[director]")
            console.log(directorBasedMovies[director])
            console.log("directorBasedMovies[director]")

            directorBasedTopRatedMoviesObjProto[director] = topRated(directorBasedMovies[director], 100);
        }

        return directorBasedTopRatedMoviesObjProto;
    }, [directorBasedMovies, moviesWatched, loading4, error4])


    console.log("genreBasedTopRatedMoviesObj")
    console.log(genreBasedTopRatedMoviesObj)
    console.log("castBasedTopRatedMoviesObj")
    console.log(castBasedTopRatedMoviesObj)
    console.log("directorBasedTopRatedMoviesObj")
    console.log(directorBasedTopRatedMoviesObj)




    return (

        <div className={style.bodyProto}>
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

                    <SearchMovies searchString={searchText} />

                </div>

                :

                <div className={[
                    style.HomePage,
                    search && style.Searcher,
                    focused && style.Focused
                ]
                    .filter(Boolean)
                    .join(" ")}>







                    <>
                        <h3>Top Movies of 2026</h3>
                        <MainSlider2 recommendedMoviesOf2026={recommendedMovieObj} error={error} loading={loading}></MainSlider2>
                    </>

                    <MegaSlider nameLoading={nameLoading} paramNameArray={genreNameArray} param={"genre"} paramReccStrengthArray={reccStrengthObj.genreReccStrengthArray} paramBasedRecommendedMoviesObj={genreBasedTopRatedMoviesObj} error={error2} loading={loading2} ></MegaSlider>
                    <MegaSlider nameLoading={nameLoading} paramNameArray={castNameArray} param={"cast"} paramReccStrengthArray={reccStrengthObj.castReccStrengthArray} paramBasedRecommendedMoviesObj={castBasedTopRatedMoviesObj} error={error3} loading={loading3} ></MegaSlider>
                    <MegaSlider nameLoading={nameLoading} paramNameArray={directorNameArray} param={"director"} paramReccStrengthArray={reccStrengthObj.directorReccStrengthArray} paramBasedRecommendedMoviesObj={directorBasedTopRatedMoviesObj} error={error4} loading={loading4} ></MegaSlider>

                </div>



            }




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


function MegaSlider({ param, paramReccStrengthArray, paramBasedRecommendedMoviesObj, error, loading, paramNameArray, nameLoading }) {

    console.log("paramNameArray")
    console.log(paramNameArray)



    function sliderTitle(paramValue) {
        let heading;
        if (param == "genre") {
            heading = `Recommended ${paramValue} movies`
        }

        else if (param == "cast") {

            heading = `Recommended movies with ${paramValue}`
        }

        else {

            heading = `More of ${paramValue}`

        }

        return heading;
    }



    let arrayOfSLiders = []




    for (const obj of paramReccStrengthArray) {

        let text;

        if (!nameLoading) {
            let identifier = paramNameArray.find(item => {



                return item.id == obj[param]
            })

            console.log("identifier")
            console.log(identifier)

            text = sliderTitle(identifier.name);
        }

        else {
            text = "";
        }




        arrayOfSLiders.push(



            <div style={{ marginTop: "50px" }} key={obj[param]}>
                <h3 style={{ textAlign: "center", fontSize: "1.5rem" }} key={text}>{text}</h3>
                <Slider suggestionType={"Recommended"} movieArray={paramBasedRecommendedMoviesObj[obj[param]]} identifierType={param} identifier={obj[param]} error={error} loading={loading}></Slider>
            </div>

        )
    }

    return (
        <div className="SliderContainer">

            {arrayOfSLiders}
        </div>
    );
}





