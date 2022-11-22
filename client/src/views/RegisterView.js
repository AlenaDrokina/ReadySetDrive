import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterView.css";

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
          <span className="company__logo">
            <h2>
              <span className="fa fa-android"></span>
            </h2>
          </span>
          <h4 className="company_title">Set to drive</h4>
        </div>
        <div className="col-md-8 col-xs-12 col-sm-12 signup__form ">
          <div className="container-fluid">
            <div className="row">
              <h2>Register</h2>
            </div>

            <div className="row">
              <form control="" className="form-group" onSubmit={handleSubmit}>
                <div className="form-group">
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
