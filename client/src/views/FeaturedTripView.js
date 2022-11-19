import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function FeaturedTripView(props) {
  let { id } = useParams();

  let [currentRoadtripData, setCurrentRoadtripData] = useState({});
  let [currentStops, setCurrentStops] = useState({});

  useEffect(() => {
    getCurrentRoadtripData();
    getCurrentStops();
  }, []);

  async function getCurrentRoadtripData() {
    try {
      let response = await fetch(`/roadtrips/${id}`);
      console.log(response);
      if (response.ok) {
        let currentRoadtripData = await response.json();
        setCurrentRoadtripData(currentRoadtripData);
        // console.log(currentRoadtripData);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function getCurrentStops() {
    try {
      let response = await fetch(`/stops/${id}`);
      console.log(response);
      if (response.ok) {
        let currentStops = await response.json();
        setCurrentStops(currentStops);
        // console.log(currentStops);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  return (
    <div>
      <h2>{currentRoadtripData.title}</h2>
      <h3>{currentRoadtripData.countries}</h3>
      <img src={currentRoadtripData.image_url} alt="roadtrip" />
      <p>{currentRoadtripData.description}</p>
      <h2>Stops</h2>
      <p>{currentStops && console.log(currentStops)}</p>
      {currentStops.length
        ? currentStops.map((stop) => {
            return (
              <div>
                <h4>{stop.title}</h4>
                <h5>{stop.address}</h5>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default FeaturedTripView;
