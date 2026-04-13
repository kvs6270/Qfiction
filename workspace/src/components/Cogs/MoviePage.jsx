import { WatchContext } from "../../App";
import style from "../CogCSS/MoviePage.module.css"
import { useState } from "react";
import { useContext } from "react";

export function MoviePage({ movieObj }) {

    const title = movieObj.title;
    const cast = movieObj.castArray;
    const director = movieObj.director;
    const genres = movieObj.showkeyGenre;
    const country = movieObj.country;
    const lang = movieObj.lang;
    const overview = movieObj.overview;
    const runtime = movieObj.runtime;
    const voteAvg = movieObj.voteAvg;
    const voteCount = movieObj.voteCount;
    const year = movieObj.year;
    const poster = movieObj.poster;
    const backdrop = movieObj.backdrop;
    const releaseDate = movieObj.releaseDate;
    const budget = movieObj.budget;
    const studio = movieObj.studio;



    const { moviesToWatch, moviesWatched, addToWatch, addToWatched, removeFromWatch, removeFromWatched } = useContext(WatchContext)

    // const [toWatch , setToWatch] = useState(moviesToWatch.some(movie => movie.id == movieObj.id))
    // const [watched , setWatched] = useState(moviesWatched.some(movie => movie.id == movieObj.id))

    let toWatch = moviesToWatch.some(movie => movie.id === movieObj.id)
    let watched = moviesWatched.some(movie => movie.id === movieObj.id)


    function setMovieAsWatched() {
        addToWatched(movieObj)
        removeFromWatch(movieObj)
        toWatch = false;
        watched = true;
    }

    function removeMovieFromWatched() {
        removeFromWatched(movieObj)
        watched = false;
    }

    function setMovieToWatch() {
        addToWatch(movieObj)
        removeFromWatched(movieObj)
        watched = false;
        toWatch = true;
    }

    function removeMovieFromWatch() {
        removeFromWatch(movieObj)
        toWatch = false;
    }

    return (

        <div className={style.pageContainer}>


            <Backdrop bgImg={backdrop} toWatch={toWatch} watched={watched} watchAdder={setMovieToWatch} watchRemover={removeMovieFromWatch} watchedAdder={setMovieAsWatched} watchedRemover={removeMovieFromWatched}/>


            <div className={style.details}>

                <div style={{ backgroundImage: `URL(${poster})` }} className={style.poster}>

                </div>
                <div className={style.data}>
                    <div className={style.title}>

                        <div style={{ fontSize: "3rem", color: "white" }}>
                            <span>
                                {title}

                            </span>
                        </div>



                        <div style={{ fontSize: "1rem", paddingLeft: "5px", color: "grey" }}>


                            <span>
                                {year}
                            </span>


                            &nbsp;&middot;&nbsp;

                            <span>
                                {genres}
                            </span>
                        </div>


                    </div>


                    <div className={style.overview}>

                        {overview}

                    </div>
                </div>


                <InfoSection releaseDate={releaseDate} studio={studio} director={director} budget={budget} country={country} lang={lang} />

            </div>

            <CastSlider castArray={cast}/>

            <div className={style.crew}>

            </div>





        </div>
    )
}

function Backdrop({ bgImg, watchAdder, watchRemover, watchedAdder, watchedRemover, toWatch, watched }) {

    const [hovered, setHovered] = useState(false)






    return (

        <div onMouseEnter={() => { setHovered(true) }} onMouseLeave={() => { setHovered(false) }} style={{ "--bg-img": `url(${bgImg})` }} className={` ${style.backdrop} ${hovered ? style.hovered : ""}`}>


            {toWatch ? (<button className={style.RemoveFromWatchButton} onClick={watchRemover}>Remove from Watch</button>) : (<button className={style.addToWatchButton} onClick={watchAdder}>Add to Watch</button>)}


            {watched ? (<button className={style.RemoveFromWatchedButton} onClick={watchedRemover}>Remove from Watched</button>) : (<button className={style.addToWatchedButton} onClick={watchedAdder}>Mark as Watched</button>)}




        </div>
    )

}


function InfoSection({releaseDate, director, studio, budget, country, lang}) {

     

    return (
        <div className={style.infoSection}>

            {releaseDate && <Tile paramName={"Release Date"} paramValue={releaseDate}/>}
            {director && <Tile paramName={"Director"} paramValue={director}/>} 
            {studio && <Tile paramName={"Studio"} paramValue={studio.join(", ")}/>}
            {budget && <Tile paramName={"Budget"} paramValue={`$${budget}`}/>}
            {country && <Tile paramName={"Country"} paramValue={country}/>}
            {lang && <Tile paramName={"Lang"} paramValue={lang}/>}

        </div>
    )

}


function Tile({paramName, paramValue}) {
    return (
        <div className={style.tile}>
            {paramName}: {paramValue}
        </div>
    )
}


function CastSlider({castArray}) {

    const tileArray = castArray.map(obj => <CastTile castObj={obj} key={obj.name}/>)

    return (
        <div className={style.castSlider}>
            {tileArray}
        </div>
    )

}

function CastTile({castObj}) {

    console.log(castObj.profile)
    return (
        <div className={style.castTile}>

            

            <div style={{backgroundImage: `URL(${castObj.profile})`}} className={style.image}>


            </div>

            <div className={style.name}>
                {castObj.name}

            </div>

            <div className={style.charName}>
                {castObj.character}
            </div>
        </div>
    )
}