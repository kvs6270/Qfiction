import { WatchContext } from "../../App";
import style from "../CogCSS/MoviePage.module.css"
import { useState } from "react";
import { useContext } from "react";
import { Loading } from "./Loading";

export function MoviePage({ movieObj, loading }) {

    if (loading) {
        return (

            <div className={style.pageContainer}>


                <Backdrop>
                    <Loading />
                </Backdrop >


                <div className={style.details}>

                    <div className={style.poster}>

                        <Loading />

                    </div>


                    <div className={style.data}>

                        <div className={style.title}>

                            <Loading />


                        </div>


                        <div className={style.overview}>

                            <Loading />

                        </div>
                    </div>


                    <InfoSection loading={true}>
                        <Loading />
                    </InfoSection>

                </div>



                <CastSlider loading={true} />





            </div>

        )
    }



    else {
        const title = movieObj.title;
        const cast = movieObj.castArray;
        const director = movieObj.director;
        const genres = movieObj.showkeyGenre;
        const country = movieObj.country;
        const lang = movieObj.lang;
        const overview = movieObj.overview;
        const runtime = movieObj.runtime;

        const year = movieObj.year;
        const poster = movieObj.poster;
        const backdrop = movieObj.backdrop;
        const releaseDate = movieObj.releaseDate;
        const budget = movieObj.budget;
        const studio = movieObj.studio;

        const imdbRating = movieObj.imdbRating;
        const voteCount = movieObj.votes;
        const popularity = movieObj.popularity;



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


                <Backdrop bgImg={backdrop} toWatch={toWatch} watched={watched} watchAdder={setMovieToWatch} watchRemover={removeMovieFromWatch} watchedAdder={setMovieAsWatched} watchedRemover={removeMovieFromWatched} />


                <div className={style.details}>

                    <div style={{ backgroundImage: `URL(${poster})` }} className={style.poster}>

                        <div className={style.Vote}>
                           <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">  </style> <g> <path class="st0" d="M195.928,376.064H148.67l-43.168,82.738H512l-43.168-82.738h-42.957l9.478,28.779h-28.799L364.51,185.406 c0,0-5.038,1.349-12.576,3.281l-0.52-2.614c-0.928-4.518-2.642-8.621-4.68-12.527c-2.051-3.9-4.441-7.581-6.914-11.01l-0.716-0.991 l-0.899-0.78c-5.677-5.017-15.949-13.237-33.402-24.598l0.042,0.028c-18.274-11.945-38.938-18.345-56.946-18.774 c-38.826-0.801-81.727-1.68-93.2-1.911l-10.856-6.984l6.415-9.465L83.967,53.197L0,178.176l65.525,45.852l8.796-12.971 l22.414,15.141l32.298,48.009c4.771,7.082,11.27,12.871,18.908,16.757l0.077,0.042c0.014,0,5.754,2.867,13.82,6.942 c8.052,4.075,18.416,9.359,27.556,14.158l0.014,0.007c7.364,3.85,15.725,7.194,24.563,10.146l0.112,0.035l5.621,1.743 l15.569,80.806h-29.769L195.928,376.064z M220.757,301.771c-8.031-2.684-15.408-5.67-21.345-8.782h0.014 c-18.422-9.66-41.285-21.05-41.742-21.282c-4.286-2.185-8.044-5.522-10.742-9.542l-34.638-51.501l-25.87-17.474l45.29-66.789 l16.441,10.568l3.049,0.056c0.028,0.007,12.745,0.267,31.14,0.64c18.401,0.379,42.465,0.871,65.103,1.342 c13.089,0.204,30.795,5.466,45.528,15.218l0.45,0.295l-0.407-0.267c15.696,10.23,24.9,17.509,29.93,21.865 c0.619,0.871,1.209,1.742,1.771,2.614l-29.776,2.494l-36.605,13.251l-1.398,1.124c-11.755,9.436-18.682,23.6-18.921,38.636v0.681 c-0.006,14.846,6.506,28.94,17.825,38.552l2.382,2.016l0.295,0.042c0.886,0.717,2.122,1.728,3.921,3.239 c4.026,3.379,10.651,9.028,21.443,18.401c1.982,1.721,3.106,3.274,3.738,4.56c0.639,1.293,0.836,2.326,0.844,3.337 c0.014,2.108-1.082,4.722-3.865,7.103c-2.74,2.333-6.913,4.054-11.719,4.047c-1.939,0-3.977-0.267-6.113-0.885l-0.498-0.14 l0.541,0.154c-8.347-2.445-17.143-4.798-25.743-7.285L220.757,301.771z"></path> </g> </g></svg>

                           {popularity}
                        </div>

                        <div className={style.Popularity}>
                            <svg viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="trendingUpIconTitle" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title id="trendingUpIconTitle">Trending Up</title> <polyline points="3 17 9 11 13 15 20.405 7.595"></polyline> <path stroke-linecap="round" d="M20.4054613,7.59453873 L21,7"></path> <polyline points="21 10 21 7 18 7"></polyline> </g></svg>
                            {voteCount}
                        </div>

                        <div className={style.Rating}>
                            <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 72 72" enable-background="new 0 0 72 72" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M65.81,68h-60c-1.104,0-2-0.896-2-2s0.896-2,2-2h60c1.104,0,2,0.896,2,2S66.914,68,65.81,68z"></path> </g> <g> <path d="M23.19,53.068c0,3.828-3.104,6.932-6.932,6.932h-5.137c-3.828,0-6.932-3.104-6.932-6.932V32.932 C4.19,29.104,7.294,26,11.122,26h5.137c3.828,0,6.932,3.104,6.932,6.932V53.068z M19.19,32.932c0-1.619-1.313-2.932-2.932-2.932 h-5.137c-1.619,0-2.932,1.313-2.932,2.932v20.137C8.19,54.688,9.503,56,11.122,56h5.137c1.619,0,2.932-1.313,2.932-2.932V32.932z"></path> </g> <g> <path d="M46.19,53.068c0,3.828-3.104,6.932-6.932,6.932h-5.137c-3.828,0-6.932-3.104-6.932-6.932V21.932 c0-3.828,3.104-6.932,6.932-6.932h5.137c3.828,0,6.932,3.104,6.932,6.932V53.068z M42.19,21.932c0-1.619-1.313-2.932-2.932-2.932 h-5.137c-1.619,0-2.932,1.313-2.932,2.932v31.137c0,1.619,1.313,2.932,2.932,2.932h5.137c1.619,0,2.932-1.313,2.932-2.932V21.932z "></path> </g> <g> <g> <g> <path d="M56,19c-0.553,0-0.81-0.447-0.81-1v-6.038C55.19,10,56.801,10,57.456,10h2.354c0.552,0,1,0.447,1,1s-0.448,1-1,1h-2.354 c-0.336,0-0.531,0.016-0.644,0.035L56.905,18C56.905,18.553,56.552,19,56,19z"></path> </g> <g> <path d="M55.81,21.18c-0.261,0-0.521-0.11-0.71-0.29c-0.181-0.189-0.29-0.45-0.29-0.71s0.109-0.52,0.29-0.71 c0.38-0.38,1.05-0.37,1.42,0c0.18,0.19,0.29,0.44,0.29,0.71c0,0.26-0.11,0.521-0.29,0.71 C56.329,21.069,56.069,21.18,55.81,21.18z"></path> </g> </g> <g> <path d="M68.19,53.068c0,3.828-3.104,6.932-6.932,6.932h-5.137c-3.828,0-6.932-3.104-6.932-6.932V10.932 C49.19,7.104,52.294,4,56.122,4h5.137c3.828,0,6.932,3.104,6.932,6.932V53.068z M64.19,10.932C64.19,9.313,62.878,8,61.259,8 h-5.137c-1.619,0-2.932,1.313-2.932,2.932v42.137c0,1.619,1.313,2.932,2.932,2.932h5.137c1.619,0,2.932-1.313,2.932-2.932V10.932 z"></path> </g> </g> </g> </g></svg>
                            {imdbRating}

                        </div>

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


                    <InfoSection releaseDate={releaseDate} studio={studio} director={director} budget={budget} country={country} lang={lang} loading={false} />

                </div>

                <CastSlider castArray={cast} loading={false} />


            </div>
        )
    }
}

function Backdrop({ bgImg, watchAdder, watchRemover, watchedAdder, watchedRemover, toWatch, watched, children }) {



    if (children) {
        return (
            <div className={style.backdrop}>
                {children}
            </div>
        )
    }

    else {
        const [hovered, setHovered] = useState(false)






        return (

            <div onMouseEnter={() => { setHovered(true) }} onMouseLeave={() => { setHovered(false) }} style={{ "--bg-img": `url(${bgImg})` }} className={` ${style.backdrop} ${hovered ? style.hovered : ""}`}>


                {toWatch ? (<button className={style.RemoveFromWatchButton} onClick={watchRemover}>Remove from Watch</button>) : (<button className={style.addToWatchButton} onClick={watchAdder}>Add to Watch</button>)}


                {watched ? (<button className={style.RemoveFromWatchedButton} onClick={watchedRemover}>Remove from Watched</button>) : (<button className={style.addToWatchedButton} onClick={watchedAdder}>Mark as Watched</button>)}




            </div>
        )
    }

}


function InfoSection({ releaseDate, director, studio, budget, country, lang, loading }) {

    if (loading) {
        return (
            <div className={style.infoSection}>
                <Tile>
                    <Loading />
                </Tile>
                <Tile>
                    <Loading />
                </Tile>
                <Tile>
                    <Loading />
                </Tile>
                <Tile>
                    <Loading />
                </Tile>
                <Tile>
                    <Loading />
                </Tile>


            </div>

        )
    }


    else {
        return (
            <div className={style.infoSection}>

                {releaseDate && <Tile paramName={"Release Date"} paramValue={releaseDate} />}
                {director && <Tile paramName={"Director"} paramValue={director} />}
                {studio && <Tile paramName={"Studio"} paramValue={studio.join(", ")} />}
                {budget && <Tile paramName={"Budget"} paramValue={`$${budget}`} />}
                {country && <Tile paramName={"Country"} paramValue={country} />}
                {lang && <Tile paramName={"Lang"} paramValue={lang} />}

            </div>
        )
    }

}


function Tile({ paramName, paramValue, children }) {


    if (children) {

        return (
            <div className={style.tile}>
                {children}
            </div>
        )

    }

    return (
        <div className={style.tile}>
            {paramName}: {paramValue}
        </div>
    )
}


function CastSlider({ castArray, loading }) {

    if (loading) {

        return (
            <div className={style.castSlider}>
                <CastTile>
                    <Loading />
                </CastTile>
                <CastTile>
                    <Loading />
                </CastTile>
                <CastTile>
                    <Loading />
                </CastTile>
                <CastTile>
                    <Loading />
                </CastTile>
                <CastTile>
                    <Loading />
                </CastTile>
                <CastTile>
                    <Loading />
                </CastTile>
                <CastTile>
                    <Loading />
                </CastTile>
                <CastTile>
                    <Loading />
                </CastTile>
                <CastTile>
                    <Loading />
                </CastTile>
                <CastTile>
                    <Loading />
                </CastTile>
                <CastTile>
                    <Loading />
                </CastTile>
                <CastTile>
                    <Loading />
                </CastTile>
                <CastTile>
                    <Loading />
                </CastTile>
            </div>
        )

    }

    else {
        const tileArray = castArray.map(obj => <CastTile castObj={obj} key={obj.name} />)

        return (
            <div className={style.castSlider}>
                {tileArray}
            </div>
        )
    }

}

function CastTile({ castObj, children }) {


    if (children) {
        return (
            <div className={style.castTile}>



                <div className={style.image}>
                    {children}

                </div>

                <div className={style.name}>
                    {children}

                </div>

                <div className={style.charName}>
                    {children}
                </div>
            </div>

        )

    }


    else {

        return (
            <div className={style.castTile}>



                <div style={{ backgroundImage: `URL(${castObj.profile})` }} className={style.image}>


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
}