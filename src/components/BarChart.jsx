import React, { useState, useEffect, useRef } from "react";
import "./BarChart.css";
import { select } from "d3-selection";
import { line } from "d3-shape";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleLinear, scaleBand } from "d3";
import * as d3 from "d3";

function BarChart({ data }) {
  const svgRef = useRef();
  let magArray = [];
  const magData = {};
  const margin = { top: 10, right: 30, bottom: 30, left: 40 };
  const width = 500 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  if (data) {
    data.features.map((feature) => {
      const magType = Math.round(feature.properties.mag * 10) / 10;
        if (magData[magType]) {
          magData[magType].count += 1;
        } else {
          magData[magType] = {
            count: 1,
          };
        }
    });

    magArray = Object.keys(magData).map((mag) => ({
      mag,
      count: magData[mag].count,
    }));
    console.log("magArray", magArray);
  }

  

  return (
    <div className="barview">
      <p>Earthquake Magnitude Histogram</p>
      <svg
        ref={svgRef}
        style={{ overflow: "visible" }}
        width={width}
        height={height + 50}
      >
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </svg>
    </div>
  );
}

export default BarChart;