// Remember to npm install bootstrap, react-boostrap, react, d3 in local project directory!!

import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { csv, json } from "d3";
import * as topojson from "topojson-client";

import { Row, Col, Container } from "react-bootstrap";



import { CityMap } from "../components/cityMap";
import { Legend } from "../components/legend";
import { LineChart } from "../components/lineChart";
import { Textbox } from "../components/textbox";
// import {  } from "../components/utils";

import styles from "../styles/main-style.module.css";


const csvUrl = 'https://raw.githubusercontent.com/edward-wu-19/Info-Vis-Final-Project/main/src/components/summer.csv';
const mapUrl = 'https://raw.githubusercontent.com/nycehs/NYC_geography/master/UHF42.topo.json';

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
    }, []);
    return dataAll;
}
function useMap(jsonPath) {
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        json(jsonPath).then(topoJsonData => {
            setData(topojson.feature(topoJsonData, topoJsonData.objects.collection));
        })
    }, []);
    return data;
}

function PollutantVisualization(){
    // interaction for map
    const [selectedYear, setSelectedYear] = React.useState('2009');
    const [mostRecentPollutant, setMostRecentPollutant] = React.useState('Ozone');

    // interaction for line chart
    const [toggleOzone, setToggleOzone] = React.useState(true);
    const [toggleNitrogen, setToggleNitrogen] = React.useState(true);
    const [toggleParticles, setToggleParticles] = React.useState(true);
    // const [toggleToxins, setToggleToxins] = React.useState(true); // originally had planned to, but the dataset does not include toxins in UHF-42 measurements.

    const onClick = (index) => {
        if (index == 0){
            setToggleOzone(!toggleOzone);
            setMostRecentPollutant('Ozone');
        }
        else if (index == 1){
            setToggleNitrogen(!toggleNitrogen);
            setMostRecentPollutant('Nitrogen Dioxide');
        }
        else if (index == 2){
            setToggleParticles(!toggleParticles);
            setMostRecentPollutant('Fine Particles');
        }
    }

    const [selectedNeighborhood, setSelectedNeighborhood] = React.useState(null);

    const onNodeHover = (neighborhood) => {
        setSelectedNeighborhood(neighborhood);
    }
    const onNodeOut = () => {
        setSelectedNeighborhood(null);
    }

    const linechart_width = 700;
    const linechart_height = 400;
    const linechart_margin = { top: 10, bottom: 50, left: 10, right: 10 };
    const linechart_offsetX = 30;
    const linechart_offsetY = 10;

    const linechart_inner_width = linechart_width - linechart_margin.left - linechart_margin.right - linechart_offsetX;
    const linechart_inner_height = linechart_height - linechart_margin.top - linechart_margin.bottom + linechart_offsetY;

    const map_width = 800;
    const map_height = 500;
    const legend_width = 2000;
    const textbox_width = 300;
    const middlerow_height = 130;

    const data = useData(csvUrl);
    // console.log(data);
    const map = useMap(mapUrl);
    // console.log(map);

    const changeHandler = (event) => {
        setSelectedYear(event.target.value);
    };
    
    if (!map || !data) {
        return <pre>Loading...</pre>;
    };
    return <Container>
        {/* Top row is the project title */}
        <Row className={"justify-content-md-left"}>
            <Col lg={10} >
                <h2 className={styles.h1Style}>Air Pollutants in New York City</h2> 
            </Col>
        </Row>  

        {/* Then we have the city map and scale for the nodes */}
        <Row className={"justify-content-md-left"}>
        <Col lg={10} >
            <h4>City Map</h4>
            <svg 
            className={styles.mapStyle} 
            id={"map"} 
            width={map_width} 
            height={map_height}>
                <CityMap 
                width={map_width} 
                height={map_height} 
                map={map}
                data={data}
                selectedYear={selectedYear}
                selectedPollutant={mostRecentPollutant}
                selectedNeighborhood={selectedNeighborhood}
                onHover={onNodeHover}
                onOut={onNodeOut}
                />
            </svg>
        </Col>
        </Row>

        {/* Then we have the slider, the legend, and the tooltip */}
        <Row className={"justify-content-md-left"}>
        <Col lg={2} md={2} className={styles.sliderStyle}>
            <input key="slider" type='range' min='2009' max='2022' value={selectedYear} step='1' onChange={changeHandler}/>

            <input key="yearText" type="text" value={selectedYear} readOnly/>
        </Col>
        <Col lg={2}>
            <g id={"legend"} >
            <Legend
            width={legend_width}
            height={middlerow_height}
            data={data}
            onClick={onClick}
            />
            </g>
        </Col>
        <Col lg={4} >
            <svg className={styles.textboxStyle} id={"textbox"} width={textbox_width} height={middlerow_height}>
                <Textbox 
                data={data}
                selectedYear={selectedYear}
                selectedNeighborhood={selectedNeighborhood}
                />
            </svg>

        </Col>
        </Row>

        {/* At the bottom is the line chart */}
        <Row>
            <Col lg={10}>
                <h4>Air Quality Over Time</h4>
                <svg className={styles.svgStyle} id={"linechart"} width={linechart_width} height={linechart_height}>
                    <LineChart 
                    offsetX = {linechart_offsetX}
                    offsetY = {linechart_offsetY}
                    width={linechart_inner_width} height={linechart_inner_height} 
                    dataset={data}
                    toggleOzone={toggleOzone}
                    toggleNitrogen={toggleNitrogen}
                    toggleParticles={toggleParticles}
                    selectedNeighborhood={selectedNeighborhood}
                    />
                </svg>
            </Col>
        </Row> 
    </Container>
}

export default PollutantVisualization