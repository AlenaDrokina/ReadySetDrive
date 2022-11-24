import React from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";

function ProfileCards(props) {
  const navigate = useNavigate();
  let linkToFeaturedView = `/stops/${props.roadtripData.id}`;

  function changeView() {
    navigate(linkToFeaturedView);
  }

  return (
    <div
      className="card profile-cards m-2"
      style={{ width: "250px", height: "300px" }}
    >
      <img
        className="card-img-top-profile"
        src={props.roadtripData.image_url}
        alt="completed roadtrips"
        style={{
          width: "100%",
          height: "10vw",
          objectFit: "cover",
          cursor: "pointer",
        }}
        onClick={changeView}
      />
      <div className="card-body">
        <div className="title-delete-container">
          <h5 className="card-title">{props.roadtripData.title}</h5>
          <i>
            <RiDeleteBin5Line
              className="delete-icon"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={(e) => props.tripToDeleteCb(props.roadtripData.id)}
            />
          </i>
        </div>
        <h6 className="card-text">{props.roadtripData.countries}</h6>
      </div>
    </div>
  );
}

export default ProfileCards;
