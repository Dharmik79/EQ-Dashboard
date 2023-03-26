import React, { useRef, useState,useEffect } from "react";
import { Map as MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const eqIcon = new L.Icon({
  iconUrl: "/public/earthquake.svg",
  iconSize: [20, 20]
});

const icons = {};
const fetchIcon = (count, size) => {
  if (!icons[count]) {
    icons[count] = L.divIcon({
      html: `<div class="cluster-marker" style="width: ${size}px; height: ${size}px;">
        ${count}
      </div>`
    });
  }
  return icons[count];
};


function Map({ data }) {

  const [bounds, setBounds] = useState(null); 
  const [zoom, setZoom] = useState(13); // set the default zoom level
  const mapRef = useRef(); // adding reference to the leaflet map

  function updateMap() {
    const b = mapRef.current.leafletElement.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat
    ]);
    setZoom(mapRef.current.leafletElement.getZoom());
  }

  useEffect(() => {
    updateMap();
  }, []);
  return (
    <div className="map" style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[52.6376, -1.135171]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
      </MapContainer>
    </div>
  );
}

export default Map;
