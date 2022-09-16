import React from "react";
import { DirectionsRenderer, GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { add } from "../../store/mapSlice";
import "./Map.scss";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

let center = {
  lat: 0,
  lng: 0,
};

getLocation();
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}

function showPosition(position) {
  center.lat = position.coords.latitude;
  center.lng = position.coords.longitude;
}

const Map = () => {
  // const [center, setCenter] = useState([25.594095, 85.137566])
  const dispatch = useDispatch();

  const mapHandler = () => {
    dispatch(add({ status: true }));
  };

  return (
    <div onClick={mapHandler} className="map">
      <LoadScript googleMapsApiKey="AIzaSyAet8Mk1nPvOn_AebLE5ZxXoGejOD8tPzA">
        <GoogleMap
          onLoad={(map) => {
            const bounds = new window.google.maps.LatLngBounds(center);
            map.fitBounds(bounds);
          }}
          mapContainerStyle={containerStyle}
          zoom={9}
        >

          <Marker position={center} />
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
