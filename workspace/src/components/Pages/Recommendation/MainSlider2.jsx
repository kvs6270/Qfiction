import style from "./MainSlider2.module.css"
import { Loading } from "../../Cogs/Loading";
import { useState, useEffect, useRef } from 'react';
 
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

function SliderTile({movieObj}) {
  return (
    <div className={style.Tile}>
      <h1>{movieObj.title}</h1>
    </div>
  )
}



export function MainSlider2({recommendedMoviesOf2026, error, loading}) {
    let iteratorArray = [...recommendedMoviesOf2026];

    let slider = [];


    let [counter, setCounter] = useState(0)

    let [delay, setDelay] = useState(4000)

    let [resetTick, setResetTick] = useState(0)

   
    for (const movieObj of iteratorArray) {
      slider.push(<SliderTile movieObj={movieObj} key={movieObj.title}/>);
    }


    

    function MoveFurther() {
        setCounter(c=> (c+1)%slider.length)
        setResetTick(resetTick+1)

    }

    function MoveBack() {
        setCounter(c=> (c-1)%slider.length)
        setResetTick(resetTick-1)
    }

    useInterval(MoveFurther, delay, resetTick)

    if(error) {
        return <Error></Error>
    }

    else if(loading) {
        return (
                    <div className={style.SliderContainer}>
                        <button className={style.Button} disabled>&lt;</button>
        
                        <div className={style.TileContainer}>
                            <Loading />
                        </div>
        
                        <button className={style.Button} disabled>&gt;</button>
                    </div>
                )
    }

    else {

        return <div  className={style.SliderContainer}>
                  <button className={style.Button} onClick={MoveBack} > &lt; </button>

                  <div style={{transform: `translateX(-${counter*100}%)`}} className={style.TileContainer}>
                    {slider}
                  </div>

                  <button className={style.Button} onClick={MoveFurther} > &gt; </button>
                </div>

    }
}