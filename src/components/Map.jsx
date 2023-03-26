import React, { useEffect, useState } from "react";
import { Map as MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import Supercluster from "supercluster";

function Map({ data }) {
  const [clusters, setClusters] = useState([]);

  // useEffect(() => {
  //   if (!data) return;

  //   const index = new Supercluster({
  //     radius: 40,
  //     maxZoom: 16,
  //   });

  //   index.load(
  //     data.features.map((feature) => ({
  //       type: "Feature",
  //       properties: feature.properties,
  //       geometry: { type: "Point", coordinates: feature.geometry.coordinates },
  //     }))
  //   );

  //   const bounds = [
  //     [-180, 85],
  //     [180, -85],
  //   ];

  //   const newClusters = index.getClusters(bounds, 1);
  //   setClusters(newClusters);
  // }, [data]);

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
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount,
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                position={[latitude, longitude]}
              >
                <Popup>
                  <div>Cluster with {pointCount} points</div>
                </Popup>
              </Marker>
            );
          }

          return (
            <Marker
              key={cluster.properties.id}
              position={[latitude, longitude]}
            >
              <Popup>
                <div>{cluster.properties.place}</div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
