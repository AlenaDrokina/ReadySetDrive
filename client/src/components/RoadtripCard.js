import React from "react";

function RoadtripCard(props) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div>{props.roadtripData.title}</div>
      <div>{props.roadtripData.countries}</div>
      <div>{props.roadtripData.description}</div>
    </div>
  );
}

export default RoadtripCard;
