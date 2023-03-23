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
  const [startDate, setStartDate] = useState("2021-01-01");
  const [endDate, setEndDate] = useState("2021-01-02");
  const getData = async () => {
    let result = await commonApi({
      action: "getData",
      parameters: [{ startDate: startDate, endDate: endDate }],
    });
    setData(result);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="dashboard">
      <div className="row1">
        <Text />
        <Map data={data} />
      </div>
      <div className="row2">
        <BarChart />
        <DepthChart />
      </div>
      <div className="row3">
        <TimeLine />
      </div>
    </div>
  );
}

export default App;
