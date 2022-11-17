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
        {props.places.map((p) => (
          <tr key={p.id}>
            <td>{p.title}</td>
            <td>{p.address}</td>
            <td> <button type="button" onClick={e => props.deleteStopCb(p.id)}>delete</button> </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default MarkerTable;
