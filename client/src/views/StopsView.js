import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import "leaflet/dist/leaflet.css";
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


  async function getAndSetHome() {
    let latLng = await getHome();  // returns [lat, lng]
    setHome(latLng);
  }

  //add marker to map & add stop to db
  async function addMarkerForAddress(addressObj) {     
    // Send a request to OpenCage to geocode 'addr'
    let myresponse = await geocode(addressObj.address);
    if (myresponse.ok) {
        if (myresponse.data.latLng) {
            let d = myresponse.data;
            let newPlace = { 
              title: addressObj.title,
              address: addressObj.address,
              latitude: d.latLng[0],
              longitude: d.latLng[1],
              roadtrip_id: id
            };

           //add stop to db
            let response = await Api.addStop(newPlace);
                if (response.ok) {
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


  return (
      <div className="StopsView">
        <div className="row mb-5">
          <div className="col">
          <StopsForm addMarkerCb={addr => addMarkerForAddress(addr)} places={places} markComplete={props.markComplete} />
          </div>

        <div className="col">
        {home && (
            <MarkerMap
              home={home}
              places={places}
              zoom={1.5}
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
