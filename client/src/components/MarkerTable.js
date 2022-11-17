import React, { useState } from "react";
// import "./MarkerTable.css";

function MarkerTable(props) {


//   async function deleteStop(id) {
//     let response = await Api.deleteStop(id)

//     if (response.ok) {
//       setPlaces(response.data);
//     } else {
//       console.log(`Server error: ${response.status} ${response.statusText}`);
//     }
// }

async function deleteStop(id) {
  let options = {
    method: "DELETE",
  };
  try {
    let response = await fetch(`/stops/${id}`, options);
    if (response.ok) {
      //props.updateMarkerCb();
      props.updateStopsCb();
    } else {
      console.log(`Server error: ${response.status} ${response.statusText}`);
    }
  } catch (err) {
    console.log(`Server error: ${err.message}`);
  }
}


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
            <td> <button type="button" onClick={() => deleteStop(p.id)}>delete</button> </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default MarkerTable;
