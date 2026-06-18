
import style from "./Tutorial.module.css"
import { Navigate, useNavigate } from "react-router-dom"
import { useRef, useEffect, useContext, useState } from "react"



export function Tutorial({ backDropImg, image, text, identifier, navigation }) {


    const [hovered, setHovered] = useState(false);
    const [animationEnd, setAnimationEnd] = useState(false);

    let navigate = useNavigate();


    const refImage = useRef();
    const refCurvature = useRef();
    const refText = useRef();
    const refCurvatureContainer = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                refImage.current.classList.add(style.show);
            }
        }, { threshold: 0.2 });

        if (refImage.current) observer.observe(refImage.current);

        return () => observer.disconnect();
    }, []);


    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                refCurvature.current.classList.add(style.show);
            }
        }, { threshold: 0.3 });

        if (refCurvature.current) observer.observe(refCurvature.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                refText.current.classList.add(style.show);

            }
        }, { threshold: 0.3 });

        if (refText.current) observer.observe(refText.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const bbox = refCurvature.current.getBBox();

        refCurvatureContainer.current.setAttribute(
            "viewBox",
            `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`
        );
    }, []);






    return (


        <div style={{ backgroundImage: `URL(${backDropImg})` }} className={style.TutorialBackDrop}>

            <div onMouseEnter={() => { setHovered(true) }} onMouseLeave={() => { setHovered(false) }} className={`${style.Tutorial} ${(hovered && animationEnd)? style.Hovered : ""}`}>

                <div className={style.defaultContent}>
                    <div style={{ backgroundImage: `URL(${image})` }} ref={refImage} className={style.TutorialImage}>
                    </div>
                    <div className={style.TutorialCurvatureContainer}>
                        <svg ref={refCurvatureContainer}>
                            <path
                                d="M144.84304809570312,83.40807342529297C165.4708506266276,111.06128565470378,182.36172993977863,221.97308731079102,268.60986328125,249.3273468017578C354.8579966227214,276.6816062927246,596.7115173339844,247.83258310953775,662.3318481445312,247.53363037109375"
                                ref={refCurvature}
                                className={style.TutorialCurvature}
                            />
                        </svg>
                    </div>
                    <div ref={refText} className={style.TutorialText}>
                        <p className={style.typingText} onAnimationEnd={() => {
                            setAnimationEnd(true)
                        }}>
                            {text}
                        </p>
                    </div>
                </div>



                <div className={style.HoveredContainer}>
                    <div onClick={() => {navigate(navigation)}} className={style.Navigator}>
                        Go to {identifier} Page
                    </div>
                </div>





            </div>
        </div>
    );


}