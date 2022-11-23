import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { breakAddr } from "../helpers/utils";
import "./MarkerMap.css";
// Global Leaflet variable; only necessary for the green marker.
// Everything else is provided by React Leaflet
const L = window.L;

function MarkerMap(props) {
  // By default Leaflet only comes with blue markers. We want green too!
  // https://github.com/pointhi/leaflet-color-markers
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
  // let carMarker = new L.icon({
  //   iconUrl:
  //     "https://mpng.subpng.com/20180723/yxq/kisspng-computer-icons-desktop-wallpaper-clip-art-car-icon-black-5b569791f20cf8.3936918815324015539915.jpg",

  //   iconSize: [80, 80],
  //   iconAnchor: [12, 41],
  //   nameAnchor: [1, -34],
  // });


  //adding lines to map
  const polyline = props.places.map((p) => 
    [p.latitude, p.longitude]
  );


   console.log("poly", polyline);

  const lineColor = { color: "#519251" }

  return (
    <MapContainer
      className="MarkerMap"
      center={props.home}
      zoom={props.zoom}
      style={{ height: "500px" }}
    >
      {/* Create the tile layer that shows the map */}
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />


            {props.places.map((p) => (
              <Marker
                key={p.title}
                position={[p.latitude, p.longitude]}
                icon={greenMarker}
              >

              <Popup> {breakAddr(p.title)}{" "} </Popup>

            </Marker>
            ))}

            <Polyline 
            positions={polyline}
            pathOptions={lineColor}
            />

    </MapContainer>
  );
}

export default MarkerMap;
