import React, { useState } from "react";
import "./Text.css";
function Text({ count, data }) {
  const [maxMag, setMaxMag] = useState(0);

  const hotzones = {};

  data.forEach((quake) => {
    const latitude = quake.geometry.coordinates[1].toFixed(1);
    const longitude = quake.geometry.coordinates[0].toFixed(1);
const place=quake.properties.place
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
        place
      };
    }
  });

  const dataArray = Object.values(hotzones);
   const sortedData = dataArray.sort((a, b) => b.count - a.count);
const arrayData=sortedData.slice(0,5)


  return (
    <div className="text">
      <div className="text-design">
        <p className="h2">
          WORLD'S <br></br>EARTHQUAKES{" "}
        </p>
        <span className="hot-zones">Data as 4 PM(PST), March 20, 2023</span>

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
          <p>HOT ZONES:</p>
          <ul>
           <li>{arrayData[0]&& arrayData[0].place}</li>
           <li>{arrayData[1]&& arrayData[1].place}</li>
           <li>{arrayData[2]&& arrayData[2].place}</li>
           <li>{arrayData[3]&& arrayData[3].place}</li>
           <li>{arrayData[4]&& arrayData[4].place}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Text;

// import React, { useState } from "react";

// const Table = () => {
//   const [data, setData] = useState([
//     { id: 1, name: "John Doe", email: "johndoe@example.com" },
//     { id: 2, name: "Jane Doe", email: "janedoe@example.com" },
//     { id: 3, name: "Bob Smith", email: "bobsmith@example.com" },
//     { id: 4, name: "John Doe", email: "johndoe@example.com" },
//     { id: 5, name: "Jane Doe", email: "janedoe@example.com" },
//     { id: 6, name: "Bob Smith", email: "bobsmith@example.com" },
//     { id: 7, name: "John Doe", email: "johndoe@example.com" },
//     { id: 8, name: "Jane Doe", email: "janedoe@example.com" },
//     { id: 9, name: "Bob Smith", email: "bobsmith@example.com" },
//     { id: 10, name: "Bob Smith", email: "bobsmith@example.com" },
//     { id: 11, name: "John Doe", email: "johndoe@example.com" },
//     { id: 12, name: "Jane Doe", email: "janedoe@example.com" },
//     { id: 13, name: "Bob Smith", email: "bobsmith@example.com" },
//     { id: 10, name: "Bob Smith", email: "bobsmith@example.com" },
//     { id: 11, name: "John Doe", email: "johndoe@example.com" },
//     { id: 12, name: "Jane Doe", email: "janedoe@example.com" },
//     { id: 13, name: "Bob Smith", email: "bobsmith@example.com" },
//   ]);

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Name</th>
//           <th>Email</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item) => (
//           <tr key={item.id}>
//             <td>{item.id}</td>
//             <td>{item.name}</td>
//             <td>{item.email}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default Table;
