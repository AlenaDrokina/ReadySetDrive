import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
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
  const polyline = currentStops.map((p) => [p.latitude, p.longitude]);

  const lineColor = { color: "#519251" };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>{currentRoadtripData.title}</h2>
          <h4>Countries: {currentRoadtripData.countries}</h4>
          <img
            src={currentRoadtripData.image_url}
            alt="roadtrip"
            className="featured-img"
          />
          <h5>Description</h5>
          <p>{currentRoadtripData.description}</p>

          {currentStops.length > 0 && (
            <div className="stops">
              <h5 className="stop-title">Destinations</h5>
              <div className="table-responsive card">
                <table className="table table-st riped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th className="feat-table-head" scope="col">
                        Stop
                      </th>
                      <th className="feat-table-head" scope="col">
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentStops.map((stop) => {
                      return (
                        <tr key={stop.id}>
                          <th className="feat-table-body" scope="row">
                            <td>{stop.title}</td>
                          </th>
                          <th className="feat-table-body" scope="row">
                            <td>{stop.address}</td>
                          </th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {currentStops.length > 0 && (
          <div className="col">
            <MapContainer
              className="MarkerMap"
              center={[currentStops[0].latitude, currentStops[0].longitude]}
              zoom={5}
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
              <Polyline positions={polyline} pathOptions={lineColor} />
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeaturedTripView;
