import React from "react";

import styles from "../styles/main-style.module.css";


function Legend(props){
    const {width, height, onOverFunction, onClick} = props;
    
    const defaultChecked = false;
    const legendItems = ([
        { name: "Ozone", color: "red", checked: defaultChecked, onChange: (e => {}) },
        { name: "Nitrogen Dioxide", color: "blue", checked: defaultChecked, onChange: (e => {}) },
        { name: "Fine Particles", color: "black", checked: defaultChecked, onChange: (e => {}) }
    ]);

    return <g>
        <h4>Pollutant Types</h4>
        <foreignObject width={width} height={height} xmlns="http://www.w3.org/1999/xhtml">
            <ul className={styles.legendStyle}>
                {legendItems.map((item, index) => 
                { 
                return <div key={item.name}>
                <li onMouseOver={() => onOverFunction(index)}>
                    <input type="checkbox" 
                    value={item.checked} 
                    onClick={() => onClick(index)} 
                    className="checkbox"
                    defaultChecked="true"
                    id={item.name}
                    />
                    
                    {/* colored square */}
                    <span 
                    style={{ color: item.color, marginRight: '5px' }}>
                    &#9632;
                    </span>
                    {item.name}
                    </li>
                </div>
                })
                }
            </ul>
        </foreignObject>
    </g>

}

export { Legend }