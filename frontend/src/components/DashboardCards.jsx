function DashboardCards() {
  const cards = [
    {
      title: "Projects",
      value: 10,
      icon: "📁",
      color: "#2563eb",
    },
    {
      title: "Sites",
      value: 25,
      icon: "📍",
      color: "#059669",
    },
    {
      title: "Solar Score",
      value: "87%",
      icon: "☀",
      color: "#f59e0b",
    },
    {
      title: "Wind Score",
      value: "74%",
      icon: "💨",
      color: "#7c3aed",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          style={{
            background: "white",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
            borderLeft: `6px solid ${card.color}`,
          }}
        >
          <h3>
            {card.icon} {card.title}
          </h3>

          <h1 style={{ color: card.color }}>
            {card.value}
          </h1>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;