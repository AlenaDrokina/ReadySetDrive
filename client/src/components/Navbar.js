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
          <h5>
            <NavLink style={{ textDecoration: "none", color: "black" }} to="/">
              Home
            </NavLink>
          </h5>

          <h5>
            {" "}
            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to="/profile"
            >
              My profile
            </NavLink>
          </h5>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
