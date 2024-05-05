import React from "react";
import styles from "../styles/main-style.module.css";

import { pollutantToColor } from "./utils";


function Legend(props){
    const {width, height, data, onClick} = props;

    const pollutantTypes = ['Ozone', 'Nitrogen Dioxide', 'Fine Particles'];

    
    const defaultChecked = true;
    const [legendItems, setLegendItems] = React.useState([
        { name: "Ozone", color: "red", checked: defaultChecked, onChange: (e => {}) },
        { name: "Nitrogen Dioxide", color: "blue", checked: defaultChecked, onChange: (e => {}) },
        { name: "Fine Particles", color: "black", checked: defaultChecked, onChange: (e => {}) }
    ]);

    return <g>
        <div>
          <h4>Pollutant Types</h4>
          <ul>
            {legendItems.map((item, index) => 
            { 
             return <g><li>
                <input key={item.name} type="checkbox" value={item.name} onClick={() => onClick(index)} />
                <span key={item.name} style={{ color: item.color, marginRight: '5px' }}>&#9632;</span>
                {item.name}</li>
            </g>
            })
            }
            </ul>
        </div>
    </g>

}

export { Legend }