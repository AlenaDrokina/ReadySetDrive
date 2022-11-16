import React, { useState, useEffect } from "react";
import "./ProfileView.css";
// import { Routes, Route, useParams } from "react-router-dom";
// import Api from "../helpers/Api";

function ProfileView() {
  const [user, setUser] = useState();
  const [profileData, setProfileData] = useState();
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = () => {
    fetch("/users")
      .then((response) => response.json())
      .then((user) => {
        setProfileData(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleChange(event) {
    let { name, value } = event.target;
    setProfileData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div className="ProfileView">
      <h1>Profile</h1>
      <div className="box">
        <label>
          Image
          <input
            type="text"
            name="image"
            value={profileData.image}
            onChange={handleChange}
            className="form-control"
          />
        </label>

        {/* {user} */}
        {/* <p>{user[0].username}</p> */}
        {/* <p>{user[1].username}</p> */}
        {/* <img src="{user[1].image_url}" /> */}
        {/* <p>password</p> */}
        <div className="texarea">
          <p>A little about me</p>
          <textarea></textarea>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
