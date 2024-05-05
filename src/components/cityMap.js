// Remember to npm install bootstrap, react-boostrap, react, d3 in local project directory!!

import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { min, max, scaleLinear } from 'd3';
import styles from "../styles/main-style.module.css";

import { Nodes } from "./node"
import { MapLegend } from "./mapLegend";
import { arange } from "./utils";

function CityMap(props){
    const {width, height, map, coords, data, selectedYear, selectedPollutant, selectedNeighborhood, onHover, onOut} = props;

    // console.log('map:', map);

    let projection = geoMercator();

    projection.fitSize([width, height], map);
    let path = geoPath(projection);

    // create scale for luminosity for nodes and the map legend
    const colorScale = scaleLinear()
    .domain([min(data.filter(d => d.Name == selectedPollutant), d => d.Value), max(data.filter(d => d.Name == selectedPollutant), d => d.Value)])
    .range([100, 40]).nice();

    return <g>
        {
            map.features.filter(row => row.properties.GEOCODE != selectedNeighborhood).map(feature => 
            <path key={feature.properties.GEOCODE} 
            d={path(feature)} className={styles.boundary}
            fill={'#d4d4d4'}
             />)
        }
        {
            map.features.filter(row => row.properties.GEOCODE == selectedNeighborhood).map(feature => 
            <path key={feature.properties.GEOCODE} 
            d={path(feature)} className={styles.boundary}
            fill={'#64e3a1'}
             />
            )
        }
        <Nodes projection={projection} map={map} data={data} colorScale={colorScale} selectedYear={selectedYear} selectedPollutant={selectedPollutant} selectedNeighborhood={selectedNeighborhood} onHover={onHover} onOut={onOut} />
        
        <MapLegend x={20} y={20} width={100} height={50} rangeOfValues={colorScale.domain} colormap={colorScale} />
    </g>

}

export { CityMap }