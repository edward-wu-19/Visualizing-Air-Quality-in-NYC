// Remember to npm install bootstrap, react-boostrap, react, d3 in local project directory!!

import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { max, scaleLinear } from 'd3';
import styles from "../styles/main-style.module.css";

import { Nodes } from "./node";
import { MapLegend } from "./mapLegend";

function CityMap(props){
    const {width, height, border_width, border_height, map, data, selectedYear, selectedPollutant, selectedNeighborhood, onHover, onOut} = props;

    const map_legend_width = 30;
    const map_legend_height = 300;
    const map_legend_x = width - map_legend_width + 50 - 5;
    const map_legend_y = height - map_legend_height - 20;

    // create projection of the city boroughs
    let projection = geoMercator();

    projection.fitSize([width, height], map);
    let path = geoPath(projection);

    const max_concentration = max(data.filter(d => d.Name == selectedPollutant), d => d.Value);

    // takes in a string, returns number representing the standards set by the EPA in the NAAQS for that pollutant, in that pollutant's unit
    const getPollutantStandard = selectedPollutant => 
        selectedPollutant == "Ozone" ? 70
        : selectedPollutant == "Nitrogen Dioxide" ? 53 
        : selectedPollutant == "Fine Particles" ? 9
        : 0;

    // create scale for luminosity for nodes and the map legend
    const color_legend_max = max([max_concentration, getPollutantStandard(selectedPollutant)]);

    const luminosityScale = scaleLinear()
    .domain([0, color_legend_max])
    .range([100, 40]).nice();

    // console.log(max(data.filter(d => d.Name == selectedPollutant), d => d.Value));

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
        
        <Nodes projection={projection} map={map} data={data} luminosityScale={luminosityScale} selectedYear={selectedYear} selectedPollutant={selectedPollutant} selectedNeighborhood={selectedNeighborhood} onHover={onHover} onOut={onOut} />

        <MapLegend x={map_legend_x} y={map_legend_y} width={map_legend_width} height={map_legend_height} color_legend_max={color_legend_max} selectedPollutant={selectedPollutant} />
    </g>;

}

export { CityMap }