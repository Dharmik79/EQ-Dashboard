import React, { useState, useEffect, useRef } from "react";
import "./DepthChart.css";
import { select } from "d3-selection";
import { line } from "d3-shape";
function DepthChart() {
  const [data, setData] = useState([25, 30, 45, 60, 20,65,75]);

  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    const myLine = line()
      .x((value, index) => index * 50)
      .y((value) => value);

    svg
      .selectAll("path")
      .data([data])
      .join("path")
      .attr("d", (value) => myLine(value)).
      attr("fill","none").
      attr("stroke","blue")
  }, [data]);
  return (
    <div className="depthview">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default DepthChart;
