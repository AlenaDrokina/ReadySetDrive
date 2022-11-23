import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

function ProfileCards(props) {
  return (
    <div>
      <div className="col-md-6 col-lg-3 mb-4">
        <div className="card h-100 profile-cards">
          <img
            className="card-img-top-profile"
            src={props.roadtripData.image_url}
            alt="completed roadtrips"
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
      </div>
    </div>
  );
}

export default ProfileCards;
