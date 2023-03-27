import React, { useState, useEffect } from "react";
import "./App.css";

import Text from "./components/Text";
import Map from "./components/Map";
import BarChart from "./components/BarChart";
import TimeLine from "./components/TimeLine";
import DepthChart from "./components/DepthChart";
import commonApi from "./api/common";

function App() {
  const [data, setData] = useState(data);
  const [startDate, setStartDate] = useState("2022-01-01");
  const [endDate, setEndDate] = useState("2022-01-31");
  const [count, setCount] = useState();
  const [selectedRange, setSelectedRange] = useState(null);


  const [geo,setGeo]=useState(null)
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
        <Text count={count} data={data ? data.features : []} geo={geo} setGeo={setGeo}/>
        <Map data={data} selectedRange={selectedRange} geo={geo} setGeo={setGeo}/>
      </div>
      <div className="row2">
      <BarChart data={data} onRangeSelected={setSelectedRange}/>
        <DepthChart />
      </div>
      <div className="row3">
        <TimeLine
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </div>
    </div>
  );
}

export default App;