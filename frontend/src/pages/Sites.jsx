import { useEffect, useState } from "react";
import API from "../services/api";
import SitesMap from "../components/SitesMap";
import Layout from "../components/Layout";

function Sites() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
 const [solarScore, setSolarScore] = useState("");
const [windScore, setWindScore] = useState("");
const [windPotential, setWindPotential] = useState("");
const [recommendation, setRecommendation] = useState("");

  const [sites, setSites] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Load all sites
  const loadSites = async () => {
    try {
      const response = await API.get("/sites/");
      setSites(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadSites();
  }, []);

  // Save Site
  const saveSite = async () => {
    try {
          await API.post("/sites/", {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        solar_score: parseFloat(solarScore),
        wind_score: parseFloat(windScore),
        wind_potential: parseFloat(windPotential),
        recommendation,
      });

      alert("Site Created Successfully");

      clearForm();
      loadSites();
    } catch (error) {
      alert("Error Creating Site");
    }
  };

  // Edit Site
  const editSite = (site) => {
    setLatitude(site.latitude);
    setLongitude(site.longitude);
    setSolarScore(site.solar_score);
    setWindScore(site.wind_score);
    setWindPotential(site.wind_potential);
    setRecommendation(site.recommendation);
    setEditingId(site.id);
  };

  // Update Site
  const updateSite = async () => {
    try {
    await API.put(`/sites/${editingId}`, {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        solar_score: parseFloat(solarScore),
        wind_score: parseFloat(windScore),
        wind_potential: parseFloat(windPotential),
        recommendation,
      });

      alert("Site Updated Successfully");

      clearForm();
      loadSites();
    } catch (error) {
      alert("Error Updating Site");
    }
  };

  // Delete Site
  const deleteSite = async (id) => {
    if (!window.confirm("Are you sure you want to delete this site?")) return;

    try {
      await API.delete(`/sites/${id}`);

      alert("Site Deleted Successfully");

      loadSites();
    } catch (error) {
      alert("Error Deleting Site");
    }
  };

  // Clear Form
  const clearForm = () => {
    setLatitude("");
    setLongitude("");
    setSolarScore("");
    setWindScore("");
    setWindPotential("");
    setRecommendation("");
    setEditingId(null);
  };

  return (
    <Layout>
      <h1>📍 Site Management</h1>

      <h2>{editingId ? "Edit Site" : "Add New Site"}</h2>

      <input
        type="number"
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          display: "block",
          marginBottom: "10px",
        }}
      />

      <input
        type="number"
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          display: "block",
          marginBottom: "10px",
        }}
      />

      <input
        type="number"
        placeholder="Solar Score"
        value={solarScore}
        onChange={(e) => setSolarScore(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          display: "block",
          marginBottom: "10px",
        }}
      />

      <input
        type="number"
        placeholder="Wind Score"
        value={windScore}
        onChange={(e) => setWindScore(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          display: "block",
          marginBottom: "10px",
        }}
      />

          <input
        type="number"
        placeholder="Wind Potential"
        value={windPotential}
        onChange={(e) => setWindPotential(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          display: "block",
          marginBottom: "10px",
        }}
      />

      <input
        type="text"
        placeholder="Recommendation"
        value={recommendation}
        onChange={(e) => setRecommendation(e.target.value)}
        style={{
          width: "300px",
          padding: "10px",
          display: "block",
          marginBottom: "20px",
        }}
      />

      <button
        onClick={editingId ? updateSite : saveSite}
        style={{
          padding: "10px 20px",
          background: editingId ? "#f59e0b" : "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "30px",
        }}
      >
        {editingId ? "Update Site" : "Save Site"}
      </button>

      <hr />

      <h2>All Sites</h2>

      {sites.length === 0 ? (
        <p>No sites available.</p>
      ) : (
        sites.map((site) => (
          <div
            key={site.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              background: "white",
            }}
          >
            <p><strong>ID:</strong> {site.id}</p>
            <p><strong>Latitude:</strong> {site.latitude}</p>
            <p><strong>Longitude:</strong> {site.longitude}</p>
            <p><strong>Solar Score:</strong> {site.solar_score}</p>

            <p><strong>Wind Score:</strong> {site.wind_score}</p>

            <p><strong>Wind Potential:</strong> {site.wind_potential}</p>

            <p><strong>Recommendation:</strong> {site.recommendation}</p>
            <button
              onClick={() => editSite(site)}
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              ✏ Edit
            </button>

            <button
              onClick={() => deleteSite(site.id)}
              style={{
                background: "#dc2626",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: "5px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
            >
              🗑 Delete
            </button>
          </div>
        ))
      )}

      <hr style={{ margin: "30px 0" }} />

      <h2>🗺 Site Locations</h2>

      <SitesMap sites={sites} />
    </Layout>
  );
}

export default Sites;