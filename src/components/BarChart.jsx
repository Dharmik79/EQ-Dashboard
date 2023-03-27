import React, { useState, useEffect, useRef } from "react";
import "./BarChart.css";
import { select } from "d3-selection";
import { line } from "d3-shape";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleLinear, scaleBand } from "d3";
import * as d3 from "d3";

function BarChart({ data }) {
  const svgRef = useRef();
  const magnitudeTypes = ["md", "ml", "ms_20", "mw", "me", "mi", "mb", "mb_lg"];
  let magArray = [];
  const magTypeData = {};
  const width = 700;
  const height = 150;

  if (data) {
    data.features.map((feature) => {
      const magType = feature.properties.magType;

      if (magTypeData[magType]) {
        magTypeData[magType].count += 1;
      } else {
        magTypeData[magType] = {
          count: 1,
        };
      }
    });
     magArray = Object.keys(magTypeData).map((magType) => ({
      magType,
      count: magTypeData[magType].count,
    }));
    console.log("magArray",magArray)
  }

  useEffect(() => {
    const svg = select(svgRef.current);

    const x = d3.scaleBand().domain(magnitudeTypes).range([0, width]).padding(0.1);

    const y = d3.scaleLinear().domain([0, d3.max(magArray, (d) => d.count)]).range([height, 0]);

    // Create the axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg.select(".x-axis").style("transform", `translateY(${height}px)`).call(xAxis);

    svg.select(".y-axis").style("transform", "translateX(0px)").call(yAxis);

    svg
      .selectAll(".bar")
      .data(magArray)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.magType))
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count));
  }, [data]);

  return (
    <div className="barview">
      <p>Earthquake Magnitude Histogram</p>
      <svg ref={svgRef} style={{ overflow: "visible" }} width={width} height={height + 50}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </svg>
    </div>
  );
}

export default BarChart;