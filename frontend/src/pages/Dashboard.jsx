import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import SolarCard from "../components/SolarCard";
import WindCard from "../components/WindCard";
import WeatherCard from "../components/WeatherCard";
import RecommendationCard from "../components/RecommendationCard";
import MapView from "../components/MapView";
import ResultCard from "../components/ResultCard";
import ResourceChart from "../components/ResourceChart";

import API from "../services/api";

import "./Dashboard.css";

function Dashboard() {
  const [result, setResult] = useState(null);
  const [sites, setSites] = useState([]);
  const [selectedSiteId, setSelectedSiteId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ========================================
  // LOAD SAVED SITES
  // ========================================

  const loadSites = async () => {
    try {
      const response = await API.get("/sites/");
      setSites(response.data || []);
    } catch (error) {
      console.error("Load Sites Error:", error);
      setError("Unable to load saved sites.");
    }
  };

  useEffect(() => {
    loadSites();
  }, []);

  // ========================================
  // ANALYZE SELECTED SITE
  // ========================================

  const analyzeSite = async () => {
    if (!selectedSiteId) {
      setError("Please select a site first.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await API.get(
        `/analysis/site/${selectedSiteId}`
      );

      setResult(response.data);
    } catch (error) {
      console.error("Analysis Error:", error);

      setError(
        error.response?.data?.detail ||
          "Unable to analyze this site."
      );

      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // MAP ANALYSIS RESULT
  // ========================================

  const handleMapResult = (data) => {
    setResult(data);
    setError("");
  };

  // ========================================
  // SELECTED SITE
  // ========================================

  const selectedSite = sites.find(
    (site) =>
      String(site.id) === String(selectedSiteId)
  );

  // ========================================
  // RENEWABLE SCORE
  // ========================================

  const renewableScore = selectedSite
    ? (
        (Number(selectedSite.solar_score || 0) +
          Number(selectedSite.wind_score || 0)) /
        2
      ).toFixed(1)
    : "--";

  // ========================================
  // DEPLOYMENT DECISION
  // ========================================

  const getDeploymentDecision = () => {
    if (!selectedSite) {
      return "Select a site to generate a deployment decision.";
    }

    const solar = Number(
      selectedSite.solar_score || 0
    );

    const wind = Number(
      selectedSite.wind_score || 0
    );

    const average = (solar + wind) / 2;

    if (average >= 75) {
      return "High priority renewable deployment site.";
    }

    if (average >= 50) {
      return "Moderate potential. Detailed feasibility assessment recommended.";
    }

    return "Low renewable potential. Consider alternative locations.";
  };

  return (
    <Layout>
      <div className="dashboard-page">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="dashboard-header">
          <h1>📊 Analysis Dashboard</h1>

          <p>
            Solar & Wind Deployment Intelligence
          </p>
        </div>


        {/* ================================= */}
        {/* SITE INTELLIGENCE CONTROL */}
        {/* ================================= */}

        <div
          className="analysis-control"
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "25px",
            border: "1px solid #e5e7eb",
          }}
        >

          <h2>
            🔍 Site Intelligence Engine
          </h2>

          <p>
            Select a saved renewable-energy site
            and run the intelligence analysis.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "15px",
            }}
          >

            <select
              value={selectedSiteId}
              onChange={(e) => {
                setSelectedSiteId(e.target.value);
                setResult(null);
                setError("");
              }}
              style={{
                flex: "1",
                minWidth: "250px",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "15px",
              }}
            >

              <option value="">
                Select a saved site
              </option>

              {sites.map((site) => (
                <option
                  key={site.id}
                  value={site.id}
                >
                  {site.location_name ||
                    `Site #${site.id}`}
                </option>
              ))}

            </select>


            <button
              onClick={analyzeSite}
              disabled={
                loading || !selectedSiteId
              }
              style={{
                padding: "12px 24px",
                border: "none",
                borderRadius: "8px",
                background: loading
                  ? "#9ca3af"
                  : "#2563eb",
                color: "#ffffff",
                fontWeight: "600",
                cursor:
                  loading || !selectedSiteId
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              {loading
                ? "⏳ Analyzing..."
                : "⚡ Analyze Site"}
            </button>

          </div>


          {/* ERROR */}

          {error && (
            <div
              style={{
                marginTop: "15px",
                padding: "12px",
                borderRadius: "8px",
                background: "#fee2e2",
                color: "#991b1b",
              }}
            >
              ❌ {error}
            </div>
          )}

        </div>


        {/* ================================= */}
        {/* SELECTED SITE INTELLIGENCE */}
        {/* ================================= */}

        {selectedSite && (
          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "25px",
              border: "1px solid #e5e7eb",
            }}
          >

            <h2>
              📍 {selectedSite.location_name ||
                `Site #${selectedSite.id}`}
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "15px",
                marginTop: "15px",
              }}
            >

              <div>
                <strong>☀ Solar Score</strong>
                <h3>
                  {selectedSite.solar_score}/100
                </h3>
              </div>

              <div>
                <strong>💨 Wind Score</strong>
                <h3>
                  {selectedSite.wind_score}/100
                </h3>
              </div>

              <div>
                <strong>⚡ Renewable Score</strong>
                <h3>
                  {renewableScore}/100
                </h3>
              </div>

              <div>
                <strong>🌬 Wind Potential</strong>
                <h3>
                  {selectedSite.wind_potential}
                </h3>
              </div>

            </div>


            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "8px",
                background: "#eff6ff",
              }}
            >

              <strong>
                🚀 Deployment Decision
              </strong>

              <p>
                {getDeploymentDecision()}
              </p>

            </div>

          </div>
        )}


        {/* ================================= */}
        {/* TOP STATISTICS */}
        {/* ================================= */}

        <div className="stats-grid">

          {/* SOLAR */}

          <div
            className="stat-card solar"
            style={{
              background:
                "linear-gradient(135deg, #f59e0b, #f97316)",
            }}
          >

            <span>
              ☀ Solar Irradiance
            </span>

            <h2>
              {result?.solar_irradiance ?? "--"}
            </h2>

            <small>
              kWh/m²/day
            </small>

          </div>


          {/* TEMPERATURE */}

          <div
            className="stat-card weather"
            style={{
              background: "#ffffff",
              color: "#111827",
              border:
                "1px solid #e5e7eb",
            }}
          >

            <span
              style={{
                color: "#374151",
                fontWeight: "600",
              }}
            >
              🌡 Temperature
            </span>

            <h2
              style={{
                color: "#111827",
              }}
            >
              {result?.temperature ?? "--"}
            </h2>

            <small
              style={{
                color: "#6b7280",
              }}
            >
              °C
            </small>

          </div>


          {/* WIND */}

          <div
            className="stat-card wind"
            style={{
              background:
                "linear-gradient(135deg, #16a34a, #10b981)",
            }}
          >

            <span>
              💨 Wind Speed
            </span>

            <h2>
              {result?.wind_speed ?? "--"}
            </h2>

            <small>
              m/s
            </small>

          </div>


          {/* HUMIDITY */}

          <div
            className="stat-card humidity"
            style={{
              background:
                "linear-gradient(135deg, #0891b2, #06b6d4)",
            }}
          >

            <span>
              💧 Humidity
            </span>

            <h2>
              {result?.humidity ?? "--"}
            </h2>

            <small>
              %
            </small>

          </div>

        </div>


        {/* ================================= */}
        {/* ANALYSIS CARDS */}
        {/* ================================= */}

        <div className="dashboard-grid">

          <SolarCard
            result={result}
          />

          <WindCard
            result={result}
          />

          <WeatherCard
            result={result}
          />

          <RecommendationCard
            result={result}
          />

        </div>


        {/* ================================= */}
        {/* MAP ANALYSIS */}
        {/* ================================= */}

        <div className="map-section">

          <div className="section-header">

            <h2>
              🗺 Location Analysis
            </h2>

            <p>
              Analyze solar and wind potential
              for a location.
            </p>

          </div>

          <MapView
            setResult={handleMapResult}
          />

        </div>


        {/* ================================= */}
        {/* ANALYSIS RESULT */}
        {/* ================================= */}

        <div className="result-section">

          <ResultCard
            result={result}
          />

        </div>


        {/* ================================= */}
        {/* RESOURCE CHART */}
        {/* ================================= */}

        <div className="chart-section">

          {result && (
            <ResourceChart
              result={result}
            />
          )}

        </div>


        {/* ================================= */}
        {/* MILESTONE 3 STATUS */}
        {/* ================================= */}

        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            marginTop: "25px",
            border: "1px solid #e5e7eb",
          }}
        >

          <h2>
            📈 Deployment Intelligence Status
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "15px",
              marginTop: "15px",
            }}
          >

            <div>
              <strong>
                🧠 Site Intelligence
              </strong>

              <p>
                {selectedSite
                  ? "Operational"
                  : "Awaiting site"}
              </p>
            </div>


            <div>
              <strong>
                ⚙ Optimization
              </strong>

              <p>
                {selectedSite
                  ? "Site comparison available"
                  : "Awaiting site"}
              </p>
            </div>


            <div>
              <strong>
                📊 Forecasting
              </strong>

              <p>
                {result
                  ? "Analysis data available"
                  : "Awaiting analysis"}
              </p>
            </div>


            <div>
              <strong>
                💰 Recommendation
              </strong>

              <p>
                {selectedSite
                  ? selectedSite.recommendation ||
                    "Generated"
                  : "Awaiting site"}
              </p>
            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;