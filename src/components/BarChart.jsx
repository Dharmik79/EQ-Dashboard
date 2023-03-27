import React, { useState, useEffect, useRef } from "react";
import "./BarChart.css";
import { select, event as d3Event } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleLinear, scaleBand } from "d3";
import { brushX } from "d3-brush";
import * as d3 from "d3";

function BarChart({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!data) {
      return;
    }

    const magData = {};

    data.features.forEach((feature) => {
      const magType = Math.round(feature.properties.mag * 10) / 10;
      if (magData[magType]) {
        magData[magType].count += 1;
      } else {
        magData[magType] = {
          count: 1,
        };
      }
    });

    const sortedData = Object.keys(magData).map((mag) => ({
      mag: parseFloat(mag),
      count: magData[mag].count,
    }));
    const magArray = sortedData.sort((a, b) => a.mag - b.mag);
    

    const uniqueMagnitudes = magArray.length;
    const barWidth = 300 / uniqueMagnitudes - 1;
    const x = scaleBand()
      .domain(magArray.map((d) => d.mag))
      .range([0, 300])
      .paddingInner(0.1);

    const y = scaleLinear()
      .domain([0, d3.max(magArray, (d) => d.count)])
      .range([150, 0]);

    const integerTickValues = magArray
      .map((d) => d.mag)
      .filter((mag) => Number.isInteger(mag));

    const xAxis = axisBottom(x).tickValues(integerTickValues);
    const yAxis = axisLeft(y);

    select(svgRef.current)
      .select(".x-axis")
      .style("transform", "translateY(150px)")
      .call(xAxis);

    select(svgRef.current)
      .select(".y-axis")
      .style("transform", "translateX(0px)")
      .call(yAxis);

      const brush = brushX()
      .extent([
        [0, 0],
        [300, 150],
      ])
      .on("brush end", () => {
        if (d3Event.selection) {
          const [minX, maxX] = d3Event.selection;
          console.log("Brushed:", minX, maxX);
          
        }
      });

    const getColor = (mag) => {
      if (mag >= -2 && mag < -1) return "white";
      if (mag >= -1 && mag < 0) return "blue";
      if (mag >= 0 && mag < 1) return "black";
      if (mag >= 1 && mag < 2) return "steelblue";
      if (mag >= 2 && mag < 3) return "pink";
      if (mag >= 3 && mag < 4) return "yellow";
      if (mag >= 4 && mag < 5) return "orange";
      if (mag >= 5 && mag < 6) return "red";
      return "gray";
    };
    const svg = select(svgRef.current);
    svg
      .selectAll(".bar")
      .data(magArray)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.mag))
      .attr("y", (d) => y(d.count))
      .attr("width", barWidth)
      .attr("height", (d) => 150 - y(d.count))
      .attr("fill", (d) => getColor(d.mag))
      .on("click", (d) => {
        console.log("d", d);
      });

      select(svgRef.current).append("g").attr("class", "brush").call(brush)
  }, [data]);

  return (
    <div className="barview">
      <p>Earthquake Magnitude Histogram</p>
      <svg ref={svgRef} style={{ overflow: "visible" }}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </svg>
    </div>
  );
}

export default BarChart;