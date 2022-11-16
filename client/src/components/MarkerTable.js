import React, { useState } from "react";
// import "./MarkerTable.css";

function MarkerTable(props) {

  return (
    <div> 
    <h2> Destinations </h2>
    <table className="table">
      <thead>
        <tr>
          <th>Stop</th>
          <th>Location</th>
          {/* <th>Formatted Address (from OpenCage)</th>
          <th>Latitude/Longitude</th> */}
        </tr>
      </thead>
      <tbody>
        {props.places.map((p, ix) => (
          <tr key={p.title}>
            <td>{p.name}</td>
            <td>{p.title}</td>
            {/* <td>{p.formatted_address}</td>
            <td>{p.latLng.join("/")}</td> */}
            <td> <button type="button" onClick={e => props.delStop('stops-' + ix)}>delete</button> </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default MarkerTable;
