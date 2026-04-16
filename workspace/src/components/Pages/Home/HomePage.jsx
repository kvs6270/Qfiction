import { Slider } from "../../Cogs/slider";
import { topRated } from "../../../logic/TopRated";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Navbar } from "../../Cogs/Navbar";
import { Loading } from "../../Cogs/Loading";
import style from "./HomePage.module.css"

import style2 from "./MainSlider2.module.css"







export function HomePage() {

    // const {topRatedMovieObj, error, loading} = useSingleFetch(/* Insert URL */);
    // const {genreBasedTopRatedMoviesObj, error: error2, loading: loading2} = useMultiFetch(/* genres array*/);

    const { movieObj, error, loading, genreBasedMovies, error2, loading2, castBasedMovies, error3, loading3, directorBasedMovies, error4, loading4 } = useOutletContext();



    const topRatedMovieObj = useMemo(() => {
        if(movieObj.length === 0) return []
        return topRated(movieObj, 100);
    }, [movieObj])





    const genreBasedTopRatedMoviesObj = useMemo(() => {

        if(Object.keys(genreBasedMovies).length === 0) return {}

        const genreBasedTopRatedMoviesObjProto = {};

        for (const genre in genreBasedMovies) {

            genreBasedTopRatedMoviesObjProto[genre] = topRated(genreBasedMovies[genre], 100);
        }


        return genreBasedTopRatedMoviesObjProto;
    }, [genreBasedMovies])




    const castBasedTopRatedMoviesObj = useMemo(() => {
         if(Object.keys(castBasedMovies).length === 0) return {}

        const castBasedTopRatedMoviesObjProto = {};

        for (const cast in castBasedMovies) {

            castBasedTopRatedMoviesObjProto[cast] = topRated(castBasedMovies[cast], 100);
        }

        return castBasedTopRatedMoviesObjProto;
    }, [castBasedMovies])


    const directorBasedTopRatedMoviesObj = useMemo(() => {
         if(Object.keys(directorBasedMovies).length === 0) return {}

        const directorBasedTopRatedMoviesObjProto = {};

        for (const director in directorBasedMovies) {

            directorBasedTopRatedMoviesObjProto[director] = topRated(directorBasedMovies[director], 100);
        }

        return directorBasedTopRatedMoviesObjProto;
    }, [directorBasedMovies])


    return (

        <div>
            <Navbar></Navbar>



            <div className={style.HomePage}>


                < >
                    <h3>Top Movies of 2026</h3>
                    <MainSlider2 topRatedMoviesOf2026={topRatedMovieObj} error={error} loading={loading}></MainSlider2>
                </>

                <MegaSlider mainParam="Genre" paramBasedTopRatedMoviesObj={genreBasedTopRatedMoviesObj} error={error2} loading={loading2} ></MegaSlider>
                <MegaSlider mainParam="Cast" paramBasedTopRatedMoviesObj={castBasedTopRatedMoviesObj} error={error3} loading={loading3} ></MegaSlider>


                <MegaSlider mainParam="Director" paramBasedTopRatedMoviesObj={directorBasedTopRatedMoviesObj} error={error4} loading={loading4} ></MegaSlider>
                <Loading></Loading>

            </div>
        </div>



    )

}




function useInterval(callback, delay, reset) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay, reset]);


}

function SliderTile({ movieObj }) {

    let navigate = useNavigate();

    let bgImg = movieObj.backdrop;

    console.log("BackGround Image of main Slider:\t" + bgImg)


    return (
        <div style={{ backgroundImage: `URL(${bgImg})` }} className={style2.Tile} onClick={() => {
            navigate(`/Movie/${movieObj.id}`)
        }}>
            <h1>{movieObj.title}</h1>
        </div>
    )
}



function MainSlider2({ topRatedMoviesOf2026, error, loading }) {
    let iteratorArray = [...topRatedMoviesOf2026];

    let slider = [];


    let [counter, setCounter] = useState(0)

    let [delay, setDelay] = useState(4000)

    let [resetTick, setResetTick] = useState(0)


    for (const movieObj of iteratorArray) {
        console.log(movieObj)
        slider.push(<SliderTile movieObj={movieObj} key={movieObj.title} />);
    }




    function MoveFurther() {
        setCounter(c => (c + 1) % slider.length)
        setResetTick(resetTick + 1)

    }

    function MoveBack() {
        setCounter(c => (c - 1) % slider.length)
        setResetTick(resetTick - 1)
    }

    useInterval(MoveFurther, delay, resetTick)

    if (error) {
        return (

            <Error></Error>

        )
    }

    else if (loading) {
        return (
            <div className={style2.SliderContainer}>
                <button className={style2.Button} disabled>&lt;</button>

                <div className={style2.TileContainer}>
                    <Loading />
                </div>

                <button className={style2.Button} disabled>&gt;</button>
            </div>
        )
    }

    else {

        return <div className={style2.SliderContainer}>
            <button className={style2.Button} onClick={MoveBack} > &lt; </button>

            <div style={{ transform: `translateX(-${counter * 100}%)` }} className={style2.TileContainer}>
                {slider}
            </div>

            <button className={style2.Button} onClick={MoveFurther} > &gt; </button>
        </div>

    }
}






function MegaSlider({ mainParam, paramBasedTopRatedMoviesObj, error, loading }) {



    function sliderTitle(paramValue) {


        let heading;
        if (mainParam == "Genre") {
            heading = `Top Rated ${paramValue} movies`
        }

        else if (mainParam == "Cast") {

            heading = `Top Rated movies with ${paramValue}`
        }

        else {

            heading = `More of ${paramValue}`

        }

        return heading;
    }





    //Here, since paramBasedTopRa... is empty, no slider is getting created, hence no loading skeleton.

    let arrayOfSLiders = [];
    

    if(/* loading && */ Object.keys(paramBasedTopRatedMoviesObj).length === 0) {

        

        
        for (let i = 0; i < 5; i++) {
        arrayOfSLiders.push(
            <React.Fragment key={`Loader-${i+1}`}>
                <h3 style={{textAlign: "center", fontSize: "1.5rem"}}>Loading...</h3>
                <Slider
                    identifierType={mainParam}
                    suggestionType="TopRated"
                    movieArray={[]}
                    loading={true}
                    error={false}
                />
            </React.Fragment>
        );
    }

    }

    else{

        console.log("I shouldn't be here")
        for (const param in paramBasedTopRatedMoviesObj) {
           


     
            let text = sliderTitle(param);
        arrayOfSLiders.push(
            <div style={{marginTop: "60px"}} key={param}>
                <h3 style={{textAlign: "center", fontSize: "1.5rem"}}>{text}</h3>
                <Slider identifierType={mainParam} suggestionType={"TopRated"} movieArray={paramBasedTopRatedMoviesObj[param]} identifier={param} error={error} loading={loading}></Slider>
            </div>

        )
        
    }
    }



    

    return (
        <div className={style.SliderContainer}>
            {arrayOfSLiders}
        </div>
    );
}






