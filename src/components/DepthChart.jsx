import React, { useState, useEffect, useRef } from "react";
import "./DepthChart.css";
import { select } from "d3-selection";
import { line } from "d3-shape";
import { axisBottom } from "d3-axis";
import { scaleLinear } from "d3";
function DepthChart() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const xScale = scaleLinear()
    .domain([0, data.length - 1])
    .range([0, 300]);

  const yScale=scaleLinear().domain([0,75]).range([150,0])
  const svgRef = useRef();
  const xAxis = axisBottom();

  useEffect(() => {
    const svg = select(svgRef.current);

    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale);

    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);
  return (
    <div className="depthview">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default DepthChart;
