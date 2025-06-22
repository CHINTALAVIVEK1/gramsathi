from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import requests
from typing import Optional, List
import json

router = APIRouter()

class WeatherResponse(BaseModel):
    location: str
    state: Optional[str] = None
    country: str
    temperature: float
    feels_like: float
    humidity: int
    description: str
    wind_speed: float
    pressure: int
    visibility: Optional[float] = None
    uv_index: Optional[float] = None
    icon: Optional[str] = None

class ForecastDay(BaseModel):
    date: str
    temperature_max: float
    temperature_min: float
    description: str
    humidity: int
    icon: Optional[str] = None

class ForecastResponse(BaseModel):
    location: str
    forecast: List[ForecastDay]

# Indian cities database
INDIAN_CITIES = [
    # Major metros
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad",
    # State capitals
    "Lucknow", "Jaipur", "Bhopal", "Gandhinagar", "Thiruvananthapuram", "Panaji", "Shimla",
    "Srinagar", "Jammu", "Chandigarh", "Dehradun", "Ranchi", "Patna", "Raipur", "Bhubaneswar",
    "Guwahati", "Agartala", "Aizawl", "Kohima", "Itanagar", "Imphal", "Shillong", "Gangtok",
    # Other major cities
    "Agra", "Varanasi", "Kanpur", "Nagpur", "Indore", "Thane", "Visakhapatnam", "Vadodara",
    "Faridabad", "Ghaziabad", "Ludhiana", "Rajkot", "Kochi", "Coimbatore", "Madurai", "Jodhpur",
    "Gwalior", "Vijayawada", "Mysore", "Salem", "Meerut", "Nashik", "Aurangabad", "Allahabad",
    "Amritsar", "Bareilly", "Moradabad", "Gurgaon", "Aligarh", "Jalandhar", "Tiruchirappalli",
    "Bhubaneswar", "Cuttack", "Bikaner", "Udaipur", "Ajmer", "Bhilai", "Durg", "Rourkela"
]

@router.get("/cities")
async def get_indian_cities():
    """Get list of supported Indian cities"""
    return {"cities": sorted(INDIAN_CITIES)}

@router.get("/current/{location}", response_model=WeatherResponse)
async def get_current_weather(location: str):
    """Get current weather for a location in India"""
    api_key = os.getenv("OPENWEATHER_API_KEY")

    # Add India to location for better accuracy
    search_location = f"{location},IN" if location in INDIAN_CITIES else location

    if not api_key:
        # Return realistic mock data for Indian cities
        return WeatherResponse(
            location=location,
            state="Sample State",
            country="India",
            temperature=28.5,
            feels_like=32.0,
            humidity=65,
            description="Partly cloudy",
            wind_speed=12.5,
            pressure=1013,
            visibility=10.0,
            uv_index=6.5,
            icon="02d"
        )

    try:
        url = "http://api.openweathermap.org/data/2.5/weather"
        params = {
            "q": search_location,
            "appid": api_key,
            "units": "metric"
        }

        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()

        return WeatherResponse(
            location=data["name"],
            state=data.get("sys", {}).get("state", ""),
            country=data["sys"]["country"],
            temperature=round(data["main"]["temp"], 1),
            feels_like=round(data["main"]["feels_like"], 1),
            humidity=data["main"]["humidity"],
            description=data["weather"][0]["description"].title(),
            wind_speed=round(data["wind"]["speed"] * 3.6, 1),  # Convert m/s to km/h
            pressure=data["main"]["pressure"],
            visibility=round(data.get("visibility", 0) / 1000, 1) if data.get("visibility") else None,
            uv_index=None,  # UV index requires separate API call
            icon=data["weather"][0]["icon"]
        )
    except requests.RequestException as e:
        print(f"Weather API error: {e}")
        raise HTTPException(status_code=500, detail=f"Weather service unavailable for {location}")
    except KeyError as e:
        print(f"Weather data parsing error: {e}")
        raise HTTPException(status_code=500, detail="Invalid weather data received")

@router.get("/forecast/{location}", response_model=ForecastResponse)
async def get_weather_forecast(location: str, days: Optional[int] = 5):
    """Get weather forecast for a location in India"""
    api_key = os.getenv("OPENWEATHER_API_KEY")

    # Limit days to 5 (free tier limit)
    days = min(days, 5)
    search_location = f"{location},IN" if location in INDIAN_CITIES else location

    if not api_key:
        # Return mock forecast data
        from datetime import datetime, timedelta
        forecast = []
        base_date = datetime.now()

        for i in range(days):
            date = base_date + timedelta(days=i)
            forecast.append(ForecastDay(
                date=date.strftime("%Y-%m-%d"),
                temperature_max=30 + i,
                temperature_min=18 + i,
                description="Sunny" if i % 2 == 0 else "Cloudy",
                humidity=60 + i * 2,
                icon="01d" if i % 2 == 0 else "02d"
            ))

        return ForecastResponse(location=location, forecast=forecast)

    try:
        url = "http://api.openweathermap.org/data/2.5/forecast"
        params = {
            "q": search_location,
            "appid": api_key,
            "units": "metric",
            "cnt": days * 8  # 8 forecasts per day (3-hour intervals)
        }

        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()

        # Process forecast data (group by day)
        from datetime import datetime
        daily_forecasts = {}

        for item in data["list"]:
            date = datetime.fromtimestamp(item["dt"]).strftime("%Y-%m-%d")

            if date not in daily_forecasts:
                daily_forecasts[date] = {
                    "temps": [],
                    "humidity": [],
                    "descriptions": [],
                    "icons": []
                }

            daily_forecasts[date]["temps"].append(item["main"]["temp"])
            daily_forecasts[date]["humidity"].append(item["main"]["humidity"])
            daily_forecasts[date]["descriptions"].append(item["weather"][0]["description"])
            daily_forecasts[date]["icons"].append(item["weather"][0]["icon"])

        # Create forecast response
        forecast = []
        for date, day_data in list(daily_forecasts.items())[:days]:
            forecast.append(ForecastDay(
                date=date,
                temperature_max=round(max(day_data["temps"]), 1),
                temperature_min=round(min(day_data["temps"]), 1),
                description=max(set(day_data["descriptions"]), key=day_data["descriptions"].count).title(),
                humidity=round(sum(day_data["humidity"]) / len(day_data["humidity"])),
                icon=max(set(day_data["icons"]), key=day_data["icons"].count)
            ))

        return ForecastResponse(
            location=data["city"]["name"],
            forecast=forecast
        )

    except requests.RequestException as e:
        print(f"Forecast API error: {e}")
        raise HTTPException(status_code=500, detail=f"Forecast service unavailable for {location}")
    except KeyError as e:
        print(f"Forecast data parsing error: {e}")
        raise HTTPException(status_code=500, detail="Invalid forecast data received")
