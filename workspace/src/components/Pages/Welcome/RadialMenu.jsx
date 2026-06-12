import { useState } from "react";
import style from "./RadialMenu.module.css";

const TILE_PATH = `
  M 100 0
  A 100 100 0 0 1 30.9 95.1
  L 18.5 57.1
  A 60 60 0 0 0 60 0
  Z
`;

export function RadialMenu() {

    const [currentText, setCurrentText] = useState("Loop")

    const items = ["ToWatch", "Search", "Home", "Recommended", `Watched`];
    const despcriptors = ["Create your own Watch-List", "Search through millions of pieces", "Browse through the Top Rated stuff", "Get on-point recommendations based on your interests", "Add movies to your Watched List"]


    const angle = 360 / items.length;

    return (
        <div className={style.container}>
            {/* <div key={currentText} className={style.textPopup}>
                <h1 >{currentText}</h1>

            </div> */}
            <div className={style.RadialMenu}>
                <svg viewBox="-150 -150 300 300" width="500" height="500">
                    {items.map((label, i) => {
                        const rotation = i * angle;
                        const midAngle = angle / 2;
                        // label position
                        const r = 80;
                        const x = r * Math.cos((midAngle * Math.PI) / 180);
                        const y = r * Math.sin((midAngle * Math.PI) / 180);
                        return (
                            <g key={i} transform={`rotate(${rotation})`}>
                                <path
                                    d={TILE_PATH}
                                    className={style.tile}
                                    onClick={() => console.log(label)}
                                    onMouseEnter={() => setCurrentText(despcriptors[i])}
                                />
                                <text
                                    x={x}
                                    y={y}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    transform={`rotate(${-rotation}, ${x}, ${y})`}
                                    className={style.label}

                                >
                                    {label}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}