import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import HomeView from "./views/HomeView";
// import FeaturedTripView from "./views/FeaturedTripView";
// import NewRoadTripView from "./views/NewRoadTripView";
// import PastFormView from "./views/PastFormView";
import ProfileView from "./views/ProfileView";
import Error404View from "./views/Error404View";
// import Local from "./helpers/Local";

import "./App.css";

function App() {
  // const [user, setUser] = useState(Local.getUser());

  return (
    <div className="App">
      <Navbar />
      <p>Road Tripper</p>

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="*" element={<Error404View />} />
      </Routes>
    </div>
  );
}

export default App;
