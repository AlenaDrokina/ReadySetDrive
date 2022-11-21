import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import NewRoadTripView from "./NewRoadTripView";
import Api from "../helpers/Api";
import { useParams } from "react-router-dom";
// import NewRoadTripView from "./NewRoadTripView";
// import PastFormView from "./PastFormView";
import "./ProfileView.css";
// import { Routes, Route, useParams } from "react-router-dom";
// import Api from "../helpers/Api";

const BLANK_STOP_PROFILE = {
  url: "",
  slogan: "",
};

function ProfileView(props) {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(BLANK_STOP_PROFILE);
  const [errorMsg, setErrorMsg] = useState("");
  const [roadtripDataUser, setRoadtripDataUser] = useState({});
  const [completedTrips, setCompletedTrips] = useState({});
  const [plannedTrips, setPlannedTrips] = useState({});

  let { user_id } = useParams();

  useEffect(() => {
    fetchProfile();
    getRoadtripDataUser();
  }, []);

  async function fetchProfile() {
    let myresponse = await Api.getUser(user_id);
    if (myresponse.ok) {
      setUser(myresponse.data);
      setErrorMsg("");
    } else {
      setUser(null);
      let msg = `Error ${myresponse.status}: ${myresponse.error}`;
      setErrorMsg(msg);
    }
  }

  async function getRoadtripDataUser() {
    try {
      let response = await fetch(`/roadtrips/${user_id}`);
      console.log(response);
      if (response.ok) {
        let roadtripDataUser = await response.json();
        setRoadtripDataUser(roadtripDataUser);
        getCompletedTrips(roadtripDataUser);
        getPlannedTrips(roadtripDataUser);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  if (errorMsg) {
    return <h2 style={{ color: "blue" }}>{errorMsg}</h2>;
  }
  if (!user) {
    return <h2>Loading...</h2>;
  }

  function handleChange(event) {
    let { name, value } = event.target;
    setProfileData((data) => ({ ...data, [name]: value }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log(profileData);
    setProfileData(BLANK_STOP_PROFILE);
  }

  function getCompletedTrips(roadtrips) {
    let completedTrips = roadtrips.filter((el) => el.done === 1);
    setCompletedTrips(completedTrips);
  }

  function getPlannedTrips(roadtrips) {
    let plannedTrips = roadtrips.filter((el) => el.done === 0);
    setPlannedTrips(plannedTrips);
  }

  return (
    <div className="ProfileView">
      <h1>Profile</h1>
      <div className="box">
        {!props.user.image_url ||
          (!props.user.slogan && (
            <form onSubmit={handleSubmit}>
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
                  name="slogan"
                  value={profileData.slogan}
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
          ))}
      </div>
      <div className="box2">
        <div className="userInfo">
          {user.image_url && (
            <div key={user.image_url}>
              <img src={user.image_url} alt="User" />
            </div>
          )}
          <br />
          <div className="name">
            {" "}
            <p className="text-left">Hey!! {user.username}</p>
          </div>
          <div className="email">
            {" "}
            <p class="text-left">Email: {user.email}</p>
          </div>

          <div className="description">
            {" "}
            <p className="text-left">
              Description: <br /> {user.slogan}
            </p>
          </div>
        </div>
        <div className="Project1">
          <h4>
            Add a past project <NavLink to="/PastRoadTripView">HERE</NavLink>{" "}
          </h4>
          <div className="CardGrid1">
            {completedTrips.length >= 1
              ? completedTrips.map((element) => {
                  return <h5>{element.id}</h5>;
                })
              : null}
          </div>
        </div>
        <div className="Project2">
          <h4>
            Add a new project <NavLink to="/NewRoadTripView">HERE</NavLink>{" "}
          </h4>
          <div className="CardGrid2">
            {plannedTrips.length >= 1
              ? plannedTrips.map((element) => {
                  return <h5>{element.id}</h5>;
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
