import { useState } from "react";
import "./App.css";
import MapView from "./components/MapView";

function App() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeLocation = async () => {
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  if (isNaN(lat) || lat < -90 || lat > 90) {
    alert("Please enter a valid Latitude (-90 to 90).");
    return;
  }

  if (isNaN(lng) || lng < -180 || lng > 180) {
    alert("Please enter a valid Longitude (-180 to 180).");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        latitude: lat,
        longitude: lng,
      }),
    });

   const data = await response.json();

console.log("Backend Response:");
console.log(data);

setResult(data);
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container">
      <h1>☀ Solar & Wind Intelligence Platform</h1>

      <input
        type="number"
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />

      <br />
      <br />

      <button onClick={analyzeLocation} disabled={loading}>
  {loading ? "🔄 Analyzing..." : "Analyze"}
      </button>

      <br />
      <br />

      {/* Interactive Map */}
      <MapView setResult={setResult} />

      {/* Analysis Result */}
      {result && (
        <div className="result">
          <h2>Analysis Result</h2>

          <p>
            <strong>📍 Latitude:</strong> {result.latitude}
          </p>

          <p>
            <strong>📍 Longitude:</strong> {result.longitude}
          </p>

          <hr />

         <div className="weather-grid">

  <div className="weather-card">
    <h3>🌡 Temperature</h3>
    <p>{result.temperature}°C</p>
  </div>

  <div className="weather-card">
    <h3>💧 Humidity</h3>
    <p>{result.humidity}%</p>
  </div>

  <div className="weather-card">
    <h3>💨 Wind Speed</h3>
    <p>{result.wind_speed} m/s</p>
  </div>

</div>

          <hr />

          <div className="score-container">

  <div className="score">
    <p>☀ Solar Score</p>

    <div className="progress">
      <div
        className="progress-fill solar"
        style={{ width: `${result.solar_score}%` }}
      >
        {result.solar_score}%
      </div>
    </div>
  </div>

  <div className="score">
    <p>💨 Wind Score</p>

    <div className="progress">
      <div
        className="progress-fill wind"
        style={{ width: `${result.wind_score}%` }}
      >
        {result.wind_score}%
      </div>
    </div>
  </div>

</div>

          <hr />

          <div className="recommendation">
  <h3>Recommendation</h3>

  <span
    className={`badge ${
      result.recommendation.includes("Solar and Wind")
        ? "excellent"
        : result.recommendation.includes("Solar")
        ? "excellent"
        : result.recommendation.includes("Wind")
        ? "wind"
        : "moderate"
    }`}
  >
    {result.recommendation}
  </span>
</div>
        </div>
      )}
    </div>
  );
}

export default App;