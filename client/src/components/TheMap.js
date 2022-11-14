import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { useMap } from "react-leaflet/hooks";
import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import { LatLngExpression } from "leaflet";
import "./TheMap.css";
import AddressForm from "../components/AddressForm";
// import MarkerTable from "../components/MarkerTable";
import MarkerMap from "../components/MarkerMap";
import { geocode } from "../helpers/geo-opencage";

const barcelona = [41.37861515964027, 2.1798093354905523];

const TheMap = (props) => {
  const [places, setPlaces] = useState([]);
  // let deleteMarker = props.deleteMarker;

  useEffect(() => {
    fetch("/TheMap")
      .then((res) => res.json())
      .then((json) => {
        setPlaces(json);
      })
      .catch((error) => {});
  }, []);

  async function addMarkerForAddress(addr) {
    let myresponse = await geocode(addr);
    console.log(myresponse);
    if (myresponse.ok) {
      if (myresponse.data.latLng) {
        // Create new 'place' obj
        let d = myresponse.data;
        let newPlace = {
          name: addr,
          latitude: d.latLng[0],
          longitude: d.latLng[1],

          // formatted_address: d.formatted_address,
        };
        // Add it to 'places' state
        // setPlaces((places) => [...places, newPlace]);
        await addMarker(newPlace);
        console.log(places);
      } else {
        console.log("addMarkerForAddress(): no results found");
      }
    } else {
      console.log("addMarkerForAddress(): response.error:", myresponse.error);
    }
  }

  async function addMarker(place) {
    try {
      let response = await fetch("/TheMap", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //in what form we send to server
        body: JSON.stringify(place), // updated input
      });

      if (response.ok) {
        let data = await response.json();
        setPlaces(data);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  async function deleteMarker(id) {
    let options = {
      method: "DELETE",
    };
    try {
      let response = await fetch(`/TheMap/${id}`, options);

      if (response.ok) {
        let data = await response.json();
        setPlaces(data);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  return (
    <div classNAme="theMap">
      <div className="row mb-5">
        <div className="col">
          <h3 className="mt-4">Add Markers Where {<br />} you like to skate</h3>
          <h5>Enter an address to add a marker on the map</h5>
          <AddressForm
            addMarkerCb={(addr) => addMarkerForAddress(addr)}
            places={places}
          />
        </div>

        <div className="col">
          {props.home && (
            <MarkerMap
              places={places}
              home={props.home}
              zoom={13}
              deleteMarker={(id) => deleteMarker(id)}
            />
          )}
        </div>
      </div>
      {/* <div className="mapEr">
        <MarkerTable places={places} />
      </div> */}
    </div>
  );
};

export default TheMap;
