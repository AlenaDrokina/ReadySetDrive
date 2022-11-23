import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import { HiOutlineMenu } from "react-icons/hi";
//import { useParams } from "react-router-dom";
import logo from './logo.png'
//import LogoutView from "./views/LogoutView";

function Navbar(props) {
  //let { user_id } = useParams();
  return (

    <nav className="navbar navbar-light" color="background-color: #e3f2fd;">
      <NavLink to="/" className="Logo">
        {" "}
        <img className="logoIcon" src={logo} alt="carlogo" />
      </NavLink>

      <li className="nav-item dropdown">
        <button
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-bs-toggle="dropdown"
          id="navbarDropdownMenuLink"
        >
          {" "}
          <HiOutlineMenu />
        </button>

        {props.user ? (
          <div className="dropdown-menu">
            <a className="dropdown-item">
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/"
              >
                Home
              </NavLink>
            </a>
            <a className="dropdown-item">
              <NavLink className="nav-link" to={`/users/${props.user.id}`}>
                Profile
              </NavLink>
            </a>
            <a className="dropdown-item">
              {" "}
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/NewRoadTripView"
              >
                Plan roadtrip
              </NavLink>
            </a>{" "}
            <a className="dropdown-item">
              {" "}
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to="/PastRoadTripView"
              >
                Share roadtrip
              </NavLink>
            </a>
            <a className="dropdown-item">
              {/* Log out user. Then go to home page. */}
              <Link className="nav-link" to="/" onClick={props.logoutCb}>
                Logout
              </Link>
            </a>
            <a className="dropdown-item">
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to={`/favorite_roadtrips/${props.user.id}`}
              >
                Favorites
              </NavLink>
            </a>
          </div>
        ) : (
          <div className="dropdown-menu">
            <a className="dropdown-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </a>
          </div>
        )}
      </li>

      {props.user ? (
  
        <div className="dropdown-menu">
          <a className="dropdown-item">
            <NavLink style={{ textDecoration: "none", color: "black" }} to="/">
              Home
            </NavLink>
          </a>
          <a className="dropdown-item">
            <NavLink className="nav-link" to={`/users/${props.user.id}`}>
              Profile
            </NavLink>
          </a>
          <a className="dropdown-item">
            {" "}
            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to="/NewRoadTripView"
            >
              Plan roadtrip
            </NavLink>
          </a>{" "}
          <a className="dropdown-item">
            {" "}
            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to="/PastRoadTripView"
            >
              Share roadtrip
            </NavLink>
          </a>
          <a className="dropdown-item">
            {/* Log out user. Then go to home page. */}
            <NavLink className="nav-link" to="/LogoutView" onClick={props.logoutCb}>
              Logout
            </NavLink>
          </a>
          <a className="dropdown-item">
            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to={`/favorite_roadtrips/${props.user.id}`}
            >
              Favorites
            </NavLink>
          </a>
        </div>
    
      ) : (
        <div className="dropdown-menu">
          <a className="dropdown-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </a>
        </div>

      )}
    </nav>
  );
}

export default Navbar;
