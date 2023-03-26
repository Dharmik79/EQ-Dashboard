import React, { } from "react";
import { Map as MapContainer, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";


function Map({ data }) {
  return (
    <div className="map" style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={1}
        style={{ height: "100%", width: "100%" }}
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
