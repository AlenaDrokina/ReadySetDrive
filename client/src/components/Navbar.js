import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import { HiOutlineMenu } from "react-icons/hi";
import { useParams } from "react-router-dom";

function Navbar(props) {
  let { user_id } = useParams();
  return (
    <nav className="dropdown">
      <h3>
        {" "}
        <HiOutlineMenu />
      </h3>
      {props.user ? (
        <ul>
          <li className="dropdown-content">
            <NavLink style={{ textDecoration: "none", color: "black" }} to="/">
              Home
            </NavLink>
          </li>
          <li className="dropdown-content">
            <NavLink className="nav-link" to={`/users/${props.user.id}`}>
              Profile
            </NavLink>
          </li>
          <li className="dropdown-content">
            {" "}
            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to="/NewRoadTripView"
            >
              Plan roadtrip
            </NavLink>
          </li>{" "}
          <li className="dropdown-content">
            {" "}
            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to="/PastRoadTripView"
            >
              Share roadtrip
            </NavLink>
          </li>
          <li className="dropdown-content">
            {/* Log out user. Then go to home page. */}
            <Link className="nav-link" to="/" onClick={props.logoutCb}>
              Logout
            </Link>
          </li>
          <li className="dropdown-content">
            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to={`/favorite_roadtrips/${props.user.id}`}
            >
              Favorites
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul>
          <li className="dropdown-content">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
