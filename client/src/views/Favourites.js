import React, { useState, useEffect } from "react";
import { CiCircleMore } from "react-icons/ci";
import { AiFillHeart } from "react-icons/ai";
import "./Favourites.css";

export default function Favourites(props) {
  //   const [faved, setFaved] = useState();
  //post in db

  //   useEffect(() => {
  //     fetch("/favorite_roadtrips")
  //       .then((res) => res.json())
  //       .then((json) => {
  //         setFaved(json);
  //       })
  //       .catch((error) => {});
  //   }, []);
  //   console.log(props.cardLiked);
  return (
    <div className="Grid">
      <div className="col-md-6 col-lg-4 mb-4">
        {props.cardLiked.length
          ? props.cardLiked.map((card) => (
              <div key={card.id}>
                <div className="card">
                  <img
                    className="card-img-top"
                    src={card.image_url}
                    alt="roadtrip"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {card.title}{" "}
                      <i className="title-heart-container">
                        <AiFillHeart className="icon-unlock" type="button" />
                      </i>
                    </h5>

                    <h6 className="card-text">{card.countries}</h6>
                    <div className="circle-icon-container">
                      {" "}
                      <CiCircleMore className="circle-icon" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
