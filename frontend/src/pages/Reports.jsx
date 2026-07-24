import { useState } from "react";
import Layout from "../components/Layout";
import jsPDF from "jspdf";

function Reports() {
  const [report, setReport] = useState(null);

  const generateReport = () => {
    const latestResult = localStorage.getItem("latestAnalysis");

    if (!latestResult) {
      alert("No analysis available. Please analyze a location first.");
      return;
    }

    setReport(JSON.parse(latestResult));
  };

  const downloadPDF = () => {
    if (!report) {
      alert("Please generate a report first.");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Renewable Energy Assessment Report", 20, 20);

    doc.setFontSize(12);

    let y = 40;

    doc.text(`Latitude : ${report.latitude}`, 20, y);
    y += 10;

    doc.text(`Longitude : ${report.longitude}`, 20, y);
    y += 10;

    doc.text(`Temperature : ${report.temperature} °C`, 20, y);
    y += 10;

    doc.text(`Humidity : ${report.humidity}%`, 20, y);
    y += 10;

    doc.text(`Wind Speed : ${report.wind_speed} m/s`, 20, y);
    y += 10;

    doc.text(
      `Solar Irradiance : ${report.solar_irradiance} kWh/m²/day`,
      20,
      y
    );
    y += 10;

    doc.text(`Solar Score : ${report.solar_score}`, 20, y);
    y += 10;

    doc.text(`Wind Score : ${report.wind_score}`, 20, y);
    y += 10;

    doc.text(`Wind Potential : ${report.wind_potential}`, 20, y);
    y += 10;

    doc.text(`Elevation : ${report.elevation} meters`, 20, y);
    y += 10;

    doc.text(`Recommendation : ${report.recommendation}`, 20, y);
    y += 15;

    doc.text(
      `Generated On : ${new Date().toLocaleString()}`,
      20,
      y
    );

    doc.save("Renewable_Energy_Report.pdf");
  };

  return (
    <Layout>
      <h1>📄 Resource Assessment Reports</h1>

      <button
        onClick={generateReport}
        style={{
          background: "#16a34a",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "15px",
          marginRight: "10px",
        }}
      >
        Generate Report
      </button>

      <button
        onClick={downloadPDF}
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "25px",
        }}
      >
        📥 Download PDF
      </button>

      {!report ? (
        <p>No report generated.</p>
      ) : (
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2>🌍 Renewable Energy Assessment Report</h2>

          <hr />

          <h3>📍 Location</h3>
          <p><strong>Latitude:</strong> {report.latitude}</p>
          <p><strong>Longitude:</strong> {report.longitude}</p>

          <hr />

          <h3>🌦 Weather</h3>
          <p><strong>Temperature:</strong> {report.temperature} °C</p>
          <p><strong>Humidity:</strong> {report.humidity} %</p>
          <p><strong>Wind Speed:</strong> {report.wind_speed} m/s</p>

          <hr />

          <h3>☀ Solar Resource</h3>
          <p><strong>Solar Irradiance:</strong> {report.solar_irradiance} kWh/m²/day</p>
          <p><strong>Solar Score:</strong> {report.solar_score}</p>

          <hr />

          <h3>💨 Wind Resource</h3>
          <p><strong>Wind Score:</strong> {report.wind_score}</p>
          <p><strong>Wind Potential:</strong> {report.wind_potential}</p>

          <hr />

          <h3>⛰ Terrain</h3>
          <p><strong>Elevation:</strong> {report.elevation} meters</p>

          <hr />

          <h3>✅ Recommendation</h3>

          <p
            style={{
              color: "green",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {report.recommendation}
          </p>

          <hr />

          <p>
            <strong>Generated On:</strong>{" "}
            {new Date().toLocaleString()}
          </p>
        </div>
      )}
    </Layout>
  );
}

export default Reports;