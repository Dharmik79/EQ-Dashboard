import React, { useState } from "react";
import "./Text.css";
function Text({ count, data, geo, setGeo, startDate, endDate }) {
  const [maxMag, setMaxMag] = useState(0);

  const hotzones = {};

  const recentEarthQuakes = data.sort(
    (a, b) => b.properties.time - a.properties.time
  ).slice(0,5)

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
        <span className="time-zones">
          Data Range : {startDate} to {endDate}
        </span>

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
            {arrayData.map((item,index) => (
            
              <li
              key={index}
                onClick={() => {
                  setGeo({
                    lat: item.latitude,
                    long: item.longitude,
                  });
                }}
              >
                {item.place}
              </li>
            ))}
          </ul>
        </div>
        <div className="recent-earthquakes">
          <p className="recent-earthquake-underline">RECENT EARTHQUAKES:</p>
          <ul>
          {recentEarthQuakes.map((item,index)=>(
            <li
            key={index}
            onClick={() => {
             
                setGeo({
                  lat: item.geometry.coordinates[1].toFixed(
                    1
                  ),
                  long: item.geometry.coordinates[0].toFixed(
                    1
                  ),
                });
            }}
          >
            {item.properties.place}
          </li>
          ))}
           
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Text;
