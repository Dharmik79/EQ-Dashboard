import React, { useRef, useEffect } from "react";
import "./Map.css";
import mapData from "../custom.json";
import { select, geoPath, geoMercator, transition, zoom } from "d3";
import commonApi from "../api/common";
import * as d3 from 'd3';

function Map({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    const { width, height } = wrapperRef.current.getBoundingClientRect();

    // Projects the geo-coordinates on a 2D plane
    const projection = geoMercator().fitSize([width, height], mapData);

    // Takes the gro json data and converts to attribute of d3 for a path of the svg element
    const pathGenerator = geoPath().projection(projection);

    function handleZoom() {

      d3.select(svgRef.current).transition().attr("transform", d3.event.transform);

  }

    svg
      .selectAll(".country")
      .data(mapData.features)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", (feature) => pathGenerator(feature))
      .attr("fill", "white")
      .style("stroke", "black")

    data &&
      svg
        .selectAll(".circle")
        .data(data.features)
        .enter()
        .append("circle")
        .attr("class", "circle")
        .attr("r", function(d) {
          return Math.sqrt(d.properties.mag);
        })
        .attr("cx", function(d) {
          return projection(d.geometry.coordinates)[0];
        })
        .attr("cy", function(d) {
          return projection(d.geometry.coordinates)[1];
        })
        .attr("fill", "blue");

        svg.call(zoom)
  }, [data]);

  return (
    <div className="map">
      <div
        ref={wrapperRef}
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        {/* <svg ref={svgRef} width="100%" height="100%"></svg> */}
        <svg ref={svgRef} width="1000" height="600"></svg>
      </div>
    </div>
  );
}

export default Map;
