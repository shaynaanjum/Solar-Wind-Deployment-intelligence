function ResultCard({ result }) {
  if (!result) {
    return (
      <div style={{ padding: "20px", background: "white", marginTop: "20px" }}>
        Click on the map to analyze a location.
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", background: "white", marginTop: "20px" }}>
      <h2>Analysis Result</h2>

      <p><strong>Latitude:</strong> {result.latitude}</p>

      <p><strong>Longitude:</strong> {result.longitude}</p>

      <p><strong>Solar Score:</strong> {result.solar_score}</p>

      <p><strong>Wind Score:</strong> {result.wind_score}</p>

      <p><strong>Recommendation:</strong> {result.recommendation}</p>
    </div>
  );
}

export default ResultCard;