import React from "react";

export { XAxis, YAxis };

function YAxis (props) {
    const { yScale, height, offsetX, offsetY } = props;
    
    return <g>
        {<line y1={10-offsetY} y2={height} stroke='black'/>}

        {yScale.ticks(5).map(tickValue =>
            <g key={tickValue} transform={`translate(${0}, ${yScale(tickValue)})`}>
                <line x1={-5} x2={0} stroke='black' />

                <text style={{textAnchor: 'end', fontSize:'12px' }} x={-10} y={4}>
                    {tickValue}
                </text>
            </g>
        )}

        <text style={{textAnchor: 'middle', fontSize:'18px'}} transform={`rotate(-90), translate(${height/-2},${-offsetX})`}>
        <tspan x='0' dy='1.2em'>
            Concentration
        </tspan>
        <tspan x='0' dy='1.2em'>
            (ppb or µg/m^3)
        </tspan>
        </text>
    </g>
}

function XAxis(props) {
    const { xScale, width, height } = props;

    return <g transform={`translate(${0}, ${height})`}>
        {<line x2={width} stroke='black'/>}

        {xScale.ticks(11).map(tickValue => 
            <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${0})`}>
                <line y2={10} stroke='black' />
                <text style={{ textAnchor:'end', fontSize:'12px' }} x={10} y={25}>
                    {tickValue}
                </text>
            </g>
        )}

        <text style={{textAnchor:'middle', fontSize:'18px'}} x={width/2} y={height/6+15}>Year</text>
    </g>
    
}