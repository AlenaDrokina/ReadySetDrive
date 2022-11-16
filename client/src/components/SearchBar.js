import React from "react";
import "./SearchBar.css";
import { BsSearch } from "react-icons/bs";

function SearchBar(props) {
  return (
    <div>
      <div className="container">
        <div className="row height justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="form">
              <BsSearch className="search-icon" />
              <input
                type="text"
                className="form-control form-input"
                placeholder="Search country..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
