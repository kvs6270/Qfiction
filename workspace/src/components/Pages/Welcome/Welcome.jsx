import { Navbar } from "../../Cogs/Navbar"

import style from "./Welcome.module.css"
import style2 from "./Dialogue.module.css"


import eyeIcon from "./resource/icons8-eye-50.png"


import { OfferButtons } from "./OfferButtons"
import { Tutorial } from "./Tutorial"
import { fetchMovie } from "../../../logic/fetchMovie"

import HomeImage from "./resource/HomeTutorialImage.png"
import RecommendationImage from "./resource/RecommendationTutorialImage.png"
import WatchedImage from "./resource/WatchedTutorialImage.png"
import ToWatchImage from "./resource/ToWatchTutorialImage.png"
import { useEffect } from "react"

import ReccImgBackdrop from "./resource/Recc.png"
import HomeImgBackdrop from "./resource/Home.png"
import WatchedImgBackdrop from "./resource/Watched.png"
import ToWatchImgBackdrop from "./resource/ToWatch.png"
import { useContext, useState } from "react"
import { SearchMovies } from "../../Cogs/SearchMovies"
import { WatchContext } from "../../../App"
import { RadialMenu } from "./RadialMenu"



export function Welcome() {

    const { moviesWatched, addToWatched, removeFromWatched, firstEntry, entrySetter } = useContext(WatchContext)




    return (
        <div style={{ overflowY: firstEntry ? "hidden" : "auto" }} className={style.pageContainer}>


            {

                firstEntry ? <Add10Please adderFunc={addToWatched} removerFunc={removeFromWatched} watched={moviesWatched} entrySetter={entrySetter} /> : ""

            }


            < Navbar active={!firstEntry} welcome={true} />


            <div style={{ opacity: firstEntry ? "0.5" : "1" }} className={style.welcomePage}>








                <div className={style.dummyContainer}>
                    <div className={style.mainContainer}>
                        <div className={style.wheelContainer}>
                            <div className={style.radialContainer}>
                               
                            </div>
                        </div>
                        <div className={style.introSection}>
                    
                            <div className={style.imageContainer}>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={style.RadialContainer}>

                    {/* <RadialMenu /> */}


                </div>




                <div className={style.TutorialContainer}>


                    <Tutorial navigation={"/Home"} identifier={"Home"} backDropImg={HomeImgBackdrop} image={HomeImage} text={"Visit the Home Page to browse the TopRated flicks of this year, trending Genres, Actors, Directors and much more!"} />



                    <Tutorial navigation={"/Recommendation"} identifier={"Recommendation"} backDropImg={ReccImgBackdrop} image={RecommendationImage} text={"Visit the Recommendation Page to browse the Recommended flicks of this year based on your favoruite Genres, Actors and Directors"} />


                    <Tutorial navigation={"/Watched"} identifier={"Watched"} backDropImg={WatchedImgBackdrop} image={WatchedImage} text={"Find All the stuff you have watched here!"} />


                    <Tutorial navigation={"/ToWatch"} identifier={"ToWatch"} backDropImg={ToWatchImgBackdrop} image={ToWatchImage} text={"Find All the movies saved by you to watch later."} />




                </div>






            </div>






        </div>
    )
}

function adderFunc(movieId) {

    const { movieObj, error, loading } = useMovieDetailsFetcher(movieId);

    if (!loading && !error) {
        addToWatched(movieObj);
    }



}


function useMovieDetailsFetcher(id) {

    const [movieObj, setMovieObj] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);




    useEffect(() => {

        let isMounted = true;

        setError(false);
        setLoading(true);

        async function dataFetching() {

            try {
                const movie = await fetchMovie(id);
                if (isMounted) setMovieObj(movie);
            } catch (error) {
                if (isMounted) setError(true)
                console.log(error)

            } finally {
                if (isMounted) setLoading(false)
            }
        }

        dataFetching();


        return () => {
            isMounted = false
        }
    }, [id])


    return { movieObj, error, loading }
}






function Add10Please({ adderFunc, removerFunc, watched, entrySetter }) {


    const [searchText, setSearchText] = useState("")

    const [selectedId, setSelectedId] = useState("")



    const { movieObj, error, loading } = useMovieDetailsFetcher(selectedId);

    useEffect(() => {
        if (!error && !loading && movieObj) {
            adderFunc(movieObj)
        }
    }, [movieObj, error, loading])



    let arrayOfMovies = [...watched];





    return (
        <div className={style2.Dialog}>

            <h2>Please add atleast 10 movies you have watched to continue</h2>

            <div className={style2.Input}>
                <input type="text"

                    value={searchText}

                    onChange={(e) => setSearchText(e.target.value)}

                    placeholder="Search..."
                />

            </div>

            <div className={style2.SearchScreen}>

                <SearchMovies searchString={searchText} clickFunc={(movieId) => {
                    setSelectedId(movieId)
                }} />

            </div>

            <div className={style2.SummaryGrid}>

                <SummaryGrid movieArray={arrayOfMovies} removerFunc={removerFunc} clearSelectedId={() => {
                    setSelectedId("")
                }} />

            </div>

            <div className={style2.ButtonFooter}>

                <button
                    className={style2.SkipButton}
                    onClick={() => entrySetter(false)}
                >
                    Skip
                </button>

                <button className={style2.DoneButton}

                    onClick={() => entrySetter(false)}

                    disabled={watched.length < 10}

                >

                    Done

                </button>


            </div>

        </div>
    )
}


function SummaryGrid({ movieArray, removerFunc, clearSelectedId }) {



    let collectionOfTiles = movieArray.map(item => (

        <div className={style2.SummaryTile}>
            {item.title}

            <button onClick={() => {
                removerFunc(item)
                clearSelectedId();
            }}>x</button>

        </div>

    ))


    return (
        <>
            {collectionOfTiles}
        </>
    )
}
