def calculate_solar_score(solar_irradiance, temperature, humidity):

    score = 0

    # Solar Irradiance (60%)
    if solar_irradiance >= 7:
        score += 60
    elif solar_irradiance >= 5:
        score += 50
    elif solar_irradiance >= 3:
        score += 40
    else:
        score += 25

    # Temperature (25%)
    if 20 <= temperature <= 35:
        score += 25
    elif 15 <= temperature <= 40:
        score += 18
    else:
        score += 10

    # Humidity (15%)
    if humidity < 50:
        score += 15
    elif humidity < 70:
        score += 10
    else:
        score += 5

    return round(score, 2)


def calculate_wind_score(wind_speed, elevation):

    score = 0

    # Wind Speed (80%)
    if wind_speed >= 8:
        score += 80
    elif wind_speed >= 6:
        score += 65
    elif wind_speed >= 4:
        score += 50
    else:
        score += 30

    # Elevation (20%)
    if elevation > 1000:
        score += 20
    elif elevation > 500:
        score += 15
    elif elevation > 100:
        score += 10
    else:
        score += 5

    return round(score, 2)