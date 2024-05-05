import React from "react";
import { min, max } from 'd3';
import styles from "../styles/main-style.module.css";

import { pollutantToColor } from "./utils";

function determineCoordinates(feature){
    // return the coordinates that the node should be placed

    // one neighborhood can have multiple elements in the coordinates array, denoting several, disconnected regions

    let minX, minY, maxX, maxY;
    
    if (feature.geometry.type == 'MultiPolygon'){
        minX = min(feature.geometry.coordinates, zone => zone[0].reduce(
                (point1, point2) => {return point1[0] < point2[0] ? point1 : point2})[0]);
        maxX = max(feature.geometry.coordinates, zone => zone[0].reduce(
            (point1, point2) => {return point1[0] > point2[0] ? point1 : point2})[0]);

        minY = min(feature.geometry.coordinates, zone => zone[0].reduce(
            (point1, point2) => {return point1[1] < point2[1] ? point1 : point2})[1]);
        maxY = max(feature.geometry.coordinates, zone => zone[0].reduce(
            (point1, point2) => {return point1[1] > point2[1] ? point1 : point2})[1]);
    }
    else{
        minX = feature.geometry.coordinates[0].reduce(
            (point1, point2) => {return point1[0] < point2[0] ? point1 : point2})[0];
        maxX = feature.geometry.coordinates[0].reduce(
            (point1, point2) => {return point1[0] > point2[0] ? point1 : point2})[0];

        minY = feature.geometry.coordinates[0].reduce(
            (point1, point2) => {return point1[1] < point2[1] ? point1 : point2})[1];
        maxY = feature.geometry.coordinates[0].reduce(
            (point1, point2) => {return point1[1] > point2[1] ? point1 : point2})[1];
    }
   
    // return averages
    let avgX = (minX + maxX) / 2;
    let avgY = (minY + maxY) / 2;

    return [avgX, avgY];
}

function Nodes(props){
    const {projection, map, data, colorScale, selectedYear, selectedPollutant, selectedNeighborhood, onHover, onOut} = props;

    const getRadius = d => d === selectedNeighborhood ? 12:8;
    // const getStroke = d => d === selectedNeighborhood ? 'black':'black';
    const getStrokeWidth = d => d === selectedNeighborhood ? '2px':'1px';

    if(data){
        
        // we need to calculate where to put each neighborhood's node
        var coords = {};
        for (var i = 0; i < map.features.length-1; i++){
            var feature = map.features[i];

            coords[feature.properties.GEOCODE] = determineCoordinates(feature);
        }

        // choose what data to display on the map
        let selectedRows = data.filter(d => d.Year == selectedYear && d.Name == selectedPollutant);

        // determine the right color, in hsl format
        var hue, sat;
        if (selectedPollutant == 'Ozone'){
            hue = '0';
            sat = "100%";
        }
        else if (selectedPollutant == 'Nitrogen Dioxide'){
            hue = '240';
            sat = "100%";
        }
        else if (selectedPollutant == 'Fine Particles'){
            hue = '0';
            sat = "0%";
        }

        // console.log(hue, sat);

        // plot nodes
        return <g>
            {
                selectedRows.map( d => {
                var color = "hsl(" + hue + ',' + sat + "," + Math.round(colorScale(d.Value)) + "%)";
                {/* console.log(color); */}
            
                return <circle key={d.Neighborhood}
                    r={`${getRadius(d.Neighborhood)}`}
                    stroke={'black'}
                    strokeWidth={`${getStrokeWidth(d.Neighborhood)}`}
                    fill={color}
                    cx={projection(coords[d.Neighborhood])[0]}
                    cy={projection(coords[d.Neighborhood])[1]}
                    onMouseOver={() => onHover(d.Neighborhood)}
                    onMouseOut={() => onOut()}
                    ></circle>
                    }
                )}
        </g>
    } else {
        return <g>

        </g>
    }
}

export { Nodes }