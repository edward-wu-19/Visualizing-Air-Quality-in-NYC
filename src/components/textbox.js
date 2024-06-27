import React from "react";

import { useNeighborhoodName } from "./utils";

import styles from "../styles/main-style.module.css";

function TextboxTitle(props) {
    const {width, height, selectedYear, selectedNeighborhood} = props;

    var selectedNeighborhoodCopy = selectedNeighborhood;

    // if no neighborhood is selected, we replace it with "City Averages"
    if (!selectedNeighborhoodCopy){
        // because of the way useNeighborhoodName is defined, this works for the argument "City Averages"
        selectedNeighborhoodCopy = "City Averages";
    }
    selectedNeighborhoodCopy = useNeighborhoodName(selectedNeighborhoodCopy);

    return <g>
        <foreignObject width={width} height={height} xmlns="http://www.w3.org/1999/xhtml">
            {selectedYear}
            <br/>
            {selectedNeighborhoodCopy}
        </foreignObject>
    </g>;
}

function TextboxBody(props) {
    const {data, selectedYear, selectedNeighborhood} = props;
    
    if (!data) {
        return <g></g>;
    }
    
    let selectedRows = data.filter(row => row.Year == selectedYear);
    

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

    if (!selectedYear) {
        // if the year is not even selected, then something has gone wrong
        // in all my messing around, this branch has never been executed...
        return <g><text>Something has gone wrong.</text></g>;
    }

    if (!selectedNeighborhood) {
        // for city averages, divide by 42 because there are 42 districts and there are no missing data.
        ozoneMeas = Math.round(ozoneMeas / 42 * 100)/100;
        nitrogenMeas = Math.round(nitrogenMeas / 42 * 100)/100;
        particleMeas = Math.round(particleMeas / 42 * 100)/100;
    }

    return <g>
        <text>
        <tspan x='20' dy='1.2em'>
            Ozone: {ozoneMeas} ppb
        </tspan>
        <tspan x='20' dy='1.2em'>
            Nitrogen Dioxide: {nitrogenMeas} ppb
        </tspan>
        <tspan x='20' dy='1.2em'>
            Fine Particles: {particleMeas} mcg/m3
        </tspan>
        </text>
    </g>;
}

export { TextboxTitle, TextboxBody }