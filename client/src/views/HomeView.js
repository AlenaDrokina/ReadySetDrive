import React from "react";
import RoadtripCard from "../components/RoadtripCard";
// import "./HomeView.css";
import SearchBar from "../components/SearchBar";

function Homeview(props) {
  return (
    <div className="Homeview">
      <SearchBar />

      <div className="container">
        <div className="row">
          {props.roadtripData.map((element) => {
            return (
              <RoadtripCard
                key={element.id}
                roadtripData={element}
                handleLikedCb={props.handleLikedCb}
                makeFav={props.makeFav}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Homeview;
