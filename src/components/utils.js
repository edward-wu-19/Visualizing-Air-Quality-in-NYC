import React from "react";
import { csv, json } from "d3";
import * as topojson from "topojson-client";

function pollutantToColor(pollName){
    // takes in a string, returns string of color
    if (pollName == 'Ozone'){
        return "red";
    }
    else if (pollName == "Nitrogen Dioxide"){
        return "blue";
    }
    else if (pollName == 'Fine Particles'){
        return "black";
    }
    else return null;
}

function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
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

function neighborhoodName(neighborhoodID){
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

export { pollutantToColor, removeDuplicates, arange, neighborhoodName, useData, useMap }