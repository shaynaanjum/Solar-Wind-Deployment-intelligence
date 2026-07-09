import api from "../api/api";

export const analyzeLocation = async (latitude, longitude) => {
  const response = await api.post("/analyze", {
    latitude,
    longitude,
  });

  return response.data;
};