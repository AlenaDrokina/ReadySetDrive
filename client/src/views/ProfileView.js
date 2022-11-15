import React, { useState, useEffect } from "react";
import "./ProfileView.css";
// import { Routes, Route, useParams } from "react-router-dom";
// import Api from "../helpers/Api";

function ProfileView() {
  const [user, setUser] = useState();
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
  // const getUsers = () => {
  //let myresponse = await
  //   fetch("/users")
  //     .then((response) => response.json())
  //     .then((user) => {
  //       setUser(user);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="ProfileView">
      <h1>Profile</h1>
      <div className="box">
        <p>Image</p>
        {/* {user} */}
        {/* <p>{user[0].username}</p> */}
        {/* <p>{user[1].username}</p> */}
        {/* <img src="{user[1].image_url}" /> */}

        {/* <p>password</p> */}
        <div className="texarea">
          <p>Personal into...</p>
          <textarea></textarea>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
