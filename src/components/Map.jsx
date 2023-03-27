import React, { useRef, useState,useEffect } from "react";
import { Map as MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useSupercluster from "use-supercluster";
import "./Map.css"
const eqIcon = new L.Icon({
  iconUrl: "/earthquake.svg",
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
  const [zoom, setZoom] = useState(5); // set the default zoom level
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

  const { clusters, supercluster } = useSupercluster({
   points: data? data.features :[],
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 17 }
  });

  return (
    <div className="map" style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[46.58, 80.08]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
        onMoveEnd={updateMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {clusters.map(cluster => {

          const [longitude, latitude] = cluster.geometry.coordinates;
          // Checking if the cluster are present or not
          const {
            cluster: isCluster,
            point_count: pointCount
          } = cluster.properties;

            // we have a cluster to render
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              icon={fetchIcon(
                pointCount,
                10 + (pointCount / clusters.length)
              )}
              onClick={() => {
                const expansionZoom = Math.min(
                  supercluster.getClusterExpansionZoom(cluster.id),
                  17
                );
                const leaflet = mapRef.current.leafletElement;
                leaflet.setView([latitude, longitude], expansionZoom, {
                  animate: true
                });
              }}
            />
          );
        }
          return (
            <Marker
              key={cluster.id}
              position={[latitude, longitude]}
              icon={eqIcon}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
