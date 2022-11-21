import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="signup__container">
      <div className="col-4 offset-4">
        <h2>Sign up </h2>
        <form className="signup__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              required
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              minLength={6}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confpassword">Confirm Password</label>
            <input
              type="password"
              name="confPassword"
              id="confPassword"
              minLength={6}
              required
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            SIGN UP
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
  );
};

export default RegisterView;
