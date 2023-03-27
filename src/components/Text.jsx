import React,{useState} from "react";
import "./Text.css";
function Text({count,data}) {

const [maxMag,setMaxMag]=useState(0)


  data.forEach((quake) => {
    const magnitude = quake.properties.mag;
    if (magnitude > maxMag) {
      setMaxMag(magnitude);
    }
  });
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
