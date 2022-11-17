import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet/hooks";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
//import { LatLngExpression } from "leaflet";
//import RoadtripForm from '../components/RoadtripForm';
import MarkerTable from '../components/MarkerTable';
import MarkerMap from '../components/MarkerMap';
import { geocode } from '../helpers/geo-opencage';
import { getHome } from '../helpers/geoLocation';

import StopsForm from "../components/StopsForm";
import Api from "../helpers/Api";

function StopsView(props) {

  let {id} = useParams();

  const [home, setHome] = useState(null);  // center of map
  const [places, setPlaces] = useState([]);

  console.log("places", places);
  // Set "home" when the app loads
  useEffect(() => {
    getAndSetHome();
  }, []);

  useEffect(() => {
    getStops();
  }, [])
  
  async function getStops(){
    try{
      let response = await fetch(`/stops/${id}`)
      if(response.ok){
        let places = await response.json();
        setPlaces(places)
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // useEffect(() => {
  //   fetch(`/stops/${roadtrip_id}`)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setPlaces(json);
  //     })
  //     .catch((error) => {});
  // }, []);


  async function getAndSetHome() {
    let latLng = await getHome();  // returns [lat, lng]
    setHome(latLng);
  }

  //only show based on roadtrip id places(by roadtrip_id)
  async function addMarkerForAddress(addressObj) {     
    //console.log("addressObj", addressObj)
    // Send a request to OpenCage to geocode 'addr'
    let myresponse = await geocode(addressObj.address);
    if (myresponse.ok) {
        if (myresponse.data.latLng) {
            // Create new 'place' obj
            let d = myresponse.data;
            let newPlace = { 
              title: addressObj.title,
              address: addressObj.address,
              latitude: d.latLng[0],
              longitude: d.latLng[1],
              roadtrip_id: id
            };
            // Add it to 'places' state
           //setPlaces(places => [...places, newPlace]);

           //addStop to db
            let response = await Api.addStop(newPlace);
                if (response.ok) {
                    // let result = await response.json();   
                    setPlaces(response.data);
                } else {
                  console.log(`Server error: ${response.status} ${response.statusText}`);
                }
        } else {
            console.log('addMarkerForAddress(): no results found');
        }
    } else {
        console.log('addMarkerForAddress(): response.error:', myresponse.error);
    }
}


//not working!
// async function deleteStop(id) {
//     let response = await Api.deleteStop(id)

//     if (response.ok) {
//       setPlaces(response.data);
//     } else {
//       console.log(`Server error: ${response.status} ${response.statusText}`);
//     }
// }


  return (
      <div className="StopsView">
        <div className="row mb-5">
          <div className="col">
          <StopsForm addMarkerCb={addr => addMarkerForAddress(addr)} places={places} />
          </div>

        <div className="col">
        {home && (
            <MarkerMap
              home={home}
              places={places}
              zoom={13}
            //   deleteMarker={(id) => deleteMarker(id)}
            />
          )}
        </div>

        <div className="mapEr">
          <MarkerTable places={places} updateStopsCb={getStops}/>
          </div>
        </div>


      </div>
  );
}


export default StopsView;
