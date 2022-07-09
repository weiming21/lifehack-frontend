import React from "react"; //   useRef, //   // useReducer, //   useEffect, //   useState,

import { GoogleMap, Marker, Circle } from "@react-google-maps/api";
function distance(lat1, lat2, lon1, lon2) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;

  // calculate the result
  return c * r;
}

function Map(props) {
  const defaultCentre = { lat: 1.356126, lng: 103.812442 };
  const target = props.markerArray[0];

  const jsonData = require("../../store/busstop.json");
  // const arrayOfPoints = props.markerArray;

  let arrayOfPoints = jsonData.value.map((data) => {
    return {
      lat: data.Latitude,
      lng: data.Longitude,
    };
  });

  arrayOfPoints = arrayOfPoints.filter((coord) => {
    return target
      ? distance(coord.lat, target.lat, coord.lng, target.lng) < 0.5
      : false;
  });

  return (
    <GoogleMap
      zoom={target ? 16 : 11}
      center={target ? target : defaultCentre}
      mapContainerClassName="map-container"
    >
      {target && <Circle center={target} radius={500} />}
      {target &&
        arrayOfPoints.map((point) => {
          return <Marker position={point} />;
        })}
    </GoogleMap>
  );
}

export default Map;
