import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterView.css";
import { AiFillCar } from "react-icons/ai";
// import { BsFillPersonFill } from "react-icons/ai";
// import { AiOutlineLock } from "react-icons/ai";
// import { AiFillLock } from "react-icons/ai";
// import { AiOutlineMail } from "react-icons/ai";

const RegisterView = (props) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.registerCb(username, email, password, confPassword);
    setEmail("");
    setUserName("");
    setPassword("");
    setConfPassword("");
  };
  const gotoLoginPage = () => navigate("/login");

  return (
    <div className="container-fluid">
      <div className="row main-content bg-success text-center">
        <div className="col-md-4 text-center company__info">
          <i>
            <AiFillCar className="car-icon" />
          </i>
        </div>
        <div className="col-md-8 col-xs-12 col-sm-12 signup__form ">
          <div className="container-fluid">
            <div className="row">
              <h2>Register</h2>
            </div>

            <div className="row">
              <form control="" className="form-group" onSubmit={handleSubmit}>
                <div className="form-group">
                  {/* <i>
                    <AiOutlineMail className="email-icon" />
                  </i> */}
                  <div className="row">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form__input"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                    />
                  </div>
                </div>

                <div className="row">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form__input"
                    value={username}
                    required
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Username"
                  />
                </div>

                <div className="row">
                  <input
                    type="password"
                    name="password"
                    className="form__input"
                    id="password"
                    minLength={6}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>

                <div className="row">
                  <input
                    type="password"
                    name="confPassword"
                    className="form__input"
                    id="confPassword"
                    minLength={6}
                    required
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    placeholder="Confirm Password"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <p>{props.registerError}</p>
                <p>
                  Already have an account?{" "}
                  <span className="text-success" onClick={gotoLoginPage}>
                    Login
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
