import React, { useState, useEffect } from "react";
import { CiCircleMore } from "react-icons/ci";
import { AiFillHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import Local from "../helpers/Local";
import "./Favorites.css";

export default function Favorites(props) {
  const [faved, setFaved] = useState([]);
  let { user_id } = useParams();
  //post in db

  useEffect(() => {
    let user_id = Local.getUser_id();
    fetch(`/favorite_roadtrips/${user_id}`)
      .then((res) => res.json())
      .then((json) => {
        setFaved(json);
      })
      .catch((error) => {});
  }, []);
  //   console.log(props.cardLiked);
  // call in api js and pass roadtrip id

  // useEffect(() => {
  //   getFav();
  // }, []);

  // async function getFav() {
  //   let user_id = Local.getUser_id();
  //   try {
  //     let response = await fetch(`/favorite_roadtrips/${user_id}`); //user_id
  //     if (response.ok) {
  //       let favorites = await response.json();
  //       setFaved(favorites);

  //       console.log("faved", faved);
  //     } else {
  //       console.log(`Server error: ${response.status} ${response.statusText}`);
  //     }
  //   } catch (err) {
  //     console.log(`Server error: ${err.message}`);
  //   }
  // }
  // console.log("faved", faved);

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
