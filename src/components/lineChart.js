import React from "react";
import { max, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes";
import { pollutantToColor, arange } from "./utils";


function LineChart (props) {
    const {offsetX, offsetY, dataset, height, width, toggleOzone, toggleNitrogen, toggleParticles, selectedNeighborhood} = props;

    var data = dataset;
    if (selectedNeighborhood != null){
        data = dataset.filter((row) => row.Neighborhood == selectedNeighborhood);
    }
    

    // first compute the city average in each year
    var helper = {};
    data.reduce(function(r,o){
        var key = o.Name + '-' + o.Year;

        if (!helper[key]){
            helper[key] = Object.assign({}, o);
            helper[key].instances = 1;
            helper[key].sum = o.Value;
        } else {
            helper[key].sum += o.Value;
            helper[key].instances += 1;
        }
    
    });

    // calculate means
    for (const row in helper){
        helper[row].mean = helper[row].sum / helper[row].instances;
    }

    const xScale = scaleLinear().range([20, width-20]).domain([2009, 2022]).nice();
    const yScale = scaleLinear().range([height, 10]).domain([0, max(data, a => a.Value)]).nice(); 

    // helper stores the grouping and the mean for the measurements in each

    const [grouped, setGrouped] = React.useState([]);
    for (const row in helper){

        var poll = row.substring(0,row.length-5);
        var year = row.substring(row.length-4,row.length);

        const datarow = {
            year:year, 
            value:helper[row].mean
        } 

        // make an array for each pollutant
        if (!grouped[poll]){
            grouped[poll] = [];
        }
        // do not add duplicate entries upon further reloads
        grouped[poll][year - 2009] = datarow;
    }

    // grouped is a 2d array where the first dimension is the pollutant and the second is the year.

    const pollNames = ['Ozone', 'Nitrogen Dioxide', 'Fine Particles'];

    // filter for only the pollutants selected
    if (toggleOzone){
        var index = pollNames.indexOf('Ozone');
        pollNames.splice(index,1);
    }
    if (toggleNitrogen){
        var index = pollNames.indexOf('Nitrogen Dioxide');
        pollNames.splice(index,1);
    }
    if (toggleParticles){
        var index = pollNames.indexOf('Fine Particles');
        pollNames.splice(index,1);
    }

    const tickCountX = 11;
    const tickCountY = 5;
    
    return <g transform={`translate(${offsetX}, ${offsetY})`}>
        {/* the axis objects also have the gridlines */}
        <YAxis yScale={yScale} width={width} height={height} offsetX={offsetX} offsetY={offsetY} tickCount={tickCountY} />
        <XAxis xScale={xScale} width={width} height={height} tickCount={tickCountX} />
        
        { pollNames.map( pollutant => {
            // make points on graph
            return grouped[pollutant].map( row => {
                return <circle
                key={row.year + '-' + pollutant}
                    cx={xScale(row.year)}
                    cy={yScale(row.value)}
                    r={5}
                    fill={pollutantToColor(pollutant)}
                    />
            })
        }
            )
        }

        { pollNames.map( pollutant => {
            // connect the points
            const pollArray = grouped[pollutant];
            return arange(0,13).map( row_num => {
                const point1 = pollArray[row_num];
                const point2 = pollArray[row_num + 1];
                return <line
                key={pollutant + '-' + row_num}
                    x1={xScale(point1.year)}
                    x2={xScale(point2.year)}
                    y1={yScale(point1.value)}
                    y2={yScale(point2.value)}
                    strokeWidth={3}
                    stroke={pollutantToColor(pollutant)}
                    />
            })
        }
            )
        }

        <text style={{textAnchor: 'middle', fontSize:'20px'}} x={width/2} y={-height/40}>Concentration Over Time</text>
    </g>
}

export { LineChart }