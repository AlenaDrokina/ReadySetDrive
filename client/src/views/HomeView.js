import { React, useState } from "react";
import RoadtripCard from "../components/RoadtripCard";
// import "./HomeView.css";
import SearchBar from "../components/SearchBar";

function Homeview(props) {
  const [filteredCards, setfilteredCards] = useState([]);
  //create a new array by filtering the cards by country
  function filteredData(input) {
    const filterResult = props.roadtripData.filter((el) => {
      //if no input the return the original
      if (el === "") {
        return el;
      }
      //return the roadtripCard which contains the user input
      else {
        return el.countries.toLowerCase().includes(input);
      }
    });
    setfilteredCards(filterResult);
  }

  return (
    <div className="Homeview">
      <SearchBar filteredData={filteredData} />

      <div className="container">
        <div className="row">
          {filteredCards.length >= 1
            ? filteredCards.map((element) => {
                return <RoadtripCard key={element.id} roadtripData={element} />;
              })
            : props.roadtripData.map((element) => {
                return <RoadtripCard key={element.id} roadtripData={element} />;
              })}
        </div>
      </div>
    </div>
  );
}

export default Homeview;
