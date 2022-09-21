import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../store/mapSlice";
import "./MapBox.scss";
import "leaflet/dist/leaflet.css";
import mapi from "../../assets/placeholdercurrent.png";
import micon from "../../assets/pin.png";

const icon = new L.icon({
  iconUrl: mapi,
  iconSize: [30, 30],
});

const markIcon = new L.icon({
  iconUrl: micon,
  iconSize: [30, 30],
});

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);


  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      // const radius = e.accuracy - 1000;
      const radius = 1000;
      const circle = L.circle(e.latlng, radius);
      circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));
    });

  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>
        You are here. <br />
        Map bbox: <br />
        <b>Southwest lng</b>: {bbox[0]} <br />
        <b>Southwest lat</b>: {bbox[1]} <br />
        <b>Northeast lng</b>: {bbox[2]} <br />
        <b>Northeast lat</b>: {bbox[3]}
      </Popup>
    </Marker>
  );
}

const MapBox = () => {
  const [map, setMap] = useState(null);
  // const [coords, setCoords] = useState({});
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const _data = useSelector((state)=>state.map.data)

  useEffect(() => {
    if (!map) return;

    map.addEventListener("click", (e) => {
      // setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
      dispatch(add({ status: true , marker: [e.latlng.lat , e.latlng.lng]}));
    });

    setData(JSON.parse(localStorage.getItem('_data')));
  }, [dispatch, map , _data]);



    //  const { lat, lng } = coords;



  return (
    <div className="map">
      <MapContainer
        center={[49.1951, 16.6068]}
        zoom={13}
        scrollWheelZoom
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        {data.map((mark,i)=> 
        <Marker key={i} position={mark.marker} icon={markIcon}>
        <Popup>
          <h1>{mark.message}</h1>
        </Popup>
        </Marker>)}
      </MapContainer>
    </div>
  );
};

export default MapBox;
