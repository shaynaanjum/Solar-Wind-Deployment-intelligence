import { useState } from "react";
import Layout from "../components/Layout";
import SolarCard from "../components/SolarCard";
import WindCard from "../components/WindCard";
import WeatherCard from "../components/WeatherCard";
import RecommendationCard from "../components/RecommendationCard";
import MapView from "../components/MapView";
import ResultCard from "../components/ResultCard";
import ResourceChart from "../components/ResourceChart";

import "./Dashboard.css";

function Dashboard() {
  const [result, setResult] = useState(null);

  return (
    <Layout>

      {/* Dashboard Header */}

      <div className="dashboard-header">
        <h1>📊 Analysis Dashboard</h1>
        <p>Environmental, Terrain & GIS Statistics</p>
      </div>

      {/* Top Statistics */}

      <div className="stats-grid">

        <div className="stat-card solar">
          <span>☀ Solar Potential</span>
          <h2>
            {result ? result.solar_irradiance : "--"}
          </h2>
          <small>kWh/m²/day</small>
        </div>

        <div className="stat-card weather">
          <span>🌡 Temperature</span>
          <h2>
            {result ? result.temperature : "--"}
          </h2>
          <small>°C</small>
        </div>

        <div className="stat-card wind">
          <span>💨 Wind Speed</span>
          <h2>
            {result ? result.wind_speed : "--"}
          </h2>
          <small>m/s</small>
        </div>

        <div className="stat-card elevation">
          <span>⛰ Elevation</span>
          <h2>
            {result ? result.elevation : "--"}
          </h2>
          <small>Meters</small>
        </div>

      </div>

      {/* Existing Cards */}

      <div className="dashboard-grid">
        <SolarCard />
        <WindCard />
        <WeatherCard />
        <RecommendationCard />
      </div>

      {/* Map */}

      <div className="map-section">
        <MapView setResult={setResult} />
      </div>

      {/* Analysis Result */}

      <div className="result-section">
        <ResultCard result={result} />
      </div>

      {/* Charts */}

      <div className="chart-section">
        <ResourceChart result={result} />
      </div>

    </Layout>
  );
}

export default Dashboard;