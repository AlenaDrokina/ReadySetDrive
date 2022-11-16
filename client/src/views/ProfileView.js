import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import NewRoadTripView from "./NewRoadTripView";
import PastFormView from "./PastFormView";
import Api from "../helpers/Api";
import { useParams } from "react-router-dom";

import "./ProfileView.css";
// import { Routes, Route, useParams } from "react-router-dom";
// import Api from "../helpers/Api";

const BLANK_STOP_PROFILE = {
  url: "",
  description: "",
};

function ProfileView() {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(BLANK_STOP_PROFILE);
  // const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  let { user_id } = useParams();
  // useEffect(() => {
  //   getUsers();
  // }, []);
  // const getUsers = () => {
  //   fetch("/users")
  //     .then((response) => response.json())
  //     .then((user) => {
  //       setUser(user);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   getProfile();
  // }, []);
  // async function getProfile() {
  //   let myresponse = await Api.getUser(user_id);
  //   if (myresponse.ok) {
  //     setUser(myresponse.data);
  //     setErrorMsg("");
  //   } else {
  //     setUser(null);
  //     let msg = `Error ${myresponse.status}: ${myresponse.error}`;
  //     setErrorMsg(msg);
  //   }
  // }

  // if (errorMsg) {
  //   return <h2 style={{ color: "blue" }}>{errorMsg}</h2>;
  // }

  // if (!user) {
  //   return <h2>Loading...</h2>;
  // }

  function handleChange(event) {
    let { name, value } = event.target;
    setProfileData((data) => ({ ...data, [name]: value }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log(profileData);
    // console.log(stops); //add props to function PastForm(props)
    setProfileData(BLANK_STOP_PROFILE);
  }
  return (
    <div className="ProfileView">
      <h1>Profile</h1>
      <div className="box">
        <form onSubmit={handleSubmit}>
          {/* {if user has user.image_url and user.description } */}
          <div className="mb-3">
            <label className="form-label">Add Picture Here</label>
            <input
              type="text"
              name="url"
              value={profileData.url}
              onChange={handleChange}
              className="form-control"
              placeholder="Add a pic of you! (url)"
            />
          </div>
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
          {profileData.url && (
            <div key={profileData.url}>
              <img src={profileData.url} alt="User" width="500" height="600" />
            </div>
          )}
          {profileData.description && (
            <p>A little about me</p>

            //  <p>{profileData.description}</p>
          )}
          {/* <br></br> */}
          {/* <p>my email</p> */}
        </div>
        <div className="Project1">
          <h4>
            Add a past project <NavLink to="/PastRoadTripView">HERE</NavLink>{" "}
          </h4>
          <div className="CardGrid">
            {/* <div className="container">
        <div className="row">
          {props.roadtripData.map((element) => {
            return <RoadtripCard key={element.id} roadtripData={element} />;
          })}
        </div>
      </div> */}
          </div>
        </div>
        <div className="Project2">
          <h4>
            Add a new project <NavLink to="/NewRoadTripView">HERE</NavLink>{" "}
          </h4>
          <div className="CardGrid"></div>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
