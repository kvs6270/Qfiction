import { Slider } from "../../Cogs/slider";
import { topRated } from "../../../logic/TopRated";
import { useState, useEffect, useRef, useMemo } from "react";
import { useOutletContext } from "react-router";
import { Navbar } from "../../Cogs/Navbar";
import { Loading } from "../../Cogs/Loading";
import style from "./HomePage.module.css"

import style2 from "./MainSlider2.module.css"







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



            <>
                <h3>Top Movies of 2026</h3>
                <MainSlider2 topRatedMoviesOf2026={topRatedMovieObj} error={error} loading={loading}></MainSlider2>
            </>

            <MegaSlider mainParam="genre" paramBasedTopRatedMoviesObj={genreBasedTopRatedMoviesObj} error={error2} loading={loading2} ></MegaSlider>
            <MegaSlider mainParam="cast" paramBasedTopRatedMoviesObj={castBasedTopRatedMoviesObj} error={error3} loading={loading3} ></MegaSlider>
            <MegaSlider mainParam="director" paramBasedTopRatedMoviesObj={directorBasedTopRatedMoviesObj} error={error4} loading={loading4} ></MegaSlider>
            <Loading></Loading>
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
    return (
        <div className={style2.Tile}>
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
        if (mainParam == "genre") {
            heading = `Top Rated ${paramValue} movies`
        }

        else if (mainParam == "cast") {

            heading = `Top Rated movies with ${paramValue}`
        }

        else {

            heading = `More of ${paramValue}`

        }

        return heading;
    }



    if (error) {

        return (

            <Error></Error>


        )
    }
    else if (loading) {

        return (
            <div className={style.SliderContainer}>
                <Loading></Loading>
            </div>

        )
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
            <div className={style.SliderContainer}>
                {arrayOfSLiders}
            </div>
        );
    }

}

function Error() {


}


