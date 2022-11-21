import { useNavigate } from "react-router-dom";
import React from "react";
import "./RoadtripCard.css";

import { CiCircleMore } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";
import { AiTwotoneHeart } from "react-icons/ai";

function RoadtripCard(props) {
  // let roadtripData = props.roadtripData;
  //    const [cardLiked, setCardLiked] = useState([]);
  // const [current, setCurrent] = useState(props.roadtripData); .
  const navigate = useNavigate();

  let linkToFeaturedView = `/roadtrip/${props.roadtripData.id}`;

  function changeView() {
    navigate(linkToFeaturedView);
  }

  // const [cardLiked, setCardLiked] = useState();

  function handleClick(id) {
    props.makeFav(id);
  }
  function myFunction(x) {
    x.classList.toggle(<AiTwotoneHeart />);
  }

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100">
        <img
          className="card-img-top"
          src={props.roadtripData.image_url}
          alt="roadtrip"
          onClick={changeView}
        />
        <div className="card-body">
          <div className="title-heart-container">
            <h5 className="card-title">{props.roadtripData.title} </h5>
            <i>
              <AiOutlineHeart
                className="heart-icon"
                onClick={(e) => handleClick(props.roadtripData.id)}
              />

              <i onClick={myFunction}></i>
            </i>
          </div>

          <h6 className="card-text">{props.roadtripData.countries}</h6>
          <div className="circle-icon-container">
            {" "}
            <CiCircleMore className="circle-icon" onClick={changeView} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoadtripCard;
