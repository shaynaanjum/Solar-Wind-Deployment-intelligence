from app.services.weather_service import get_weather

def analyze_location(latitude, longitude):

    weather = get_weather(latitude, longitude)

    temperature = weather["main"]["temp"]
    humidity = weather["main"]["humidity"]
    wind_speed = weather["wind"]["speed"]

    if temperature > 30:
        solar_score = 95
    elif temperature > 20:
        solar_score = 85
    else:
        solar_score = 70

    if wind_speed > 7:
        wind_score = 95
    elif wind_speed > 4:
        wind_score = 80
    else:
        wind_score = 60

    if solar_score >= 90 and wind_score >= 90:
        recommendation = "Excellent for Solar & Wind"
    elif solar_score >= 90:
        recommendation = "Excellent for Solar"
    elif wind_score >= 90:
        recommendation = "Excellent for Wind"
    else:
        recommendation = "Moderate Renewable Potential"

    return {
        "latitude": latitude,
        "longitude": longitude,
        "temperature": temperature,
        "humidity": humidity,
        "wind_speed": wind_speed,
        "solar_score": solar_score,
        "wind_score": wind_score,
        "recommendation": recommendation,
    }