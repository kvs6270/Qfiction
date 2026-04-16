import { Navbar } from "../../Cogs/Navbar"

import style from "./Welcome.module.css"


import eyeIcon from "./resource/icons8-eye-50.png"


import { OfferButtons } from "./OfferButtons"
import { Tutorial } from "./Tutorial"


import HomeImage from "./resource/HomeTutorialImage.png"
import RecommendationImage from "./resource/RecommendationTutorialImage.png"
import WatchedImage from "./resource/WatchedTutorialImage.png"
import ToWatchImage from "./resource/ToWatchTutorialImage.png"


import ReccImgBackdrop from "./resource/Recc.png"
import HomeImgBackdrop from "./resource/Home.png"
import WatchedImgBackdrop from "./resource/Watched.png"
import ToWatchImgBackdrop from "./resource/ToWatch.png"



export function Welcome() {
    return (
        <div>
            <Navbar />
            <div className={style.welcomePage}>
                <div className={style.introSection}>
                    <div className={style.introText}>
                        <p>Create your own Library</p>
                        <p>Browse through Top Rated flicks</p>
                        <p>Indulge in comprehensive Recommendations</p>
                    </div>
                </div>
                <div className={style.whatWeOffer}>

                    <div className={style.OfferTitle}>
                        <h2>What we Offer at Qflicks:</h2>
                    </div>


                    <div className={style.buttonContainer}>

                        <OfferButtons iconPath={eyeIcon} text={"Browse through the Top Rated stuff"} clickDestination={"/"} />
                        <OfferButtons iconPath={eyeIcon} text={"Add movies to your Watched List"} clickDestination={"/"} />
                        <OfferButtons iconPath={eyeIcon} text={"Get recommendations based on your preffered Genre"} clickDestination={"/"} />
                        <OfferButtons iconPath={eyeIcon} text={"Get recommendations based on your Cast and Directors"} clickDestination={"/"} />
                        <OfferButtons iconPath={eyeIcon} text={"Create your own Watch-List"} clickDestination={"/"} />
                        <OfferButtons iconPath={eyeIcon} text={"Get to-the-point recommendations based on your interests"} clickDestination={"/"} />


                        

                    </div>

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