// Remember to npm install bootstrap, react-boostrap, react, d3 in local project directory!!

import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { min, max, scaleLinear } from 'd3';
import styles from "../styles/main-style.module.css";

import { Nodes } from "./node";

function CityMap(props){
    const {width, height, border_width, border_height, map, data, selectedYear, selectedPollutant, selectedNeighborhood, onHover, onOut} = props;

    let projection = geoMercator();

    projection.fitSize([width, height], map);
    let path = geoPath(projection);

    // create scale for luminosity for nodes and the map legend
    const colorScale = scaleLinear()
    .domain([min(data.filter(d => d.Name == selectedPollutant), d => d.Value), max(data.filter(d => d.Name == selectedPollutant), d => d.Value)])
    .range([100, 40]).nice();

    return <g transform={`translate(${(border_width-width)/2},${(border_height-height)/2})`}>
        {
            map.features.filter(row => row.properties.GEOCODE != selectedNeighborhood).map(feature => 
            <path key={feature.properties.GEOCODE} 
            d={path(feature)} className={styles.boundary}
            fill={'#d4d4d4'}
             />)
        }
        {/* make the hovered neighborhood a different color */}
        {
            map.features.filter(row => row.properties.GEOCODE == selectedNeighborhood).map(feature => 
            <path key={feature.properties.GEOCODE} 
            d={path(feature)} className={styles.boundary}
            fill={'#64e3a1'}
             />
            )
        }
        <Nodes projection={projection} map={map} data={data} colorScale={colorScale} selectedYear={selectedYear} selectedPollutant={selectedPollutant} selectedNeighborhood={selectedNeighborhood} onHover={onHover} onOut={onOut} />
    </g>

}

export { CityMap }