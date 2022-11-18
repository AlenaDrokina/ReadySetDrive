import React from "react";
import RoadtripForm from '../components/RoadtripForm';

function NewRoadTripView(props) {

  return (
    <div className="NewRoadTripView">
      <h1> Record A Roadtrip </h1>
      <div className="row mb-5">
          <RoadtripForm addRoadtripCb={formData => props.addRoadtripCb(formData)}/>
        </div>
    </div>
);
}


export default NewRoadTripView;
