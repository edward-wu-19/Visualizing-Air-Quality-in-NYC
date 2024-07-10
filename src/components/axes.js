import React from "react";

export { XAxis, YAxis };

function YAxis (props) {
    const { yScale, width, height, tickCount } = props;
    
    return <g>
        {<line y1={0} y2={height} stroke='black'/>}

        {yScale.ticks(tickCount).map(tickValue =>
            <g key={tickValue} transform={`translate(${0}, ${yScale(tickValue)})`}>
                <line x1={-width/100} x2={0} stroke='black' />

                <text style={{textAnchor: 'end', fontSize:'12px' }} x={-width/60} y={height/40}>
                    {tickValue}
                </text>

                <line x2={width} strokeDasharray="10 24" stroke="#bbbbbb" />
            </g>
        )}

        <text style={{textAnchor: 'middle', fontSize:'18px'}} transform={`rotate(-90), translate(${-height/2},${-(70+width/80)})`}>
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
    const { xScale, width, height, tickCount } = props;

    return <g transform={`translate(0, ${height})`}>
        {<line x2={width} stroke='black'/>}

        {xScale.ticks(tickCount).map(tickValue => 
            <g key={tickValue} transform={`translate(${xScale(tickValue)}, ${0})`}>
                <line y2={10} stroke='black' />
                <text style={{ textAnchor:'end', fontSize:'12px' }} x={13} y={25}>
                    {tickValue}
                </text>

                <line y2={-height} strokeDasharray="6 20" stroke="#bbbbbb" />
            </g>
        )}

        <text style={{textAnchor:'middle', fontSize:'18px'}} x={width/2} y={50}>Year</text>
    </g>
    
}