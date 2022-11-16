import React, { useState, useEffect } from "react";
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
        <div className="mb-3">
          {/* {profileData.picture && */}
          <img scr={profileData.picture} alt={profileData.picture} />
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
            name="text"
            value={profileData.text}
            onChange={handleChange}
            className="form-control"
            // placeholder="Add a url of a pic of you!"
          />
        </div>
        <button onSubmit={handleSubmit} className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
}

export default ProfileView;
