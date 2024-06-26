import React, { useRef, useState, useEffect } from "react";
import {
  Map as MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useSupercluster from "use-supercluster";
import "./Map.css";
const eqIcon = new L.Icon({
  iconUrl: "./earthquake.svg",
  iconSize: [20, 20],
});

const icons = {};
const fetchIcon = (count, size) => {
  if (!icons[count]) {
    icons[count] = L.divIcon({
      html: `<div class="cluster-marker" style="width: ${size}px; height: ${size}px;">
        ${count}
      </div>`,
    });
  }
  return icons[count];
};
const worldBounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));

function Map({ data, geo, setGeo, selectedRange, selectedDepthRange }) {
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(5); // set the default zoom level
  const mapRef = useRef(); // adding reference to the leaflet map

  function updateMap() {
    const leaflet = mapRef.current.leafletElement;
    const b = leaflet.getBounds();
    const currentZoom = leaflet.getZoom();

    // Set bounds state
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);

    // Check if current zoom is less than 3 and update if necessary
    if (currentZoom < 2) {
      leaflet.setZoom(2);
      setZoom(2);
    } else {
      setZoom(currentZoom);
    }
    //  setGeo(null)
  }

  useEffect(() => {
    updateMap();
  }, []);

  const { clusters, supercluster } = useSupercluster({
    points: data
      ? data.features.filter((feature) =>
          selectedRange && selectedDepthRange
            ? feature.properties.mag >= selectedRange[0] &&
              feature.properties.mag <= selectedRange[1] &&
              feature.geometry.coordinates[2] >= selectedDepthRange[0] &&
              feature.geometry.coordinates[2] <= selectedDepthRange[1]
            : selectedRange && !selectedDepthRange
            ? feature.properties.mag >= selectedRange[0] &&
              feature.properties.mag <= selectedRange[1]
            : !selectedRange && selectedDepthRange
            ? feature.geometry.coordinates[2] >= selectedDepthRange[0] &&
              feature.geometry.coordinates[2] <= selectedDepthRange[1]
            : true
        )
      : [],
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 17, minZoom: 3 },
  });

  return (
    <div className="map" style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={geo ? [geo.lat, geo.long] : [39.2532498, 43.6487262]}
        zoom={geo ? 10 : 2}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
        minZoom={2} // Set the minimum zoom level
        maxZoom={17} // Set the maximum zoom level
        onMoveEnd={updateMap}
        maxBounds={worldBounds}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          // Checking if the cluster are present or not
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          // we have a cluster to render
          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                position={[latitude, longitude]}
                icon={fetchIcon(pointCount, 10 + pointCount / clusters.length)}
                onClick={() => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    17
                  );
                  const leaflet = mapRef.current.leafletElement;
                  leaflet.setView([latitude, longitude], expansionZoom, {
                    animate: true,
                  });
                }}
              >
              <Popup>{`Latitude: ${latitude}, Longitude: ${longitude}`}</Popup> 
              </Marker>
            );
          }
          return (
            <Marker
              key={cluster.id}
              position={[latitude, longitude]}
              icon={eqIcon}
              onClick={() => {
                const leaflet = mapRef.current.leafletElement;
                leaflet.setView([latitude, longitude], 15, { animate: true });
              }}
            >
              <Tooltip>
                <div className="tool-tip">
                  <div>Latitude: {latitude}</div>
                  <div>Longitude: {longitude}</div>
                  <div>Place: {cluster.properties.place}</div>
                  <div>Magnitude: {cluster.properties.mag}</div>
                  <div>Depth: {cluster.geometry.coordinates[2]} km</div>
                </div>
              </Tooltip>
              {/* <Popup>{`Latitude: ${latitude}, Longitude: ${longitude}`}</Popup> */}
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
