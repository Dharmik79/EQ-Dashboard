import React, { useRef, useEffect } from "react";
import "./Map.css";
import mapData from "../custom.json";
import { select, geoPath, geoMercator, zoom as d3Zoom, event as d3Event } from "d3";

function Map({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();
    const { width, height } = wrapperRef.current.getBoundingClientRect();

    const projection = geoMercator().fitSize([width, height], mapData);
    const pathGenerator = geoPath().projection(projection);

    const handleZoom = () => {
      mapGroup.attr("transform", d3Event.transform);
      circleGroup.attr("transform", d3Event.transform);
    };

    const zoom = d3Zoom().on("zoom", handleZoom);

    // Create separate group elements for map and circles
    const mapGroup = svg.append("g");
    const circleGroup = svg.append("g");

    mapGroup
      .selectAll(".country")
      .data(mapData.features)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", (feature) => pathGenerator(feature))
      .attr("fill", "white")
      .style("stroke", "black");

    data &&
      circleGroup
        .selectAll(".circle")
        .data(data.features)
        .enter()
        .append("circle")
        .attr("class", "circle")
        .attr("r", (d) => Math.sqrt(d.properties.mag))
        .attr("cx", (d) => projection(d.geometry.coordinates)[0])
        .attr("cy", (d) => projection(d.geometry.coordinates)[1])
        .attr("fill", "blue");

    svg.call(zoom); // Apply the zoom behavior to the entire SVG
  }, [data]);

  return (
    <div className="map">
      <div
        ref={wrapperRef}
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <svg ref={svgRef} width="1000" height="600"></svg>
      </div>
    </div>
  );
}

export default Map;
