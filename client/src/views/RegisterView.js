import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterView = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, name, password, confPassword });
    setEmail("");
    setName("");
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
              id="name"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
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
          <p>
            Already have an account?{" "}
            <span class="text-success" onClick={gotoLoginPage}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterView;
