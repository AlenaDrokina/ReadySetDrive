import React, { useState, useEffect } from "react";
import RoadtripForm from '../components/RoadtripForm';


function PastRoadTripView(props) {


  return (
      <div className="PastFormView">
        <h1> Plan Your Next Adventure </h1>
        <div className="row mb-5">
            <RoadtripForm addRoadtripCb={formData => props.addRoadtripCb(formData)}/>
          </div>
      </div>
  );
}


export default PastRoadTripView;
