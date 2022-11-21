import React, { useState, useEffect } from "react";
import RoadtripForm from "../components/RoadtripForm";
import "./PastRoadTripView.css";

function PastRoadTripView(props) {
  return (
    <div className="PastRoadTripView">
      <h1> Record A Roadtrip </h1>
      <div className="row mb-5">
        <RoadtripForm
          addRoadtripCb={(formData) => props.addRoadtripCb(formData)}
        />
      </div>
    </div>
  );
}

export default PastRoadTripView;
