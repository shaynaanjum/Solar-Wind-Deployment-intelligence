import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useState } from "react";
import { analyzeLocation } from "../services/locationService";

function LocationMarker({ setResult }) {
  const [position, setPosition] = useState([23.1815, 79.9864]);

  useMapEvents({
    async click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      setPosition([lat, lng]);

      try {
        const response = await analyzeLocation(lat, lng);
        setResult(response);
        localStorage.setItem("latestAnalysis", JSON.stringify(response));
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Marker position={position}>
      <Popup>
        Latitude: {position[0].toFixed(5)}
        <br />
        Longitude: {position[1].toFixed(5)}
      </Popup>
    </Marker>
  );
}

function MapView({ setResult }) {
  return (
    <div
      style={{
        height: "500px",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={[23.1815, 79.9864]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker setResult={setResult} />
      </MapContainer>
    </div>
  );
}

export default MapView;