import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginView.css";

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
          <span className="company__logo">
            <h2>
              <span className="fa fa-android"></span>
            </h2>
          </span>
          <h4 class="company_title">Your Company Logo</h4>
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
                <label>
                  Username
                  <input
                    type="text"
                    id="username"
                    name="usernameInput"
                    required
                    className="form__input"
                    value={username}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="row">
                <label>
                  Password
                  <input
                    type="password"
                    id="password"
                    name="passwordInput"
                    required
                    className="form__input"
                    value={password}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="row">
                <input type="submit" value="Submit" class="btn" />
              </div>
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
