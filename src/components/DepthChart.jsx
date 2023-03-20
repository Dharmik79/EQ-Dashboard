import React, { useState, useEffect, useRef } from "react";
import "./DepthChart.css";
import { select } from "d3-selection";
import { line } from "d3-shape";
import { axisBottom ,axisLeft} from "d3-axis";
import { scaleLinear } from "d3";
function DepthChart() {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);

  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);

    const yScale = scaleLinear()
      .domain([0, 75])
      .range([150, 0]);
  
    const xAxis = axisBottom(xScale).ticks(data.length).tickFormat(index=>index+1);

    svg.select(".x-axis").style("transform","translateY(150px)").call(xAxis)

    const yAxis = axisLeft(yScale);

    svg.select(".y-axis").style("transform","translateX(0px)").call(yAxis)
    const myLine = line()
    .x((value, index) => xScale(index))
    .y(yScale);
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class","line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "blue");


  }, [data]);
  return (
    <div className="depthview">
      <svg ref={svgRef} style={{ overflow: "visible"}}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </svg>
    </div>
  );
}

export default DepthChart;
