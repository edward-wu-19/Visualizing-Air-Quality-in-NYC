// Remember to npm install bootstrap, react-boostrap, react, d3 in local project directory!!

import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

// import { min, csv, json } from "d3";
// import * as topojson from "topojson-client";
import { Row, Col, Container } from "react-bootstrap";

import { CityMap } from "../components/cityMap";
import { LineChart } from "../components/lineChart";
import { Slider } from "../components/slider";
import { TextboxTitle, TextboxBody } from "../components/textbox";
import { Legend } from "../components/legend";
import { InfoBox } from "../components/infobox";
import { useData, useMap } from "../components/utils";

import styles from "../styles/main-style.module.css";


const csvUrl = 'https://raw.githubusercontent.com/edward-wu-19/Visualizing-Air-Quality-in-NYC/main/src/components/summer_data.csv';
const mapUrl = 'https://raw.githubusercontent.com/nycehs/NYC_geography/master/UHF42.topo.json';

// ===================================== 
// ===================================== 

function PollutantVisualization(){
    // interaction for map
    const [selectedYear, setSelectedYear] = React.useState('2009');
    const [mostRecentPollutant, setMostRecentPollutant] = React.useState('Ozone');

    // interaction for line chart
    const [toggleOzone, setToggleOzone] = React.useState(false);
    const [toggleNitrogen, setToggleNitrogen] = React.useState(false);
    const [toggleParticles, setToggleParticles] = React.useState(false);

    const onOverFunction = (index) => {
        if (index == 0){
            setMostRecentPollutant('Ozone');
        }
        else if (index == 1){
            setMostRecentPollutant('Nitrogen Dioxide');
        }
        else if (index == 2){
            setMostRecentPollutant('Fine Particles');
        }
    }
    const onClick = (index) => {
        if (index == 0){
            setToggleOzone(!toggleOzone);
        }
        else if (index == 1){
            setToggleNitrogen(!toggleNitrogen);
        }
        else if (index == 2){
            setToggleParticles(!toggleParticles);
        }
    }

    const [selectedNeighborhood, setSelectedNeighborhood] = React.useState(null);

    const onNodeHover = (neighborhood) => {
        setSelectedNeighborhood(neighborhood);
    }
    const onNodeOut = () => {
        setSelectedNeighborhood(null);
    }
    
    // ================================
    // ================================

    const left_column_width = 800;
    const right_column_width = 300;


    const map_width = left_column_width;
    const map_height = 530;
    const map_margin = 15;
    const map_inner_width = map_width - 2 * map_margin
    const map_inner_height = map_height - 2 * map_margin


    const linechart_width = 800;
    const linechart_height = 350;
    const linechart_margin = { top: 10, bottom: 50, left: 10, right: 10 };
    const linechart_offsetYaxis = 75;
    const linechart_offsetXaxis = -10;
    const linechart_title_height = 50;

    const linechart_inner_width = linechart_width - linechart_margin.left - linechart_margin.right - linechart_offsetYaxis;
    const linechart_inner_height = linechart_height - linechart_margin.top - linechart_margin.bottom + linechart_offsetXaxis - linechart_title_height;

    
    const slider_width = right_column_width;
    const slider_height = 80;
    const slider_margin = { top: 10, bottom: 10, left: 10, right: 10 };
    const slider_inner_width = slider_width - slider_margin.left - slider_margin.right;
    const slider_inner_height = slider_height - slider_margin.top - slider_margin.bottom;


    const textbox_title_width = "100%";
    const textbox_title_height = 60;
    const textbox_body_width = "100%";
    const textbox_body_height = 70;


    const legend_width = 210;
    const legend_height = 100;
    const legend_margin = { top: 10, bottom: 10, left: 10, right: 10 };
    const legend_inner_width = legend_width - legend_margin.left - legend_margin.right;
    const legend_inner_height = legend_height - legend_margin.top - legend_margin.bottom;


    const infobox_width = right_column_width;
    const infobox_height = 420;
    const infobox_margin = { top: 10, bottom: 10, left: 10, right: 10 };
    const infobox_inner_width = infobox_width - infobox_margin.left - infobox_margin.right;
    const infobox_inner_height = infobox_height - infobox_margin.top - infobox_margin.bottom;

    const data = useData(csvUrl);
    // console.log(data);
    const map = useMap(mapUrl);
    // console.log(map);

    const changeHandler = (event) => {
        setSelectedYear(event.target.value);
    };
    
    // ================================
    // ================================
    
    if (!map || !data) {
        return <pre>Loading...</pre>;
    };

    return <Container className={styles.mainView}>
        {/* Top row is the project title */}
        <Row>
            <Col>
                <h2 className={styles.headerStyle}>
                Air Pollutants in New York City
                </h2> 
            </Col>
        </Row>  

        {/* On the left, we have the map and the line chart underneath */}
        <Row>
        <Col lg={8} className={styles.columnStyle}>
        
            <Row>
                {/* City Map */}
                <h4>City Map</h4>
                <svg 
                className={styles.mapStyle} 
                id={"map"} 
                width={map_width} 
                height={map_height}>
                    <CityMap 
                    width={map_inner_width} 
                    height={map_inner_height} 
                    border_width={map_width}
                    border_height={map_height}
                    map={map}
                    data={data}
                    selectedYear={selectedYear}
                    selectedPollutant={mostRecentPollutant}
                    selectedNeighborhood={selectedNeighborhood}
                    onHover={onNodeHover}
                    onOut={onNodeOut}
                    />
                </svg>
            </Row>

            <Row>
                {/* Line Chart */}
                <h4>Air Pollutant Concentrations Over Time</h4>
                <svg className={styles.chartStyle} id={"linechart"} width={linechart_width} height={linechart_height}>
                    <LineChart 
                    offsetX = {linechart_offsetYaxis}
                    offsetY = {linechart_offsetXaxis+linechart_title_height}
                    width={linechart_inner_width} height={linechart_inner_height} 
                    dataset={data}
                    toggleOzone={toggleOzone}
                    toggleNitrogen={toggleNitrogen}
                    toggleParticles={toggleParticles}
                    selectedNeighborhood={selectedNeighborhood}
                    />
                </svg>
            </Row>
        </Col>

        <Col lg={3} className={styles.columnStyle}>
            {/* On the right, we have from top to bottom: Year slider, Tooltip-style Infobox, Interactable Legend, Background Textbox, and Links */}

            <Row>
                {/* Year Slider */}
                <div>
                    <h5>Data of Year</h5>
                    <svg className={styles.sliderStyle} id={"slider"} width={slider_width} height={slider_height}>

                        <Slider width={slider_inner_width} height={slider_inner_height} selectedYear={selectedYear} changeHandler={changeHandler} />

                    </svg>
                </div>
                
            </Row>

            <Row>
                {/* Tooltip-style Infobox */}
                <div className={styles.textboxStyle}>
                    <svg 
                    className={styles.textboxTitleStyle} 
                    id={"textboxTitle"} 
                    width={textbox_title_width}
                    height={textbox_title_height}
                    >
                        <TextboxTitle 
                        width={textbox_title_width}
                        height={textbox_title_height}
                        selectedYear={selectedYear}
                        selectedNeighborhood={selectedNeighborhood}
                        />
                    </svg>

                    <svg 
                    className={styles.textboxBodyStyle} 
                    id={"textboxBody"} 
                    width={textbox_body_width}
                    height={textbox_body_height}
                    >
                        <TextboxBody 
                        data={data}
                        selectedYear={selectedYear}
                        selectedNeighborhood={selectedNeighborhood}
                        />
                    </svg>
                </div>
            </Row>

            <Row>
                {/* Interactive Legend */}
                <div className={styles.legendWholeStyle}>
                    <h5>Air Pollutants</h5>
                    <svg id={"legend"} width={legend_width} height={legend_height}>
                        <Legend
                        width={legend_inner_width}
                        height={legend_inner_height}
                        onOverFunction={onOverFunction}
                        onClick={onClick}
                        />
                    </svg>
                </div>
                
            </Row>

            <Row className={styles.infoboxStyle}>
                {/* Background Context */}
                <h5>Air Quality Standards</h5>
                <svg id={"infobox"} width={infobox_width} height={infobox_height}>
                    <InfoBox width={infobox_inner_width} height={infobox_inner_height}
                    />
                </svg>
            </Row>
        </Col>

        </Row>
    </Container>
}

export default PollutantVisualization