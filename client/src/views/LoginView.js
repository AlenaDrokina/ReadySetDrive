import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginView.css";
import { AiFillCar } from "react-icons/ai";

function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    let { name, value } = event.target;
    switch (name) {
      case "usernameInput":
        setUsername(value);
        break;
      case "passwordInput":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    props.loginCb(username, password);
  }
  // changed from /auth/register

  const gotoRegisterPage = () => navigate("/register");

  return (
    <div className="container-fluid">
      <div className="row main-content bg-success text-center">
        <div className="col-md-4 text-center company__info">
          <i>
            <AiFillCar className="car-icon" />
          </i>
        </div>
        <div className="col-md-8 col-xs-12 col-sm-12 login_form">
          <div className="container-fluid">
            <div className="row">
              <h2>Login</h2>
            </div>
            {props.loginError && (
              <div className="alert alert-danger">{props.loginError}</div>
            )}

            <form control="" className="form-group" onSubmit={handleSubmit}>
              <div className="row">
                <input
                  type="text"
                  id="username"
                  name="usernameInput"
                  required
                  className="form__input"
                  value={username}
                  onChange={handleChange}
                  placeholder="Username"
                />
              </div>

              <div className="row">
                <input
                  type="password"
                  id="password"
                  name="passwordInput"
                  required
                  className="form__input"
                  value={password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>

              <button type="submit" className="btn">
                Submit
              </button>
            </form>
          </div>
          <div className="row">
            <p>
              Don't have an account?{" "}
              <span className="text-success" onClick={gotoRegisterPage}>
                Register Here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
