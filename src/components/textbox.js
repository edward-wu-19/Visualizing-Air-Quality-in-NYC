import React from "react";
import styles from "../styles/main-style.module.css";

import { neighborhoodName } from "./utils";

function Textbox(props) {
    const {width, height, data, selectedYear, selectedNeighborhood} = props;
    
    // document.getElementById('textbox').innerHTML = "New text!";

    if (!data) {
        return <g><p>Hi</p></g>;
    }
    
    var selectedRows = data.filter(row => row.Year == selectedYear);

    if (selectedNeighborhood){
        selectedRows = data.filter(row => row.Year == selectedYear && row.Neighborhood == selectedNeighborhood);
    }

    const groupedRows = Object.groupBy(selectedRows, ({ Name }) => Name);

    var ozoneMeas = 0;
    var nitrogenMeas = 0;
    var particleMeas = 0;

    // compute grouped sums
    for (const entry in groupedRows['Ozone']){
        ozoneMeas += groupedRows['Ozone'][entry].Value;
    }
    for (const entry in groupedRows['Nitrogen Dioxide']){
        nitrogenMeas += groupedRows['Nitrogen Dioxide'][entry].Value;
    }
    for (const entry in groupedRows['Fine Particles']){
        particleMeas += groupedRows['Fine Particles'][entry].Value;
    }

    if (!selectedNeighborhood & selectedYear) {
        const groupedRows = Object.groupBy(selectedRows, ({ Name }) => Name);

        // for city averages, divide by 42 because there are 42 districts and there are no missing data.
        ozoneMeas = Math.round(ozoneMeas / 42 * 100)/100;
        nitrogenMeas = Math.round(nitrogenMeas / 42 * 100)/100;
        particleMeas = Math.round(particleMeas / 42 * 100)/100;

        return <g><text>
        <tspan x="20" dy="1.2em">
            {`${selectedYear}`} City Averages
        </tspan>
        <tspan x='20' dy='20'>----------------------------</tspan>
        <tspan x='20' dy='1.2em'>
            Ozone: {`${ozoneMeas}`} ppb
        </tspan>
        <tspan x='20' dy='1.2em'>
            Nitrogen Dioxide: {`${nitrogenMeas}`} ppb
        </tspan>
        <tspan x='20' dy='1.2em'>
            Fine Particles: {`${particleMeas}`} mcg/m3
        </tspan>
        </text></g>;
    } else if (selectedNeighborhood & selectedYear) {
        return <g><text>
        <tspan x="20" dy="1.2em">
            {`${selectedYear} ${neighborhoodName(selectedNeighborhood)}`}
        </tspan>
        <tspan x='20' dy='1.2em'>
            Measurements
        </tspan>
        <tspan x='20' dy='20'>----------------------------</tspan>
        <tspan x='20' dy='1.2em'>
            Ozone: {`${ozoneMeas}`} ppb
        </tspan>
        <tspan x='20' dy='1.2em'>
            Nitrogen Dioxide: {`${nitrogenMeas}`} ppb
        </tspan>
        <tspan x='20' dy='1.2em'>
            Fine Particles: {`${particleMeas}`} mcg/m3
        </tspan>
        </text></g>;
    };  
}

export { Textbox }