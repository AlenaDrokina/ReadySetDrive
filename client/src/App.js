import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import HomeView from "./views/HomeView";
// import FeaturedTripView from "./views/FeaturedTripView";
// import NewRoadTripView from "./views/NewRoadTripView";
import RoadtripView from "./views/RoadtripView";
import ProfileView from "./views/ProfileView";
import StopsView from "./views/StopsView";
import Error404View from "./views/Error404View";
// import Local from "./helpers/Local";
import Api from "./helpers/Api";

import TheMap from "./components/TheMap";

import "./App.css";

function App() {
  // const [user, setUser] = useState(Local.getUser());

  let [roadtripData, setRoadtripData] = useState([]);

  useEffect(() => {
    fetchRoadtrips();
  }, []);

  async function fetchRoadtrips() {
    let myresponse = await Api.getRoadtrips();
    if (myresponse.ok) {
      setRoadtripData(myresponse.data);
    } else {
      console.log("Response not okay.");
    }
  }

  return (
    <div className="App">
      <Navbar />
      <p>Road Tripper</p>

      <Routes>
        <Route path="/" element={<HomeView roadtripData={roadtripData} />} />
        <Route path="/profile/*" element={<ProfileView />} />
        <Route path="*" element={<Error404View />} />
        <Route path="/roadtrip" element={<RoadtripView />} />
        <Route path="/stops" element={<StopsView />} />
        <Route path="/map" element={<TheMap />} />
      </Routes>
    </div>
  );
}

export default App;
