function Sidebar() {
  return (
    <div
      style={{
        width: "230px",
        background: "#1f2937",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>Navigation</h2>

      <hr />

      <p>🏠 Dashboard</p>
      <p>☀ Solar Analysis</p>
      <p>🌬 Wind Analysis</p>
      <p>🌤 Weather</p>
      <p>🗺 Map</p>
      <p>📊 Reports</p>
      <p>⚙ Settings</p>
    </div>
  );
}

export default Sidebar;