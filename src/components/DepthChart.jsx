import React, { useState, useEffect, useRef } from "react";
import "./DepthChart.css";
import { select } from "d3-selection";

import { axisBottom, axisLeft } from "d3-axis";
import { scaleLinear } from "d3";
import { extent } from "d3-array";
import getColor from "../config/color";
function DepthChart({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) return;

    let magData = [];

    data.features.forEach((feature) => {
      const mag = Math.round(feature.properties.mag * 10) / 10;
      const depth = feature.geometry.coordinates[2];
      if (depth > 0 && mag > 0) {
        magData.push({ depth: depth, magnitude: mag });
      }
    });

    const svg = select(svgRef.current);
    const xScale = scaleLinear()
      .domain(extent(magData, (d) => d.depth))
      .range([0, 400]);

    const yScale = scaleLinear()
      .domain(extent(magData, (d) => d.magnitude))
      .range([130, 0]);

    const xAxis = axisBottom(xScale);

    svg.select(".x-axis").style("transform", "translateY(130px)").call(xAxis);

    const yAxis = axisLeft(yScale);

    svg.select(".y-axis").style("transform", "translateX(0px)").call(yAxis);

    svg
      .selectAll(".circle")
      .data(magData)
      .join("circle")
      .attr("class", "circle")
      .attr("cx", (d) => xScale(d.depth))
      .attr("cy", (d) => yScale(d.magnitude))
      .attr("r", 1)
      .attr("fill", (d) => getColor(d.magnitude));
  }, [data]);
  return (
    <div className="depthview">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="bar-chart-name">Depth Chart Analysis</p>
        <button className="button-style"> Reset Brush</button>
      </div>
      <svg ref={svgRef} style={{ overflow: "visible" }}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </svg>
    </div>
  );
}

export default DepthChart;