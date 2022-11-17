import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { HiOutlineMenu } from "react-icons/hi";

function Navbar() {
  return (
    <nav className="dropdown">
      <h3>
        {" "}
        <HiOutlineMenu />
      </h3>
      <div className="topnav-right">
        <div className="dropdown-content">
          <p>
            <NavLink style={{ textDecoration: "none", color: "black" }} to="/">
              Home
            </NavLink>
          </p>

          <p>
            {" "}
            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to="/profile"
            >
              My profile
            </NavLink>
          </p>
          <p>
            {" "}
            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to="/NewRoadTripView"
            >
              New roadtrips
            </NavLink>
          </p>
          <p>
            {" "}
            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to="/PastRoadTripView"
            >
              Past roadtrips
            </NavLink>
          </p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
