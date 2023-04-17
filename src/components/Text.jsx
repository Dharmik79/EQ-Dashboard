import React, { useState } from "react";
import "./Text.css";
function Text({ count, data, geo, setGeo,startDate,endDate }) {
  const [maxMag, setMaxMag] = useState(0);

  const hotzones = {};

  const recentEarthQuakes=data.sort((a,b)=>b.properties.time-a.properties.time)

  data.forEach((quake) => {
    const latitude = quake.geometry.coordinates[1].toFixed(1);
    const longitude = quake.geometry.coordinates[0].toFixed(1);
    const place = quake.properties.place;
    const key = `${latitude},${longitude}`;
    const magnitude = quake.properties.mag;
    if (magnitude > maxMag) {
      setMaxMag(magnitude);
    }
    if (hotzones[key]) {
      hotzones[key].count += 1;
    } else {
      hotzones[key] = {
        latitude,
        longitude,
        count: 1,
        place,
      };
    }
  });

  const dataArray = Object.values(hotzones);
  const sortedData = dataArray.sort((a, b) => b.count - a.count);
  const arrayData = sortedData.slice(0, 5);

  return (
    <div className="text">
      <div className="text-design">
        <p className="h2">
          WORLD'S <br></br>EARTHQUAKES{" "}
        </p>
        <span className="time-zones">Data Range : {startDate} to {endDate}</span>

        <div className="earthquakestats">
          <hr />
          <div className="statsdata">
            <div className="dataview">
              <span>{maxMag}</span>
              <span>Max Magnitude</span>
            </div>
            <div className="dataview">
              <span>{count}</span>
              <span>Total Count</span>
            </div>
          </div>
          <hr />
        </div>

        <div className="hot-zones">
          <p className="hot-zone-underline">HOT ZONES:</p>
          <ul>
            <li
              onClick={() => {
                arrayData[0] &&
                  setGeo({
                    lat: arrayData[0].latitude,
                    long: arrayData[0].longitude,
                  });
              }}
            >
              {arrayData[0] && arrayData[0].place}
            </li>
            <li
              onClick={() => {
                arrayData[1] &&
                  setGeo({
                    lat: arrayData[1].latitude,
                    long: arrayData[1].longitude,
                  });
              }}
            >
              {arrayData[1] && arrayData[1].place}
            </li>
            <li
              onClick={() => {
                arrayData[2] &&
                  setGeo({
                    lat: arrayData[2].latitude,
                    long: arrayData[2].longitude,
                  });
              }}
            >
              {arrayData[2] && arrayData[2].place}
            </li>
            <li
              onClick={() => {
                arrayData[3] &&
                  setGeo({
                    lat: arrayData[3].latitude,
                    long: arrayData[3].longitude,
                  });
              }}
            >
              {arrayData[3] && arrayData[3].place}
            </li>
            <li
              onClick={() => {
                arrayData[4] &&
                  setGeo({
                    lat: arrayData[4].latitude,
                    long: arrayData[4].longitude,
                  });
              }}
            >
              {arrayData[4] && arrayData[4].place}
            </li>
          </ul>
        </div>
        <div className="recent-earthquakes">
          <p className="recent-earthquake-underline">RECENT EARTHQUAKES:</p>
          <ul>
            <li
              onClick={() => {
                recentEarthQuakes[0] &&
                  setGeo({
                    lat: recentEarthQuakes[0].geometry.coordinates[1].toFixed(1),
                    long: recentEarthQuakes[0].geometry.coordinates[0].toFixed(1),
                  });
              }}
            >
              {recentEarthQuakes[0] && recentEarthQuakes[0].properties.place}
            </li>
            <li
              onClick={() => {
                recentEarthQuakes[1] &&
                  setGeo({
                    lat: recentEarthQuakes[1].geometry.coordinates[1].toFixed(1),
                    long: recentEarthQuakes[1].geometry.coordinates[0].toFixed(1),
                  });
              }}
            >
              {recentEarthQuakes[1] && recentEarthQuakes[1].properties.place}
            </li>
            <li
              onClick={() => {
                recentEarthQuakes[2] &&
                  setGeo({
                    lat: recentEarthQuakes[2].geometry.coordinates[1].toFixed(1),
                    long: recentEarthQuakes[2].geometry.coordinates[0].toFixed(1),
                  });
              }}
            >
              {recentEarthQuakes[2] && recentEarthQuakes[2].properties.place}
            </li>
            <li
              onClick={() => {
                recentEarthQuakes[3] &&
                  setGeo({
                    lat: recentEarthQuakes[3].geometry.coordinates[1].toFixed(1),
                    long: recentEarthQuakes[3].geometry.coordinates[0].toFixed(1),
                  });
              }}
            >
              {recentEarthQuakes[3] && recentEarthQuakes[3].properties.place}
            </li>
            <li
              onClick={() => {
                recentEarthQuakes[4] &&
                  setGeo({
                    lat: recentEarthQuakes[4].geometry.coordinates[1].toFixed(1),
                    long: recentEarthQuakes[4].geometry.coordinates[0].toFixed(1),
                  });
              }}
            >
              {arrayData[4] && arrayData[4].place}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Text;