import React, { useState } from "react";
import "./MarkerTable.css";

function MarkerTable(props) {
  async function deleteStop(id) {
    let options = {
      method: "DELETE",
    };

    try {
      let response = await fetch(`/stops/${id}/`, options);
      if (response.ok) {
        props.updateStopsCb();
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  return (
    <div className="MarkerTable">
      <h2> Destinations </h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Stop</th>
            <th>Location</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.places.map((p) => (
            <tr key={p.id}>
              <td className="title">{p.title}</td>
              <td className="address">{p.address}</td>
              <td>
                {" "}
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => deleteStop(p.id)}
                >
                  X
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MarkerTable;
