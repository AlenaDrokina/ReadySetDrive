import { React, useState, useEffect } from "react";
import RoadtripCard from "../components/RoadtripCard";
// import "./HomeView.css";
import SearchBar from "../components/SearchBar";
import Favorites from "./Favorites";
import Api from "../helpers/Api";

function HomeView(props) {
  const [filteredCards, setfilteredCards] = useState([]);
  const [completedRoadtrips, setCompletedRoadtrips] =useState([]);
  const [roadtrips, setRoadtrips] = useState([])

  useEffect(() => {
    fetchRoadtrips();
  }, []);

  async function fetchRoadtrips() {
    let myresponse = await Api.getRoadtrips();
    if (myresponse.ok) {
      setRoadtrips(myresponse.data);
    } else {
      console.log("Response not okay.");
    }
  }
  console.log("all", roadtrips)

  function getCompletedRoadtrips(){
    // console.log("roadtrips", roadtrips)   WHY IS COMPLETED ROADTRIPS EMPTY ARRAY?
    let completedRoadtrips = roadtrips.filter((el) => el.done === 1);
    setCompletedRoadtrips(completedRoadtrips)
  }
  console.log("comp", completedRoadtrips);

  //create a new array by filtering the cards by country
  function filteredData(input) {
    const filterResult = completedRoadtrips.filter((el) => {
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
                return (
                  <RoadtripCard
                    key={element.id}
                    roadtripData={element}
                    makeFav={props.makeFav}
                  />
                );
              })
            : completedRoadtrips.map((element) => {
                return (
                  <RoadtripCard
                    key={element.id}
                    roadtripData={element}
                    makeFav={props.makeFav}
                  />
                );
              })}
          {/* <Favorites makeFav={props.makeFav} /> */}
        </div>
      </div>
    </div>
  );
}

export default HomeView;
