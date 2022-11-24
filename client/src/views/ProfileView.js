import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import NewRoadTripView from "./NewRoadTripView";
import ProfileCards from "../components/ProfileCards";

import Api from "../helpers/Api";
import Local from "../helpers/Local";
import { useParams } from "react-router-dom";

// import NewRoadTripView from "./NewRoadTripView";
// import PastFormView from "./PastFormView";
import "./ProfileView.css";
const BLANK_STOP_PROFILE = {
  image_url: "",
  slogan: "",
};

function ProfileView(props) {
  const [user, setUser] = useState(Local.getUser());
  const [profileData, setProfileData] = useState(BLANK_STOP_PROFILE);
  const [errorMsg, setErrorMsg] = useState("");
  const [roadtripDataUser, setRoadtripDataUser] = useState({});
  const [completedTrips1, setCompletedTrips1] = useState({});
  const [completedTrips2, setCompletedTrips2] = useState({});
  const [plannedTrips1, setPlannedTrips1] = useState({});
  const [plannedTrips2, setPlannedTrips2] = useState({});
  //const [descrip, setDescrip] = useState("");
  const [tripToDelete, setTripToDelete] = useState(0);

  let { user_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    getRoadtripDataUser();
  }, []);

  async function fetchProfile() {
    let myresponse = await Api.getUser(user_id);
    console.log("response", myresponse);
    if (myresponse.ok) {
      setUser(myresponse.data);
      setErrorMsg("");
      // updateProfile(user);
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

  async function updateProfile() {
    let options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_url: profileData.image_url,
        slogan: profileData.slogan,
      }),
    };

    try {
      let response = await fetch(`/users/${user_id}`, options);
      if (response.ok) {
        let result = await response.json();
        setUser(result);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }
  // console.log("user", user)

  function handleChange(event) {
    let { name, value } = event.target;
    setProfileData((data) => ({ ...data, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("hello");
    updateProfile(profileData);
  }

  function getCompletedTrips(roadtrips) {
    let completedTrips = roadtrips.filter((el) => el.done === 1);
    setCompletedTrips1(completedTrips.slice(0, 3));
    setCompletedTrips2(completedTrips.slice(3));
  }

  function getPlannedTrips(roadtrips) {
    let plannedTrips = roadtrips.filter((el) => el.done === 0);
    setPlannedTrips1(plannedTrips.slice(0, 3));
    setPlannedTrips2(plannedTrips.slice(3));
  }

  async function deleteRoadtrip(id) {
    let options = {
      method: "DELETE",
    };
    try {
      let response = await fetch(`/roadtrips/delete/${id}`, options);
      console.log(id);
      if (response.ok) {
        getRoadtripDataUser();
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  return (
    <div>
      <div className="row">
        <div className="profile-section col-lg-4 col-md-6">
          <div className="box">
            {user.slogan && user.image_url ? (
              <div className="userInfo">
                <br />
                <div className="image">
                  {" "}
                  <img src={user.image_url} alt="User" />
                </div>
                <div className="name">
                  {" "}
                  <p className="text-left">Hey {user.username} ! </p>
                </div>
                {/* <div className="email">
                  <p className="text-left"> {user.email} </p>
                </div> */}

                <div className="description">
                  {" "}
                  <p class="text-left">
                    Description: <br /> {user.slogan}
                  </p>
                </div>
              </div>
            ) : (
              <div className="box2">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">
                      Add a little description!
                    </label>
                    <input
                      type="text"
                      name="slogan"
                      value={profileData.slogan}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="I like to..."
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Add Picture Here</label>
                    <input
                      type="text"
                      name="image_url"
                      value={profileData.image_url}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Add a pic of you! (url)"
                    />
                  </div>

                  <button className="btn btn-primary"> Submit </button>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="roadtrip-section col-lg-8 col-md-6">
          <div>
            <h4>My shared roadtrips</h4>
            <h5>
              <NavLink to="/PastRoadTripView" className="link-add">
                Add more
              </NavLink>{" "}
            </h5>
            <div>
              <div className="container">
                <div className="d-flex justify-content-start flex-wrap">
                  {completedTrips1.length >= 1
                    ? completedTrips1.map((element) => {
                        return (
                          <ProfileCards
                            key={element.id}
                            roadtripData={element}
                            tripToDeleteCb={setTripToDelete}
                          />
                        );
                      })
                    : null}
                </div>
              </div>
              {completedTrips2.length >= 1 && (
                <div className="container">
                  <div className="accordion" id="accordionExample">
                    <div
                      className="accordion-item"
                      style={{ border: "none", padding: "0px" }}
                    >
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                      >
                        <div
                          className="accordion-body"
                          style={{ border: "none", padding: "0px" }}
                        >
                          <div
                            className="d-flex justify-content-start flex-wrap"
                            style={{ maxWidth: "800px" }}
                          >
                            {completedTrips2.map((element) => {
                              return (
                                <ProfileCards
                                  key={element.id}
                                  roadtripData={element}
                                  tripToDeleteCb={setTripToDelete}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                          className="btn acc-btn testToggle collapsed"
                        ></button>
                      </h2>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4>My planned roadtrips</h4>
            <h5>
              <NavLink to="/NewRoadTripView" className="link-add">
                Plan more
              </NavLink>{" "}
            </h5>
            <div>
              <div className="container">
                <div className="d-flex justify-content-start flex-wrap">
                  {plannedTrips1.length >= 1
                    ? plannedTrips1.map((element) => {
                        return (
                          <ProfileCards
                            key={element.id}
                            roadtripData={element}
                            tripToDeleteCb={setTripToDelete}
                          />
                        );
                      })
                    : null}
                </div>
              </div>
              {plannedTrips2.length >= 1 && (
                <div className="container">
                  <div className="accordion" id="accordionTwo">
                    <div
                      className="accordion-item"
                      style={{ border: "none", padding: "0px" }}
                    >
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionTwo"
                      >
                        <div
                          className="accordion-body"
                          style={{ border: "none", padding: "0px" }}
                        >
                          <div
                            className="d-flex justify-content-start flex-wrap"
                            style={{ maxWidth: "800px" }}
                          >
                            {plannedTrips2.map((element) => {
                              return (
                                <ProfileCards
                                  key={element.id}
                                  roadtripData={element}
                                  tripToDeleteCb={setTripToDelete}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                          className="btn acc-btn testToggleTwo collapsed"
                        ></button>
                      </h2>
                    </div>
                  </div>
                </div>
              )}
              <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-body">
                      Do you really want to delete this roadtrip?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn delete-btn"
                        data-bs-dismiss="modal"
                        onClick={() => deleteRoadtrip(tripToDelete)}
                      >
                        Yes
                      </button>
                      <button type="button" className="btn delete-btn">
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
