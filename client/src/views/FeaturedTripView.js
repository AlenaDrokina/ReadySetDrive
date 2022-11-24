import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { breakAddr } from "../helpers/utils";
import "../components/MarkerMap.css";
import "./FeaturedTripView.css";

const L = window.L;

function FeaturedTripView(props) {
  let { id } = useParams();

  let [currentRoadtripData, setCurrentRoadtripData] = useState({});
  let [currentStops, setCurrentStops] = useState([]);

  useEffect(() => {
    getCurrentRoadtripData();
    getCurrentStops();
  }, []);

  let greenMarker = new L.icon({
    iconUrl:
      "https://www.freeiconspng.com/thumbs/car-icon-png/car-icon-png-25.png",
      // "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    // shadowUrl:
    //   "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [28, 35],
    iconAnchor: [12, 41],
    nameAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  async function getCurrentRoadtripData() {
    try {
      let response = await fetch(`/roadtrips/featured/${id}`);
      console.log(response);
      if (response.ok) {
        let currentRoadtripData = await response.json();
        setCurrentRoadtripData(currentRoadtripData);
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

  

  
    //Adding lines to map
    const polyline = currentStops.map((p) => 
    [p.latitude, p.longitude]
  );
      const lineColor = { color: 'blue' }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>{currentRoadtripData.title}</h2>
          <h3>{currentRoadtripData.countries}</h3>
          <img
            src={currentRoadtripData.image_url}
            alt="roadtrip"
            className="featured-img"
          />
          <p>{currentRoadtripData.description}</p>

          {currentStops.length > 0 && (
            <div>
              <h3>Stops</h3>
              {currentStops.map((stop) => {
                return (
                  <div>
                    <h4>{stop.title}</h4>
                    <h5>{stop.address}</h5>
                    {/* {console.log("Stop data:", stop)} */}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {currentStops.length > 0 && (
          <div className="col">
            <MapContainer
              className="MarkerMap"
              center={[currentStops[0].latitude, currentStops[0].longitude]}
              zoom={4}
              style={{ height: "500px" }}
            >
              <TileLayer
                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {currentStops.map((stop) => {
                return (
                  <Marker
                    key={stop.id}
                    position={[stop.latitude, stop.longitude]}
                    icon={greenMarker}
                  >
                    <Popup>{breakAddr(stop.title)}</Popup>
                  </Marker>
                );
              })}
              <Polyline 
                positions={polyline}
                pathOptions={lineColor}
              />
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeaturedTripView;
