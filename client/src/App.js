import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Local from "./helpers/Local";
import Api from "./helpers/Api";

import Navbar from "./components/Navbar";

import PrivateRoute from "./components/PrivateRoute";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
// import FeaturedTripView from "./views/FeaturedTripView";
// import NewRoadTripView from "./views/NewRoadTripView";
// import PastFormView from "./views/PastFormView";
import MembersOnlyView from "./views/MembersOnlyView";
import UsersView from "./views/UsersView";
import PastFormView from "./views/PastFormView";
import ProfileView from "./views/ProfileView";
import Error404View from "./views/Error404View";
// import Local from "./helpers/Local";

import TheMap from "./components/TheMap";

function App() {
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
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

  return (
    <div className="App">
      <Navbar user={user} logoutCb={doLogout} />
      <p>Road Triper</p>

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="profile" element={<ProfileView />} />
        <Route path="/users" element={<UsersView />} />
        <Route
          path="/users/:userId"
          element={
            <PrivateRoute>
              <ProfileView />
            </PrivateRoute>
          }
        />
        <Route
          path="/members-only"
          element={
            <PrivateRoute>
              <MembersOnlyView />
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
        <Route path="/pastForm" element={<PastFormView />} />
        <Route path="/map" element={<TheMap />} />
      </Routes>
    </div>
  );
}

export default App;
