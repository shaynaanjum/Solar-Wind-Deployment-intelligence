import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SolarCard from "../components/SolarCard";
import WindCard from "../components/WindCard";
import WeatherCard from "../components/WeatherCard";
import RecommendationCard from "../components/RecommendationCard";
import MapView from "../components/MapView";
import ResultCard from "../components/ResultCard";

function Dashboard() {
  const [result, setResult] = useState(null);

  return (
    <>
      <Navbar />

      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "20px" }}>
          <h1>Dashboard</h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "20px",
            }}
          >
            <SolarCard />
            <WindCard />
            <WeatherCard />
            <RecommendationCard />
          </div>

          <div style={{ marginTop: "30px" }}>
            <MapView setResult={setResult} />
          </div>

          <ResultCard result={result} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;