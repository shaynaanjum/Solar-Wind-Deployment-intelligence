import requests

API_KEY = "ad15a8ee2cfe82751eb9217b6e09b4fc"

def get_weather(latitude, longitude):
    url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?lat={latitude}&lon={longitude}&appid={API_KEY}&units=metric"
    )

    response = requests.get(url)

    if response.status_code == 200:
        return response.json()

    return None