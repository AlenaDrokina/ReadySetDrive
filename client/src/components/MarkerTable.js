import React from "react";
// import "./MarkerTable.css";

function MarkerTable(props) {
  return (
    <table className="MarkerTable-table">
      <thead>
        <tr>
          <th>Address</th>
          {/* <th>Formatted Address (from OpenCage)</th>
          <th>Latitude/Longitude</th> */}
        </tr>
      </thead>
      <tbody>
        {props.places.map((p) => (
          <tr key={p.name}>
            <td>{p.name}</td>
            {/* <td>{p.formatted_address}</td>
            <td>{p.latLng.join("/")}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MarkerTable;
