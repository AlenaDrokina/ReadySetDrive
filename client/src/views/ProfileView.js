import React, { useState, useEffect } from "react";
import "./ProfileView.css";
import { Routes, Route, useParams } from "react-router-dom";

// import PastFormView from "../views/From/PastFormView ";
import Api from "../helpers/Api";

function ProfileView() {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  let { user_id } = useParams();
  useEffect(() => {
    fetchProfile();
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

  return (
    <div className="ProfileView">
      <h1>Profile</h1>
      <div className="box">
        <p>Image</p>
        <p>username</p>
        <p>email</p>
        <p>password</p>
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
