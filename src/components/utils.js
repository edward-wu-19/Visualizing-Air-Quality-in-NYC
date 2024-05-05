import React from "react";
import { csv } from "d3";
import styles from "../styles/main-style.module.css";

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
    else if (pollName == 'Air Toxics'){
        return 'green';
    }
    else return 'orange';
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
    }, []);
    return dataAll;
}

function NeighborhoodName(neighborhoodID){
    const csvUrl = 'https://raw.githubusercontent.com/edward-wu-19/Info-Vis-Final-Project/main/src/components/UHF42%20District%20Dictionary.csv';

    const dict = useUhf42Dictionary(csvUrl);

    var convert = {};
    for (const entry in dict){
        convert[dict[entry].ID] = dict[entry].Name;
    }

    return convert[neighborhoodID];
}

export { pollutantToColor, removeDuplicates, arange, NeighborhoodName as neighborhoodName }