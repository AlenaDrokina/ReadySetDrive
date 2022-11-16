import React, { useState, useEffect } from "react";
//import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
//import { useMap } from "react-leaflet/hooks";
//import "leaflet/dist/leaflet.css";
//import L from "leaflet";
//import { LatLngExpression } from "leaflet";
// import "./TheMap.css";
import RoadtripForm from '../components/RoadtripForm';
//import MarkerTable from '../components/MarkerTable';
//import MarkerMap from '../components/MarkerMap';
//import { geocode } from '../helpers/geo-opencage';
//import { getHome } from '../helpers/geoLocation';
//import PastForm from "../components/PastForm";
//import StopsForm from "../components/StopsForm";

function RoadtripView() {

  //const [home, setHome] = useState(null);  // center of map
  //const [places, setPlaces] = useState([]);
  //const [stops, setStops] =useState();
  const [roadtrips, setRoadtrips] = useState();

  // Set "home" when the app loads
  // useEffect(() => {
  //   getAndSetHome();
  // }, []);

  // useEffect(() => {
  //   fetch("/stops/")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setPlaces(json);
  //     })
  //     .catch((error) => {});
  // }, []);


  // async function getAndSetHome() {
  //   let latLng = await getHome();  // returns [lat, lng]
  //   setHome(latLng);
  // }

//   async function addMarkerForAddress(addressObj) {
//     // Send a request to OpenCage to geocode 'addr'
//     let myresponse = await geocode(addressObj.address);
//     if (myresponse.ok) {
//         if (myresponse.data.latLng) {
//             // Create new 'place' obj
//             let d = myresponse.data;
//             let newPlace = { 
//               name: addressObj.title,
//               title: addressObj.address,
//               latitude: d.latLng[0],
//               longitude: d.latLng[1],
//                 // formatted_address: d.formatted_address
//             };
//             // Add it to 'places' state
//             setPlaces(places => [...places, newPlace]);
//             console.log(places);
//         } else {
//             console.log('addMarkerForAddress(): no results found');
//         }
//     } else {
//         console.log('addMarkerForAddress(): response.error:', myresponse.error);
//     }
// }

//attempt to delete marker without it being added to database DELETE MARKER FOR MAP
// async function deleteMarker(ix) {     
//   let myresponse = await geocode();
//   if (myresponse.ok) {
//       if (myresponse.data.latLng) {
//           setPlaces(places => [...places, newPlace]);
//           console.log(places);
//       } else {
//           console.log('deleteMarkerForAddress(): no results found');
//       }
//   } else {
//       console.log('deleteMarkerForAddress(): response.error:', myresponse.error);
//   }
// }




//FIX WITH ROUTES!!!
// async function addMarker(place) {
//   try {
//     let response = await fetch("/stops/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" }, //in what form we send to server
//       body: JSON.stringify(place), // updated input
//     });

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

// async function deleteMarker(id) {
//   let options = {
//     method: "DELETE",
//   };
//   try {
//     let response = await fetch(`/roadtrips/${id}`, options);

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

//POST A NEW ROADTRIP (RoadtripForm.js)
async function addRoadtrip(formData){
  let options= {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData)
  };

  try {
  let response = await fetch("/roadtrips", options); // do POST
  if (response.ok) {
    let data = await response.json();    //awaiting new data, if found post
    setRoadtrips(data);
    //console.log(setRoadtrips);
  } else {
    console.log(`Server error: ${response.status} ${response.statusText}`);
  }
  } catch (err) {
  console.log(`Network error: ${err.message}`);
  }
}

  return (
      <div className="PastFormView">
        <div className="row mb-5">
            <RoadtripForm addRoadtripCb={formData => addRoadtrip(formData)}/>
          </div>
      </div>
  );
}


export default RoadtripView;
