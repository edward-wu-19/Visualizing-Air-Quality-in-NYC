import React from "react";
import { csv, json } from "d3";
import * as topojson from "topojson-client";

function pollutantToColor(selectedPollutant){
    // takes in a string, returns string of color
    return selectedPollutant == "Ozone" ? "red"
    : selectedPollutant == "Nitrogen Dioxide" ? "blue" 
    : selectedPollutant == "Fine Particles" ? "black"
    : "white";
}

function pollutantToHue(selectedPollutant){
    // takes in a string, returns hue of the color for HSL
    return selectedPollutant == "Nitrogen Dioxide" ? "240"
    // ozone and fine particles both use 0
    : "0";
}

function pollutantToSat(selectedPollutant){
    // takes in a string, returns hue of the color for HSL
    return selectedPollutant == "Fine Particles" ? "0%"
    // ozone and nitrogen dioxide both use sat 100
    : "100%";
}

function arange(start, stop, step=1){
    step = step || 1;
    var arr = [];
    for (var i=start;i<stop;i+=step){
       arr.push(i);
    }
    return arr;
}

function useUhf42Dictionary(csvPath){
    const [dataAll, setDataAll] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.ID = d.Code;
                d.Name = d.Name;
            });
            setDataAll(data);
        });
    }, [csvPath]);
    return dataAll;
}

function useNeighborhoodName(neighborhoodID){
    const csvUrl = 'https://raw.githubusercontent.com/edward-wu-19/Info-Vis-Final-Project/main/src/components/UHF42%20District%20Dictionary.csv';

    const dict = useUhf42Dictionary(csvUrl);

    for (const entry in dict){
        if (neighborhoodID == dict[entry].ID) {
            return dict[entry].Name;
        }
    }
    
    // if the ID was not found, return the id that was given
    return neighborhoodID;
}

function useData(csvPath){
    const [dataAll, setData] = React.useState(null);
    React.useEffect(() => {
        csv(csvPath).then(data => {
            data.forEach(d => {
                d.ID = d.row;
                d.Name = d.Name;
                d.Neighborhood =+ d.Neighborhood;
                d.Value =+ d.Value;
                d.Year =+ d.Year;
            });
            setData(data);
        });
    }, [csvPath]);
    return dataAll;
}

function useMap(jsonPath) {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        json(jsonPath).then(topoJsonData => {
            setData(topojson.feature(topoJsonData, topoJsonData.objects.collection));
        })
    }, [jsonPath]);
    return data;
}

export { pollutantToColor, pollutantToHue, pollutantToSat, arange, useNeighborhoodName, useData, useMap }