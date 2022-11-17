import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function FeaturedTripView(props) {
  let { id } = useParams();
  console.log(id);
  let [currentRoadtripData, setCurrentRoadtripData] = useState({});

  useEffect(() => {
    getCurrentRoadtripData();
  }, []);

  async function getCurrentRoadtripData() {
    try {
      let response = await fetch(`/roadtrips/${id}`);
      console.log(response);
      if (response.ok) {
        let currentRoadtripData = await response.json();
        setCurrentRoadtripData(currentRoadtripData);
        console.log(currentRoadtripData);
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
    </div>
  );
}

export default FeaturedTripView;

// to show roadtrip data of roadtrip that was clicked on: save param with useParams to variable and let only data show from one roadtrip
// show stops for this roadtrip: fetch stops of this particular roadtrip
