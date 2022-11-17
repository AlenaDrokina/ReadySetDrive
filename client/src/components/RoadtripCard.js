import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./RoadtripCard.css";

import { CiCircleMore } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";

function RoadtripCard(props) {
  const navigate = useNavigate();

  let linkToFeaturedView = `/roadtrip/${props.roadtripData.id}`;

  function changeView() {
    navigate(linkToFeaturedView);
  }

  const [cardLiked, setCardLiked] = useState();

  function handleClick(id) {
    // let currentLiked = props.roadtripData.filter((trip) => trip.id === id);
    // setCardLiked((cardLiked) => [...cardLiked, currentLiked[0]]);
    // props.LikedCardCb([...cardLiked, currentLiked[0]]);
  }
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100" onClick={changeView}>
        <img
          className="card-img-top"
          src={props.roadtripData.image_url}
          alt="roadtrip"
        />
        <div className="card-body">
          <h5 className="card-title">
            {props.roadtripData.title}{" "}
            <div className="title-heart-container">
              <AiOutlineHeart
                className="heart-icon"
                type="button"
                onClick={handleClick}
              />
            </div>
          </h5>

          <h6 className="card-text">{props.roadtripData.countries}</h6>
          <div className="circle-icon-container">
            {" "}
            <CiCircleMore className="circle-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoadtripCard;
