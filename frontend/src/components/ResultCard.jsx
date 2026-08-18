function ResultCard({ result }) {
  if (!result) {
    return (
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          marginTop: "25px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h2>📊 Renewable Energy Analysis</h2>
        <p style={{ color: "#666", marginTop: "15px" }}>
          Click anywhere on the map to analyze a location.
        </p>
      </div>
    );
  }

  const cardStyle = {
    background: "#fff",
    borderRadius: "18px",
    padding: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  };

  const infoCard = {
    background: "#f8fafc",
    borderRadius: "14px",
    padding: "18px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  };

  return (
    <div
      style={{
        marginTop: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "25px",
      }}
    >
      {/* Heading */}

      <div style={cardStyle}>
        <h1 style={{ margin: 0 }}>📊 Renewable Energy Analysis</h1>
        <p style={{ color: "#666", marginTop: "8px" }}>
          Environmental, Terrain & Renewable Energy Statistics
        </p>
      </div>

      {/* Location + Weather */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <div style={cardStyle}>
          <h2>📍 Location</h2>

          <p>
            <strong>Latitude</strong>
            <br />
            {result.latitude}
          </p>

          <p>
            <strong>Longitude</strong>
            <br />
            {result.longitude}
          </p>

          <p>
            <strong>Elevation</strong>
            <br />
            {result.elevation} meters
          </p>
        </div>

        <div style={cardStyle}>
          <h2>🌤 Weather</h2>

          <p>
            <strong>Temperature</strong>
            <br />
            {result.temperature} °C
          </p>

          <p>
            <strong>Humidity</strong>
            <br />
            {result.humidity} %
          </p>

          <p>
            <strong>Wind Speed</strong>
            <br />
            {result.wind_speed} m/s
          </p>
        </div>
      </div>

      {/* Solar Prediction */}

      <div style={cardStyle}>
        <h2>☀ Solar Potential Prediction</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "18px",
            marginTop: "20px",
          }}
        >
          <div style={infoCard}>
            <h3>Solar Irradiance</h3>
            <h2>{result.solar_irradiance}</h2>
            <p>kWh/m²/day</p>
          </div>

          <div style={infoCard}>
            <h3>Solar Score</h3>
            <h2>{result.solar_score}</h2>
            <p>/100</p>
          </div>

          <div style={infoCard}>
            <h3>Elevation</h3>
            <h2>{result.elevation}</h2>
            <p>meters</p>
          </div>

          <div
            style={{
              ...infoCard,
              background: "#dcfce7",
            }}
          >
            <h3>Potential</h3>

            <h2 style={{ color: "#15803d" }}>
              {result.solar_score >= 80
                ? "Excellent"
                : result.solar_score >= 60
                ? "Good"
                : "Moderate"}
            </h2>
          </div>
        </div>
      </div>

      {/* Wind Prediction */}

      <div style={cardStyle}>
        <h2>💨 Wind Potential Prediction</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "18px",
            marginTop: "20px",
          }}
        >
          <div style={infoCard}>
            <h3>Wind Speed</h3>
            <h2>{result.wind_speed}</h2>
            <p>m/s</p>
          </div>

          <div style={infoCard}>
            <h3>Wind Score</h3>
            <h2>{result.wind_score}</h2>
            <p>/100</p>
          </div>

          <div style={infoCard}>
            <h3>Wind Potential</h3>
            <h2>{result.wind_potential}</h2>
          </div>

          <div
            style={{
              ...infoCard,
              background: "#e0f2fe",
            }}
          >
            <h3>Status</h3>

            <h2 style={{ color: "#0369a1" }}>
              {result.wind_score >= 70
                ? "Recommended"
                : "Average"}
            </h2>
          </div>
        </div>
      </div>

      {/* Recommendation */}

      <div
        style={{
          background: "linear-gradient(135deg,#16a34a,#22c55e)",
          color: "#fff",
          borderRadius: "18px",
          padding: "25px",
          boxShadow: "0 10px 25px rgba(0,0,0,.12)",
        }}
      >
        <h2>✅ Final Recommendation</h2>

        <h1>{result.recommendation}</h1>

        <p>
          Solar Score : {result.solar_score}/100
        </p>

        <p>
          Wind Score : {result.wind_score}/100
        </p>
      </div>
    </div>
  );
}

export default ResultCard;