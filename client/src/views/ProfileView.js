import React, { useState, useEffect } from "react";
import "./ProfileView.css";
import { Routes, Route, useParams } from "react-router-dom";
import Api from "../helpers/Api";

function ProfileView(props) {
  const [user, setUser] = useState([]);
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

  return (
    <div className="ProfileView">
      <h1>Profile</h1>
      <div className="box">
        <p>Image</p>
        {/* <p>{props.user.username}</p>
        <p>{props.user.email}</p> */}
        {/* <p>password</p> */}
        <div className="texarea">
          <p>Personal into...</p>
          <textarea></textarea>
        </div>
      </div>
      <div>
        <Routes>
          {/* <Route path="/PastFrom" element={<PastFormView />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default ProfileView;
