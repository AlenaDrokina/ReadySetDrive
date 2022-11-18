import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MarkerMap from "../components/MarkerMap";
import StopsView from "./StopsView";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { breakAddr } from "../helpers/utils";
import { getHome } from "../helpers/geoLocation";
import "../components/MarkerMap.css";

const L = window.L;

function FeaturedTripView(props) {
  let { id } = useParams();

  let [currentRoadtripData, setCurrentRoadtripData] = useState({});
  let [currentStops, setCurrentStops] = useState({});
  const [home, setHome] = useState(null); // center of map

  useEffect(() => {
    getCurrentRoadtripData();
    getCurrentStops();
    getAndSetHome();
  }, []);

  async function getAndSetHome() {
    let latLng = await getHome(); // returns [lat, lng]
    setHome(latLng);
    console.log(`home: ${home}`);
  }

  let greenMarker = new L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    nameAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  async function getCurrentRoadtripData() {
    try {
      let response = await fetch(`/roadtrips/${id}`);
      console.log(response);
      if (response.ok) {
        let currentRoadtripData = await response.json();
        setCurrentRoadtripData(currentRoadtripData);
        // console.log(currentRoadtripData);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function getCurrentStops() {
    try {
      let response = await fetch(`/stops/${id}`);
      console.log(response);
      if (response.ok) {
        let currentStops = await response.json();
        setCurrentStops(currentStops);
        console.log("current Stops", currentStops);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  const position = [51.505, -0.09];

  return (
    <div>
      <h2>{currentRoadtripData.title}</h2>
      <h3>{currentRoadtripData.countries}</h3>
      <img src={currentRoadtripData.image_url} alt="roadtrip" />
      <p>{currentRoadtripData.description}</p>
      <h2>Stops</h2>
      <p>{currentStops && console.log(currentStops)}</p>
      {currentStops.length
        ? currentStops.map((stop) => {
            return (
              <div>
                <h4>{stop.title}</h4>
                <h5>{stop.address}</h5>
              </div>
            );
          })
        : null}
      {/* <MarkerMap /> */}
      <MapContainer
        className="MarkerMap"
        center={position}
        zoom={13}
        // {!props.places && zoom={3}}
        style={{ height: "500px" }} // you MUST specify map height, else it will be 0!
      >
        {/* Create the tile layer that shows the map */}
        <TileLayer
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}></Marker>

        {/* Draw the green "YOU ARE HERE" marker */}
        {/* {home && (
          <Marker position={home}>
            <Popup>YOU ARE HERE</Popup>
          </Marker>
        )} */}

        {/* Draw a blue marker for each of the places passed as prop */}
        {/* {currentStops.length
          ? currentStops.map((stop) => (
              <Marker
                key={stop.title}
                position={[stop.latitude, stop.longitude]}
                icon={greenMarker}
              >
                <Popup>
                  {breakAddr(stop.title)}{" "} */}
        {/* <button type="button" onClick={(e) => props.updateMarker(p.id)}>
              &#x2713;
            </button> */}
        {/* <button
              type="buttonMarker"
              onClick={(e) => props.deleteMarker(p.id)}
            >
              X
            </button> */}
        {/* </Popup>
              </Marker>
            ))
          : null} */}
      </MapContainer>
    </div>
  );
}

export default FeaturedTripView;
