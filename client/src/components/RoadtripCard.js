import React from "react";
import "./RoadtripCard.css";

function RoadtripCard(props) {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card">
        <img
          className="card-img-top"
          src={props.roadtripData.image_url}
          alt="roadtrip"
        />
        <div className="card-body">
          <h5 className="card-title">{props.roadtripData.title}</h5>
          <h6 className="card-text">{props.roadtripData.countries}</h6>
          <p className="card-text">{props.roadtripData.description}</p>
        </div>
      </div>
    </div>
  );
}

export default RoadtripCard;
