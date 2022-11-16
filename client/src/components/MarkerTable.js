import React, { useState } from "react";
// import "./MarkerTable.css";

function MarkerTable(props) {

  return (
    <table className="MarkerTable-table">
      <thead>
        <tr>
          <th>Stops</th>
          {/* <th>Formatted Address (from OpenCage)</th>
          <th>Latitude/Longitude</th> */}
        </tr>
      </thead>
      <tbody>
        {props.places.map((p, ix) => (
          <tr key={p.title}>
            <td>{p.name}</td>
            <td> - </td>
            <td>{p.title}</td>
            {/* <td>{p.formatted_address}</td>
            <td>{p.latLng.join("/")}</td> */}
            {/* <td> <button type="button" onClick={e => props.delStop('stops-' + ix)}>del</button> </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MarkerTable;
