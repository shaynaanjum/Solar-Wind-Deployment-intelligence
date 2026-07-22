from app.services.weather_service import get_weather
from app.services.nasa_power_service import get_nasa_power_data
from app.services.terrain_service import get_elevation
from app.services.prediction_service import (
    calculate_solar_score,
    calculate_wind_score,
)


def analyze_location(latitude, longitude):

    # Weather Data
    weather = get_weather(latitude, longitude)

    temperature = weather["main"]["temp"]
    humidity = weather["main"]["humidity"]
    wind_speed = weather["wind"]["speed"]

    # NASA POWER Data
    solar_data = get_nasa_power_data(latitude, longitude)
    solar_irradiance = solar_data["solar_irradiance"]

    # Terrain Data
    elevation = get_elevation(latitude, longitude)

    # Prediction Models
    solar_score = calculate_solar_score(
        solar_irradiance,
        temperature,
        humidity,
    )

    wind_score = calculate_wind_score(
        wind_speed,
        elevation,
    )

    # Wind Potential
    wind_potential = round(wind_speed * 12.5, 2)

    # Recommendation
    if solar_score >= 90 and wind_score >= 90:
        recommendation = "Excellent for Solar & Wind"

    elif solar_score >= 85:
        recommendation = "Excellent for Solar"

    elif wind_score >= 85:
        recommendation = "Excellent for Wind"

    elif solar_score >= 70 and wind_score >= 70:
        recommendation = "Good Renewable Energy Potential"

    else:
        recommendation = "Moderate Renewable Potential"

    return {
        "latitude": latitude,
        "longitude": longitude,

        "temperature": temperature,
        "humidity": humidity,
        "wind_speed": wind_speed,

        "solar_irradiance": solar_irradiance,
        "elevation": elevation,

        "solar_score": solar_score,
        "wind_score": wind_score,
        "wind_potential": wind_potential,

        "recommendation": recommendation,
    }