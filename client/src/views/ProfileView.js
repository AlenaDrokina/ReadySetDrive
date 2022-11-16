import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import NewRoadTripView from "./NewRoadTripView";
import PastFormView from "./PastFormView";

import "./ProfileView.css";
// import { Routes, Route, useParams } from "react-router-dom";
// import Api from "../helpers/Api";

const BLANK_STOP_PROFILE = {
  picture: "",
  description: "",
};

function ProfileView() {
  const [user, setUser] = useState();
  const [profileData, setProfileData] = useState(BLANK_STOP_PROFILE);
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    fetch("/users")
      .then((response) => response.json())
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleChange(event) {
    let { name, value } = event.target;
    setProfileData((data) => ({ ...data, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(stops); //add props to function PastForm(props)
    setProfileData(BLANK_STOP_PROFILE);
  }
  return (
    <div className="ProfileView">
      <h1>Profile</h1>
      <div className="box">
        <form onSubmit={handleSubmit}>
          {/* {user} */}
          <div className="mb-3">
            {/* {profileData.picture && */}

            <label className="form-label">Add Picture Here</label>
            <input
              type="text"
              name="picture"
              value={profileData.picture}
              onChange={handleChange}
              className="form-control"
              placeholder="Add a pic of you! (url)"
            />
          </div>
          {/* {user} */}
          {/* <p>{user[0].username}</p> */}
          {/* <p>{user[1].username}</p> */}

          <div className="mb-3">
            <label className="form-label">Add a little description!</label>
            <input
              type="text"
              name="description"
              value={profileData.description}
              onChange={handleChange}
              className="form-control"
              placeholder="I like to..."
              // placeholder="Add a url of a pic of you!"
            />
          </div>
          <button onSubmit={handleSubmit} className="btn btn-primary">
            Submit
          </button>
        </form>

        <div className="userInfo">
          <p>Me</p>
          <img src={profileData.picture} alt={profileData.picture} />
          <p>A little about me</p>
          <p>{profileData.description}</p>
          <br></br>
          <p>my email</p>
        </div>
        <div className="Project1">
          {/* <PastFormView /> */}
          <h4>
            Add a past project <NavLink to="/PastFormView">HERE</NavLink>
          </h4>
        </div>
        <div className="Project2">
          <h4>
            Add a new project <NavLink to="/NewRoadTripView">HERE</NavLink>{" "}
          </h4>
          {/* <NewRoadTripView /> */}
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
