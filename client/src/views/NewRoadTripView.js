import React from "react";
import RoadtripForm from '../components/RoadtripForm';
import "./NewRoadtripView.css";

function NewRoadTripView(props) {

  return (
    <div className="NewRoadTripView">
       <div className="centerbox" >
      <div className="headerbox" >
      <h1> Plan Your Next Adventure </h1>
      </div>
      </div>
      <div className="row mb-5">
          <RoadtripForm addRoadtripCb={formData => props.addRoadtripCb(formData)} user={props.user}/>
        </div>
    </div>
);
}


export default NewRoadTripView;
