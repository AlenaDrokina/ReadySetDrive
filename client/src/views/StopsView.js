import React, { useState, useEffect } from "react";
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

function StopsView() {

  const [home, setHome] = useState(null);  // center of map
  const [places, setPlaces] = useState([]);
//   const [stops, setStops] =useState([]);
  //const [roadtrips, setRoadtrips] = useState();

  // Set "home" when the app loads
  useEffect(() => {
    getAndSetHome();
  }, []);

//   useEffect(() => {
//     fetch("/stops/:roadtrip_id")
//       .then((res) => res.json())
//       .then((json) => {
//         setPlaces(json);
//       })
//       .catch((error) => {});
//   }, []);


  async function getAndSetHome() {
    let latLng = await getHome();  // returns [lat, lng]
    setHome(latLng);
  }

  async function addMarkerForAddress(addressObj) {
    // Send a request to OpenCage to geocode 'addr'
    let myresponse = await geocode(addressObj.address);
    if (myresponse.ok) {
        if (myresponse.data.latLng) {
            // Create new 'place' obj
            let d = myresponse.data;
            let newPlace = { 
              name: addressObj.title,
              title: addressObj.address,
              latitude: d.latLng[0],
              longitude: d.latLng[1],
                // formatted_address: d.formatted_address
            };
            // Add it to 'places' state
            setPlaces(places => [...places, newPlace]);
            console.log(places);
        } else {
            console.log('addMarkerForAddress(): no results found');
        }
    } else {
        console.log('addMarkerForAddress(): response.error:', myresponse.error);
    }
}


async function addStop(address) {    //should this be stops, create stop state??
    let options= {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(address)         //here too 
    };
    
    try {
    let response = await fetch("/stops/:roadtrip_id", options);
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



//ONCE THIS IS COMPLETE PASS TO MARKERMAP
// async function deleteMarker(id) {
//   let options = {
//     method: "DELETE",
//   };
//   try {
//     let response = await fetch(`/stops/:roadtripid`, options);

//     if (response.ok) {
//       let data = await response.json();
//       setPlaces(data);
//     } else {
//       console.log(`Server error: ${response.status} ${response.statusText}`);
//     }
//   } catch (err) {
//     console.log(`Network error: ${err.message}`);
//   }
// }


  return (
      <div className="StopsView">
        <div className="row mb-5">
          <div className="col">
          <StopsForm addMarkerCb={addr => addMarkerForAddress(addr)} places={places} addStopCb={addStop} />
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
        </div>


      </div>
  );
}


export default StopsView;
