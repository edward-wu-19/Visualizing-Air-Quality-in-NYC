import React from "react";

export { XAxis, YAxis };

function YAxis (props) {
    const { yScale, height, offsetX } = props;
    return <g>
        {<line x1={0} y1={0} x2={0} y2={height} stroke='black'/>}

        {yScale.ticks(5).map(tickValue =>
            <g key={tickValue} transform={`translate(${0}, ${yScale(tickValue)})`}>
                <line x1={-5} x2={0} stroke='black' />

                <text style={{textAnchor: 'end', fontSize:'10px' }} x={-offsetX/4} y={4}>
                    {tickValue}
                </text>
            </g>
        )}
    </g>
}

function XAxis(props) {
    const { xScale, width, height} = props;

    return <g transform={`translate(${0}, ${height})`}>
        {<line x2={width} stroke='black'/>}

        {xScale.ticks(11).map(tickValue => 
            <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${0})`}>
                <line y2={10} stroke='black' />
                <text style={{ textAnchor:'end', fontSize:'10px' }} x={10} y={20}>
                    {tickValue}
                </text>
            </g>
        )}
    </g>
    
}