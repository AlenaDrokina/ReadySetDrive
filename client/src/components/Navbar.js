import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import { HiOutlineMenu } from "react-icons/hi";
import { useParams } from "react-router-dom";

function Navbar(props) {
  let { user_id } = useParams();
  return (
    <nav className="navbar" class="float-right">
      {/* <h3>
        {" "}
        <HiOutlineMenu />
      </h3> */}
      <button
        // type="button"
        className="float-right"
        // class="btn btn-primary dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        {" "}
        <HiOutlineMenu />
      </button>
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
    </nav>
  );
}

export default Navbar;
