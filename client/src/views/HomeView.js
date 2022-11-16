import React from "react";
import RoadtripCard from "../components/RoadtripCard";
import "./HomeView.css";

function Homeview(props) {
  return (
    <div className="Homeview">
      <div className="container">
        <div className="row height justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="form">
              <input
                type="text"
                className="form-control form-input"
                placeholder="Search country..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {props.roadtripData.map((element) => {
            return <RoadtripCard key={element.id} roadtripData={element} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Homeview;
