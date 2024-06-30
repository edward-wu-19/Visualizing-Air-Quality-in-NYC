import React from "react";
import styles from "../styles/main-style.module.css";
import { scaleLinear } from 'd3';

import { pollutantToColor } from "./utils";

function MapLegend(props){
    const {x, y, width, height, color_legend_max, selectedPollutant} = props;

    // determine the right color, in hsl format
    // var hue = pollutantToHue(selectedPollutant);
    // var sat = pollutantToSat(selectedPollutant);
    const color = pollutantToColor(selectedPollutant);

    // filter data for the selected pollutant and identify the range of the color legend, which will include the EPA standard level
    const yCoordinateScale = scaleLinear()
        .domain([0, color_legend_max])
        .range([0, height])
        .nice();

    const ticks = yCoordinateScale.ticks(5);

    return (<g>
        {/* define the gradient of the legend */}
        <defs>
            <linearGradient id={'gradient'} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor="white" />
            </linearGradient>
        </defs>

        {/* define the shape of the legend */}
        <rect className={styles.mapLegendStyle} x={x} y={y} width={width} height={height} style={{fill:"url(#gradient)", strokeWidth:"1", stroke:"black"}}/>

        {/* mark ticks */}
        {ticks.map( tick => {
            return <g key={tick} transform={`translate(${x}, ${y+height-yCoordinateScale(tick)})`}>
                <line x2={-10} stroke={'black'}/>
                <text style={{textAnchor:'end'}} transform={`translate(-13,5)`}>
                    {tick}
                </text>
            </g>
        })}
    </g>)
}

export { MapLegend }