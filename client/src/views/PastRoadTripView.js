import React, { useState, useEffect } from "react";
import RoadtripForm from "../components/RoadtripForm";
import "./PastRoadTripView.css";

function PastRoadTripView(props) {
  return (
    <div className="PastRoadTripView">
      <div className="centerbox" >
      <div className="headerbox" >
      <h1> Record A Roadtrip </h1>
      </div>
      </div>
      <div className="row mb-5">
        <RoadtripForm
          addRoadtripCb={(formData) => props.addRoadtripCb(formData)}
          user={props.user}
        />
      </div>
    </div>
  );
}

export default PastRoadTripView;
