import React from "react";
import RoadtripCard from "../components/RoadtripCard";

function Homeview(props) {
  return (
    <div className="Homeview">
      <h1>Hello world! I'm coming in a minute...</h1>
      {props.roadtripData.map((element) => {
        return <RoadtripCard key={element.id} roadtripData={element} />;
      })}
      {/* {props.roadtripData && } */}
      {/* {console.log(props.roadtripData)} */}
    </div>
  );
}

export default Homeview;
