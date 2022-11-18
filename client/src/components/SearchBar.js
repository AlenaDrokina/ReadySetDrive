import { React, useState } from "react";
import "./SearchBar.css";
import { BsSearch } from "react-icons/bs";

function SearchBar(props) {
  //get the input from user
  const [inputText, setInputText] = useState("");

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    props.filteredData(lowerCase);
  };

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
                onChange={inputHandler}
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
