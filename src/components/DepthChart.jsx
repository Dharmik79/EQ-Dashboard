import React, { useState, useEffect, useRef } from "react";
import "./DepthChart.css";
import { select, event as d3Event } from "d3-selection";

import { axisBottom, axisLeft } from "d3-axis";
import { scaleLinear } from "d3";
import { extent } from "d3-array";
import getColor from "../config/color";
import * as d3 from "d3";
import { brushX } from "d3-brush";
import { format } from "d3-format";

function generateIntegerTicks(min, max) {
  const ticks = [];
  for (let i = Math.ceil(min); i <= max; i++) {
    if (Number.isInteger(i)) {
      ticks.push(i);
    }
  }
  return ticks;
}

function DepthChart({ data, onRangeSelected }) {
  const svgRef = useRef();
  const resetBrushRef = useRef(null);
  useEffect(() => {
    if (!data) return;

    let magData = [];

    data.features.forEach((feature) => {
      const mag = Math.round(feature.properties.mag * 10) / 10;
      const depth = feature.geometry.coordinates[2];
      if (depth > 0 ) {
        magData.push({ depth: depth, magnitude: mag });
      }
    });

    const svg = select(svgRef.current);
    const resetBrush = () => {
      svg.select(".brush").call(brush.move, null);
      onRangeSelected(null);
    };
    resetBrushRef.current = resetBrush;
    const depthExtent = extent(magData, (d) => d.depth);
    const margin = (depthExtent[1] - depthExtent[0]) * 0.003; // Calculate 5% margin
    const xScale = scaleLinear()
      .domain([depthExtent[0] - margin, depthExtent[1]]) // Add the margin to the minimum depth value
      .range([0, 420]);

    const yScale = scaleLinear()
      .domain([d3.min(magData, (d) => d.magnitude), d3.max(magData, (d) => d.magnitude)])
      .range([180, 0]);

    const xAxis = axisBottom(xScale);

    svg.select(".x-axis").style("transform", "translateY(180px)").call(xAxis);

    const yAxis = axisLeft(yScale).tickValues(
      generateIntegerTicks(yScale.domain()[0], yScale.domain()[1])
    );

    svg.select(".y-axis").style("transform", "translateX(0px)").call(yAxis);

    select(svgRef.current)
      .append("text")
      .attr("transform", `translate(${420 / 2},${210})`)
      .style("text-anchor", "middle")
      .text("Depth (KM)");

    const brush = brushX()
      .extent([
        [0, 0],
        [420, 180],
      ])
      .on("brush end", () => {
        if (d3Event.selection) {
          const [minX, maxX] = d3Event.selection;
          const selectedMinDepth = xScale.invert(minX);
          const selectedMaxDepth = xScale.invert(maxX);

          onRangeSelected([selectedMinDepth, selectedMaxDepth]);
        }
        else {
          onRangeSelected(null);
        }
      });

    select(svgRef.current).selectAll(".brush").remove();
    onRangeSelected(null);
    select(svgRef.current)
      .append("text")
      .attr("transform", `rotate(-90)`)
      .attr("x", -(180 / 2))
      .attr("y", -50)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Magnitude");

    svg
      .selectAll(".circle")
      .data(magData)
      .join("circle")
      .attr("class", "circle")
      .attr("cx", (d) => xScale(d.depth))
      .attr("cy", (d) => yScale(d.magnitude))
      .attr("r", 1)
      .attr("fill", (d) => getColor(d.magnitude));

    select(svgRef.current).append("g").attr("class", "brush").call(brush);
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
        <button className="button-style" onClick={resetBrushRef.current} style={{cursor:"pointer"}}>
          
          Reset
        </button>
      </div>
      <svg ref={svgRef} style={{ overflow: "visible", marginLeft: "10dvh" }}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </svg>
    </div>
  );
}

export default DepthChart;
