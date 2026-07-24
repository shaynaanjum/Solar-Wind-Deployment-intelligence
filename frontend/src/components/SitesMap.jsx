import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function SitesMap({ sites }) {
  return (
    <div
      style={{
        height: "500px",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={[23.2599, 77.4126]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {sites.map((site) => (
          <Marker
            key={site.id}
            position={[site.latitude, site.longitude]}
          >
            <Popup>
              <h3>Site #{site.id}</h3>

              <p><strong>Latitude:</strong> {site.latitude}</p>
              <p><strong>Longitude:</strong> {site.longitude}</p>
              <p><strong>Solar Score:</strong> {site.solar_score}</p>
             <p>
                <strong>Wind Score:</strong> {site.wind_score}
              </p>

              <p>
                <strong>Wind Potential:</strong> {site.wind_potential}
              </p>

              <p>
                <strong>Recommendation:</strong>
                <br />
                {site.recommendation}
              </p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default SitesMap;