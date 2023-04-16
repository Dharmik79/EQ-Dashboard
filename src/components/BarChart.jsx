import React, { useState, useEffect, useRef } from "react";
import "./BarChart.css";
import { select, event as d3Event } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleLinear, scaleBand } from "d3";
import { brushX } from "d3-brush";
import * as d3 from "d3";
import getColor from "../config/color";
function BarChart({ data, onRangeSelected }) {
  const svgRef = useRef();
  const resetBrushRef = useRef(null);
  const width=420
  const height=180
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
      .range([0, width])
      .paddingInner(0.1);

    const y = scaleLinear()
      .domain([0, d3.max(magArray, (d) => d.count)])
      .range([height, 0]);

    const integerTickValues = magArray
      .map((d) => d.mag)
      .filter((mag) => Number.isInteger(mag));

    const xAxis = axisBottom(x).tickValues(integerTickValues);
    const yAxis = axisLeft(y);

    select(svgRef.current)
      .select(".x-axis")
      .style("transform", "translateY(180px)")
      .call(xAxis);

    select(svgRef.current)
      .select(".y-axis")
      .style("transform", "translateX(0px)")
      .call(yAxis);
    const getNearestMagnitude = (xCoord) => {
      const index = Math.round((xCoord * uniqueMagnitudes) / width);
      return magArray[index] ? magArray[index].mag : null;
    };
    const brush = brushX()
      .extent([
        [0, 0],
        [width, height],
      ])
      .on("brush end", () => {
        if (d3Event.selection) {
          const [minX, maxX] = d3Event.selection;
          const selectedMinMag = getNearestMagnitude(minX);
          let selectedMaxMag = getNearestMagnitude(maxX);

          if (selectedMaxMag == null) {
            selectedMaxMag = 10;
          }
          onRangeSelected([selectedMinMag, selectedMaxMag]);
        } else {
          onRangeSelected(null);
        }
      });
    select(svgRef.current)
      .append("text")
      .attr("transform", `translate(${width / 2},${210})`)
      .style("text-anchor", "middle")
      .text("Magnitude");

    select(svgRef.current)
      .append("text")
      .attr("transform", `rotate(-90)`)
      .attr("x", -(height / 2))
      .attr("y", -50)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Total Count");

    select(svgRef.current).selectAll(".brush").remove();
    onRangeSelected(null);
    const svg = select(svgRef.current);
    const resetBrush = () => {
      svg.select(".brush").call(brush.move, null);
      onRangeSelected(null);
    };
    resetBrushRef.current = resetBrush;
    svg
      .selectAll(".bar")
      .data(magArray)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.mag))
      .attr("y", (d) => y(d.count))
      .attr("width", barWidth)
      .attr("height", (d) => height - y(d.count))
      .attr("fill", (d) => getColor(d.mag))
      .on("click", (d) => {
        console.log("d", d);
      });

    select(svgRef.current).append("g").attr("class", "brush").call(brush);
  }, [data]);

  return (
    <div className="barview">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="bar-chart-name">Earthquake Magnitude Histogram</p>
        <button
          className="button-style"
          onClick={resetBrushRef.current}
          style={{ cursor: "pointer" }}
        >
          Reset
        </button>
      </div>
      <svg ref={svgRef} style={{ overflow: "visible", marginLeft: "12dvh" }}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </svg>
    </div>
  );
}

export default BarChart;
