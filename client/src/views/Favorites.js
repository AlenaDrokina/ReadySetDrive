import React, { useState, useEffect } from "react";
import { CiCircleMore } from "react-icons/ci";
import { AiFillHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import Local from "../helpers/Local";
import "./Favorites.css";
import Api from "../helpers/Api";

export default function Favorites(props) {
  const [faved, setFaved] = useState([]);
  // const [allcards, setAllCards] = useState([]);
  let { user_id } = useParams();
  let { roadtrip_id } = useParams();

  useEffect(() => {
    // getCurrentRoadtripData();
    newFav();
    getFav();
  }, []);
  // function cards(id) {
  //   let card = props.roadtripData.filter((trip) => trip.id === id);
  //   setFaved((cards) => [...cards, card[0]]);
  // }
  let makeFav = props.makeFav;
  console.log("heyy", props.cardLiked);
  // setFaved(props.cardLiked);

  async function newFav() {
    setFaved(props.cardLiked);
    console.log("THIS IS FAVED", faved);
  }

  async function getFav() {
    //let id = await Api.getUser(user_id);
    let id = await Local.getUser_id();
    // let id = await Api.getUser();
    // console.log(id);
    try {
      let response = await fetch(`/favorite_roadtrips/${id}`);
      console.log(response);
      console.log(user_id);

      if (response.ok) {
        console.log(response);
        let faved = await response.json();
        setFaved(faved);

        console.log(faved);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }
  // console.log("faved", faved);
  return (
    <div className="container">
      <div className="row row-cols-3">
        <div className="grid">
          {faved.length
            ? faved.map((card) => (
                <div key={card.id} className="">
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
                      <h6 className="card-text">{card.roadtrip_id}</h6>

                      <div className="circle-icon-container">
                        {" "}
                        <CiCircleMore className="circle-icon" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
          {!faved.length && <p>Add some Fav's!</p>}
        </div>
      </div>
    </div>
  );
}
