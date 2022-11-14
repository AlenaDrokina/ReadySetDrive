import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    nameAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  let rollerMArker = new L.icon({
    iconUrl:
      "https://cdn.shopify.com/s/files/1/0273/1202/9753/products/1201-LSTK.png?v=1644090455",

    iconSize: [80, 80],
    iconAnchor: [12, 41],
    nameAnchor: [1, -34],
  });

  return (
    <MapContainer
      className="MarkerMap"
      center={props.home}
      zoom={props.zoom}
      style={{ height: "500px" }} // you MUST specify map height, else it will be 0!
    >
      {/* Create the tile layer that shows the map */}
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Draw the green "YOU ARE HERE" marker */}
      {props.home && (
        <Marker position={props.home} icon={greenMarker}>
          <Popup>YOU ARE HERE</Popup>
        </Marker>
      )}

      {/* Draw a blue marker for each of the places passed as prop */}
      {props.places.map((p) => (
        <Marker
          key={p.name}
          position={[p.latitude, p.longitude]}
          icon={rollerMArker}
        >
          <Popup>
            {breakAddr(p.name)}{" "}
            {/* <button type="button" onClick={(e) => props.updateMarker(p.id)}>
              &#x2713;
            </button> */}
            <button
              type="buttonMarker"
              onClick={(e) => props.deleteMarker(p.id)}
            >
              X
            </button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MarkerMap;
