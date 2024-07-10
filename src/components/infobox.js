import React from "react";
import styles from "../styles/main-style.module.css";


function InfoBox(props) {
    const {width, height} = props;
    
    return <g>
        <foreignObject width={width} height={height} xmlns="http://www.w3.org/1999/xhtml">
        The Environmental Protection Agency established the National Ambient Air Quality Standards in 1990 for ozone, nitrogen dioxide, and fine particulate matter, among other major air pollutants. According to these standards, in order to maintain healthy air quality, cities must ensure that the annual average of air pollutant concentrations do not exceed the below quantities.
        <table className={styles.infoboxTableStyle}>
            <tbody>
                <tr className={styles.tableRowStyle}>
                    <th className={styles.tableColumnStyle}>Pollutant</th>
                    <th>Standard</th>
                </tr>
                <tr className={styles.tableRowStyle}>
                    <td className={styles.tableColumnStyle}>Ozone</td>
                    <td>70 ppb</td>
                </tr>
                <tr>
                    <td className={styles.tableColumnStyle}>Nitrogen Dioxide</td>
                    <td>53 ppb</td>
                </tr>
                <tr className={styles.tableRowStyle}>
                    <td className={styles.tableColumnStyle}>Fine Particulate Matter <br/> (PM2.5)</td>
                    <td>9 µg/m^3</td>
                </tr>
            </tbody>
        </table>
        </foreignObject>
    </g>;
}

export { InfoBox }