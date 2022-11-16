import React, { useState, useEffect } from "react";

import RoadtripForm from '../components/RoadtripForm';


function RoadtripView() {
  const [roadtrips, setRoadtrips] = useState();

//POST A NEW ROADTRIP (RoadtripForm.js)
async function addRoadtrip(formData){
  let options= {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData)
  };

  try {
  let response = await fetch("/roadtrips", options);
  if (response.ok) {
    let data = await response.json();   
    setRoadtrips(data);
  } else {
    console.log(`Server error: ${response.status} ${response.statusText}`);
  }
  } catch (err) {
  console.log(`Network error: ${err.message}`);
  }
}

  return (
      <div className="PastFormView">
        <div className="row mb-5">
            <RoadtripForm addRoadtripCb={formData => addRoadtrip(formData)}/>
          </div>
      </div>
  );
}


export default RoadtripView;
