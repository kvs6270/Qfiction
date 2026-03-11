
import style from "./MainSlider2.module.css"

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



export function MainSlider2({topRatedMoviesOf2026, error, loading}) {
    let iteratorArray = [...topRatedMoviesOf2026];


    let [counter, setCounter] = useState(0)

    let [delay, setDelay] = useState(4000)

    let [resetTick, setResetTick] = useState(0)

    const header = iteratorArray[counter];


    

    function MoveFurther() {
        setCounter(counter+1)
        setResetTick(resetTick+1)

    }

    function MoveBack() {
        setCounter(counter-1)
        setResetTick(resetTick-1)
    }

    useInterval(MoveFurther, delay, resetTick)

    if(error) {
        return <Error></Error>
    }

    else if(loading) {
        return <Loading></Loading>
    }

    else {

        return <div className={style.TileContainer}>
            <h1>{header.title}</h1>
            <button onClick={MoveFurther}> Next Movie</button>
            <button onClick={MoveBack}> Prev Movie</button>
        </div>

    }
}