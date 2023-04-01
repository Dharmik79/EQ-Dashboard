import React, { useState, useEffect } from "react";
import "./App.css";

import Text from "./components/Text";
import Map from "./components/Map";
import BarChart from "./components/BarChart";
import TimeLine from "./components/TimeLine";
import DepthChart from "./components/DepthChart";
import commonApi from "./api/common";

function App() {
  const [data, setData] = useState(null);
  const [startDate, setStartDate] = useState("2022-01-01");
  const [endDate, setEndDate] = useState("2022-01-31");
  const [count, setCount] = useState();
  const [selectedRange, setSelectedRange] = useState(null);

  const [geo, setGeo] = useState(null);
  const [year,setYear]=useState("2022")
  const getData = async () => {
    let resultData = await commonApi({
      action: "getData",
      parameters: [{ startDate: startDate, endDate: endDate }],
    });
    setData(resultData);
    let resultCount = await commonApi({
      action: "getCount",
      parameters: [{ startDate: startDate, endDate: endDate }],
    });
    setCount(resultCount);
  };

  useEffect(() => {
    getData();
  }, [startDate, endDate]);

  return (
    <div className="dashboard">
      <div className="row1">
        <div className="text-container">
          <Text
            count={count}
            data={data ? data.features : []}
            geo={geo}
            setGeo={setGeo}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div className="map-container">
          <Map
            data={data}
            selectedRange={selectedRange}
            geo={geo}
            setGeo={setGeo}
          />
          <div className="row2">
            <div className="bar-chart">
              <BarChart data={data} onRangeSelected={setSelectedRange} />
            </div>
            <div className="depth-chart">
              <DepthChart data={data}/>
            </div>
          </div>
        </div>
      </div>
      <div className="row3">
        <div className="time-container">
          <TimeLine
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setSelectedRange={setSelectedRange}
            year={year}
            setYear={setYear}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
