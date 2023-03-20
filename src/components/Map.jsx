import React, { useRef, useEffect } from "react";
import "./Map.css";
import data from "../custom.json";
import { select, geoPath, geoMercator } from "d3";

function Map() {
  const svgRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
   
   const {width,height}= wrapperRef.current.getBoundingClientRect();


// Projects the geo-coordinates on a 2D plane
const projection = geoMercator().fitSize([width,height],data)

    // Takes the gro json data and converts to attribute of d3 for a path of the svg element
    const pathGenerator = geoPath().projection(projection);
   
    svg
      .selectAll(".country")
      .data(data.features)
      .join("path")
      .attr("class", "country").attr("d",feature=>pathGenerator(feature));
  },[]);

  return (
    <div className="map">
    <div ref={wrapperRef}>
      <svg ref={svgRef} width="100%" height="100%"></svg>
    </div>
    </div>
  );
}

export default Map;
