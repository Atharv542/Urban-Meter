import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

// Fix default marker issue in Leaflet with React
import markerIconPng from "leaflet/dist/images/marker-icon.png";

const MapComponent = ({ start, end }) => {
  const position = start ? [start.lat, start.lon] : [28.6139, 77.2090]; // Default to Delhi

  return (
    <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      {start && (
        <Marker position={[start.lat, start.lon]} icon={L.icon({ iconUrl: markerIconPng })}>
          <Popup>Start: {start.name}</Popup>
        </Marker>
      )}
      {end && (
        <Marker position={[end.lat, end.lon]} icon={L.icon({ iconUrl: markerIconPng })}>
          <Popup>End: {end.name}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
