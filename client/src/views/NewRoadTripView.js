import React from "react";
import RoadtripForm from '../components/RoadtripForm';
import "./NewRoadtripView.css";

function NewRoadTripView(props) {

  return (
    <div className="NewRoadTripView">
      <h1> Plan Your Next Adventure </h1>
      <div className="row mb-5">
          <RoadtripForm addRoadtripCb={formData => props.addRoadtripCb(formData)}/>
        </div>
    </div>
);
}


export default NewRoadTripView;
