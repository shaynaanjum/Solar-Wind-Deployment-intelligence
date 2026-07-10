# 🌍 Solar & Wind Deployment Intelligence Platform

# Milestone 1 – Project Initialization & Core Setup

## Project Overview

The Solar & Wind Deployment Intelligence Platform is a web-based application that helps analyze the renewable energy potential of a selected location. Users can select a location using latitude and longitude or an interactive map, and the system provides weather information along with a preliminary solar and wind suitability analysis.
---
# Objectives

The objectives of Milestone 1 were to:

- Define the project objectives and workflow.
- Design the overall system architecture.
- Design the database schema.
- Set up the frontend and backend development environments.
- Develop the initial user interface.
- Build the backend API.
- Integrate weather data.
- Develop the initial renewable energy analysis module.

---

# Completed Work

## 1. Project Initialization

- Created project repository.
- Organized project folder structure.
- Configured Python virtual environment.
- Installed project dependencies.

---

## 2. Frontend Development

Developed the frontend using React and Vite.

Implemented:

- Home page
- Latitude input
- Longitude input
- Analyze button
- Loading animation
- Weather information cards
- Solar score progress bar
- Wind score progress bar
- Recommendation display

---

## 3. Interactive Map

Integrated Leaflet with OpenStreetMap.

Features:

- Interactive map
- Location selection
- Marker placement
- Automatic coordinate selection

---

## 4. Backend Development

Developed REST APIs using FastAPI.

Implemented:

- Analyze location endpoint
- Weather service integration
- JSON response generation
- Input validation

---

## 5. Database Design

Designed the initial database using SQLAlchemy.

Models created:

- User
- Project
- Site

---

## 6. Weather API Integration

Integrated OpenWeather API.

Retrieved data:

- Temperature
- Humidity
- Wind Speed
---
## 7. Renewable Energy Analysis

Implemented a basic renewable energy suitability analysis.

The analysis currently uses weather parameters to generate:

- Solar Score
- Wind Score
- Recommendation

Example Response

```json
{
    "latitude": 23.8048,
    "longitude": 79.8838,
    "temperature": 27.18,
    "humidity": 83,
    "wind_speed": 6.01,
    "solar_score": 85,
    "wind_score": 80,
    "recommendation": "Moderate Renewable Potential"
}
