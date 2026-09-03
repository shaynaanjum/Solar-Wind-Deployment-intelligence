import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function ResourceChart({ result }) {
  if (!result) return null;

  const barData = {
    labels: [
      "Solar Score",
      "Wind Score",
      "Temperature",
      "Humidity",
      "Wind Speed",
      "Solar Irradiance",
    ],

    datasets: [
      {
        label: "Environmental Analysis",

        data: [
          result.solar_score,
          result.wind_score,
          result.temperature,
          result.humidity,
          result.wind_speed,
          result.solar_irradiance,
        ],

        backgroundColor: [
          "#f59e0b",
          "#10b981",
          "#ef4444",
          "#3b82f6",
          "#06b6d4",
          "#facc15",
        ],

        borderRadius: 8,
      },
    ],
  };

  const doughnutData = {
    labels: ["Solar Score", "Wind Score"],

    datasets: [
      {
        data: [result.solar_score, result.wind_score],

        backgroundColor: ["#f59e0b", "#10b981"],

        hoverOffset: 10,
      },
    ],
  };

  const lineData = {
    labels: [
      "Temperature",
      "Humidity",
      "Wind",
      "Solar",
    ],

    datasets: [
      {
        label: "Environment Trend",

        data: [
          result.temperature,
          result.humidity,
          result.wind_speed,
          result.solar_irradiance,
        ],

        borderColor: "#2563eb",

        backgroundColor: "#93c5fd",

        fill: true,

        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div
      style={{
        marginTop: "30px",
        display: "grid",
        gap: "20px",
      }}
    >
      {/* BAR CHART */}

      <div
        style={{
          background: "#fff",
          padding: "15px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,.08)",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>
          📈 Renewable Energy Analytics
        </h2>

        <div
          style={{
            height: "280px",
          }}
        >
          <Bar
            data={barData}
            options={options}
          />
        </div>
      </div>

      {/* BOTTOM CHARTS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        {/* Doughnut */}

        <div
          style={{
            background: "#fff",
            padding: "10px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,.08)",
            textAlign: "center",
          }}
        >
          <h3>☀ Solar vs Wind Score</h3>

          <div
            style={{
              height: "320px",
              width: "320px",
              margin: "20px auto",
            }}
          >
            <Doughnut
              data={doughnutData}
              options={options}
            />
          </div>
        </div>

        {/* Line */}

        <div
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,.08)",
          }}
        >
          <h3>📊 Environmental Trend</h3>

          <div
            style={{
              height: "320px",
            }}
          >
            <Line
              data={lineData}
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResourceChart;