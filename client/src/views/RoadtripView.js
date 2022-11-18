import React, { useState, useEffect } from "react";

import RoadtripForm from '../components/RoadtripForm';


function RoadtripView(props) {


  return (
      <div className="PastFormView">
        <div className="row mb-5">
            <RoadtripForm addRoadtripCb={formData => props.addRoadtripCb(formData)}/>
          </div>
      </div>
  );
}


export default RoadtripView;
