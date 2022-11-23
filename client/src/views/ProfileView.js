import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import NewRoadTripView from "./NewRoadTripView";
import Api from "../helpers/Api";
import Local from "../helpers/Local";
import { useParams } from "react-router-dom";
// import NewRoadTripView from "./NewRoadTripView";
// import PastFormView from "./PastFormView";
import "./ProfileView.css";
// import { Routes, Route, useParams } from "react-router-dom";
// import Api from "../helpers/Api";

// const BLANK_STOP_PROFILE = {
//   // id: user_id,
//   // username: user.username,
//   image_url: "",
//   slogan: "",
// };


function ProfileView(props) {
  
  const [user, setUser] = useState(Local.getUser());
  //const [profileData, setProfileData] = useState(BLANK_STOP_PROFILE);
  const [errorMsg, setErrorMsg] = useState("");
  //const [descrip, setDescrip] = useState("");

  let { user_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  // console.log("user", user);
  // console.log("profileData", profileData);
  // console.log("descrip", descrip);


  async function fetchProfile() {
    let myresponse = await Api.getUser(user_id);
    console.log("response", myresponse)
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
  if (errorMsg) {
    return <h2 style={{ color: "blue" }}>{errorMsg}</h2>;
  }
  if (!user) {
    return <h2>Loading...</h2>;
  }

  async function updateProfile() {
    let options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        image_url: user.image_url,
        slogan: user.slogan,
      }),
    };

    try {
      let response = await fetch(`/users/${user_id}`, options);
      if (response.ok) {
        let result = await response.json();
        setUser(result);
        
        setUser(user);
        //navigate(`/users/${user.id}`);
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
    setUser((data) => ({ ...data, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    //console.log("hello");
    updateProfile(user);
  }

 

  return (
    <div>
      <h1>Profile</h1>
      <div className="ProfileView">
        {((user.slogan && user.image_url) ? (
         <div className="box2">
          <div className="userInfo">
            {/* {user && (
                <div key={user.id}>
                <img src={user.image_url} alt="User" />
              </div>
              )}   */}
              <div>
            <br />
            <div className="name">
              {" "}
              <img src={user.image_url} alt="User" />
            </div>
            <div className="name">
              {" "}
              <p className="text-left">Hey {user.username} ! </p>
            </div>

            <div className="description">
              {" "}
              <p class="text-left">
                Description: <br /> {user.slogan}
              </p>
            </div>
          </div>
          </div>
        </div>
            ) :
            (
          <div className="box">
            <form onSubmit={handleSubmit} >
            <div className="mb-3">
                <label className="form-label">Add a little description!</label>
                <input
                  type="text"
                  name="slogan"
                  value={user.slogan}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="I like to..."
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Add Picture Here</label>
                <input
                  type="url"
                  name="image_url"
                  value={user.image_url}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Add a pic of you! (url)"
                />
              </div>

             <button onSubmit={handleSubmit} className="btn btn-primary"> Submit </button>
            </form>
          </div>

         
       

         ))}
        {/* // <div className="Projects">
        //   <div className="Project1">
        //     <h4>
        //       Add a past project <NavLink to="/PastRoadTripView">HERE</NavLink>{" "}
        //     </h4>
        //     <div className="CardGrid1">Cards</div>
        //   </div>
        //   <div className="Project2">
        //     <h4>
        //       Add a new project <NavLink to="/NewRoadTripView">HERE</NavLink>{" "}
        //     </h4>
        //     <div className="CardGrid2">Cards</div>
        //   </div>
        // </div */}
      </div> 
    </div>
  );
}

export default ProfileView;
