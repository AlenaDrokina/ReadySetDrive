import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Local from "./helpers/Local";
import Api from "./helpers/Api";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import Favorites from "./views/Favorites";
import { NavLink } from "react-router-dom";
import FeaturedTripView from "./views/FeaturedTripView";
// import NewRoadTripView from "./views/NewRoadTripView";
import RoadtripView from "./views/RoadtripView"; // import FeaturedTripView from "./views/FeaturedTripView";
import NewRoadTripView from "./views/NewRoadTripView";
import PastRoadTripView from "./views/PastRoadTripView";
import ProfileView from "./views/ProfileView";
import StopsView from "./views/StopsView";
import Error404View from "./views/Error404View";
// import Local from "./helpers/Local";

function App() {
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const [cardLiked, setCardLiked] = useState([]);
  const [roadtripData, setRoadtripData] = useState([]);

  const navigate = useNavigate();

  async function doLogin(username, password) {
    let myresponse = await Api.loginUser(username, password);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMsg("");
      navigate("/");
    } else {
      setLoginErrorMsg("Login failed");
    }
  }

  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
    // (NavBar will send user to home page)
  }

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

  //POST a new Roadtrip (RoadtripView.js)
  async function addRoadtrip(formData) {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    try {
      let response = await fetch("/roadtrips", options);
      if (response.ok) {
        let newRoadtrip = await response.json();
        let roadtrip_id = newRoadtrip.id;
        navigate(`/stops/${roadtrip_id}`);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  function makeFav(id) {
    //let currentLiked = Object.values(props.roadtripData);
    let currentLiked = roadtripData.filter((trip) => trip.id === id);
    setCardLiked((cardLiked) => [...cardLiked, currentLiked[0]]);
    console.log(currentLiked);
    // makeFav([...cardLiked, currentLiked]); Can you see me?
  }

  // async function fetchRoadtrips() {
  //   let myresponse = await Api.addFav();
  //   if (myresponse.ok) {
  //     setCardLiked(myresponse.data);
  //   } else {
  //     console.log("Response not okay.");
  //   }
  // }

  return (
    <div className="App">
      <NavLink to="/" className="Logo">
        {" "}
        <h3> READY SET DRIVE </h3>
      </NavLink>
      <Navbar user={user} logoutCb={doLogout} />

      <Routes>
        <Route
          path="/"
          element={<HomeView roadtripData={roadtripData} makeFav={makeFav} />}
        />
        {/* <Route path="/profile/*" element={<ProfileView />} /> */}

        <Route
          path="/users/:user_id"
          element={
            <PrivateRoute>
              <ProfileView user={user} />
            </PrivateRoute>
          }
        />

        <Route
          path="/login"
          element={
            <LoginView
              loginCb={(u, p) => doLogin(u, p)}
              loginError={loginErrorMsg}
            />
          }
        />

        <Route path="*" element={<Error404View />} />
        <Route
          path="/roadtrip"
          element={
            <RoadtripView addRoadtripCb={(formData) => addRoadtrip(formData)} />
          }
        />
        <Route path="/stops/:id" element={<StopsView />} />
        <Route path="/roadtrip/:id" element={<FeaturedTripView />} />
        <Route path="/NewRoadTripView" element={<NewRoadTripView />} />
        <Route path="/PastRoadTripView" element={<PastRoadTripView />} />
        <Route
          path="/favorites/:user_id"
          element={
            <PrivateRoute>
              <Favorites cardLiked={cardLiked} />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
