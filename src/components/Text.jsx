import React from "react";
import "./Text.css";
function Text() {
  return (
    <div className="text">
      <div className="text-design">
        <p className="h2">
          WORLD'S <br></br>EARTHQUAKES{" "}
        </p>
        <span className="hot-zones">Data as 4 PM(PST), March 20, 2023</span>
        
        <div className="earthquakestats">
          <hr/>
          <div className="statsdata">
            <div className="dataview">
              <span>7.8</span>
              <span>Max Magnitude</span>
            </div>
            <div className="dataview">
              <span>1560310</span>
              <span>Total Count</span>
            </div>
          </div>
          <hr />
        </div>

        <div className="hot-zones">
          <p>HOT ZONES:</p>
          <ul>
            <li>China </li>
            <li>Turkey</li>
            <li>Ukraine</li>
            <li>Pakistan</li>
            <li>Australia</li>
          </ul>
        </div>
        
      </div>
    </div>
  );
}

export default Text;
