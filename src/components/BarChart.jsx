import React, { useState, useEffect, useRef } from "react";
import "./BarChart.css";
import { select } from "d3-selection";
import { line } from "d3-shape";
import { axisBottom, axisLeft } from "d3-axis";
import { scaleLinear, scaleBand } from "d3";
function BarChart() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);

  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0]);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((index) => index + 1);

    svg
      .select(".x-axis")
      .style("transform", "translateY(150px)")
      .call(xAxis);

    const yAxis = axisLeft(yScale);

    svg
      .select(".y-axis")
      .style("transform", "translateX(0px)")
      .call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("fill", "red")
      .attr("x", (value, index) => xScale(index))
      .attr("y", yScale)
      .attr("width", xScale.bandwidth())
      .attr("height", (value) => 150 - yScale(value));

      
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
