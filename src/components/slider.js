import React from "react";

import styles from "../styles/main-style.module.css";


function Slider(props){
    const {width, height, selectedYear, changeHandler} = props;

    return <g>
        <foreignObject width={width} height={height} xmlns="http://www.w3.org/1999/xhtml">

            <div className={styles.sliderBarStyle}>
                <input key="slider" 
                id="sliderBar"
                type='range' min='2009' max='2022' value={selectedYear} step='1' onChange={changeHandler}/>
            </div>

            <div className={styles.sliderTextStyle}>
                {selectedYear}
            </div>
            
        </foreignObject>
    </g>;

}

export { Slider }