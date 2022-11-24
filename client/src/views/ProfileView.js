import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import NewRoadTripView from "./NewRoadTripView";
import Api from "../helpers/Api";
import { useParams } from "react-router-dom";
// import NewRoadTripView from "./NewRoadTripView";
// import PastFormView from "./PastFormView";
import "./ProfileView.css";
const BLANK_STOP_PROFILE = {
  image_url: "",
  slogan: "",
};

function ProfileView(props) {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(BLANK_STOP_PROFILE);
  const [errorMsg, setErrorMsg] = useState("");
  // const [descrip, setDescrip] = useState("");

  let { user_id } = useParams();

  useEffect(() => {
    fetchProfile(profileData);
    addDescrip(profileData);
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
  if (errorMsg) {
    return <h2 style={{ color: "blue" }}>{errorMsg}</h2>;
  }
  if (!user) {
    return <h2>Loading...</h2>;
  }

  async function addDescrip(profileData) {
    let options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_url: profileData.image_url,
        slogan: profileData.slogan,
      }),
    };

    try {
      let response = await fetch(
        `/users/${user_id}`,
        options,
        profileData.image_url,
        profileData.slogan
      );
      if (response.ok) {
        let newDescrip = await response.json();
        setProfileData(newDescrip);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }
  console.log(profileData);
  // console.log(profileData.image_url);

  function handleChange(event) {
    let { name, value } = event.target;
    setProfileData((data) => ({ ...data, [name]: value }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    // console.log(profileData);
    setProfileData(profileData[0]);
    console.log("heyyyy");
  }

  return (
    <div>
      <h1>Profile</h1>
      <div className="ProfileView">
        {/* {profileData.image_url ? (
          <div className="box">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Add Picture Here</label>
                <input
                  type="text"
                  name="url"
                  value={profileData.image_url}
                  onChange={(e) => handleChange(e)}
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
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  placeholder="I like to..."
                  // placeholder="Add a url of a pic of you!"
                />
              </div>
              <button onSubmit={handleSubmit} className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        ) : ( */}
        <div className="box2">
          <div className="userInfo">
            {/* {user.image_url && (
                <div key={profileData[0].id}>
                  <img src={profileData[0].image_url} alt="User" />
                </div>
              )} */}
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
              <p class="text-left">
                Description: <br /> {user.slogan}
              </p>
            </div>
          </div>
        </div>
        {/* )} */}
        <div className="Projects">
          <div className="Project1">
            <h4>
              Add a past project <NavLink to="/PastRoadTripView">HERE</NavLink>{" "}
            </h4>
            <div className="CardGrid1">Cards</div>
          </div>
          <div className="Project2">
            <h4>
              Add a new project <NavLink to="/NewRoadTripView">HERE</NavLink>{" "}
            </h4>
            <div className="CardGrid2">Cards</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
