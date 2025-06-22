from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import requests
from typing import Optional

router = APIRouter()

class WeatherResponse(BaseModel):
    location: str
    temperature: float
    humidity: int
    description: str
    wind_speed: float
    pressure: int

@router.get("/current/{location}", response_model=WeatherResponse)
async def get_current_weather(location: str):
    """Get current weather for a location"""
    api_key = os.getenv("OPENWEATHER_API_KEY")
    
    if not api_key:
        # Return mock data if API key is not available
        return WeatherResponse(
            location=location,
            temperature=28.5,
            humidity=65,
            description="Partly cloudy",
            wind_speed=12.5,
            pressure=1013
        )
    
    try:
        url = f"http://api.openweathermap.org/data/2.5/weather"
        params = {
            "q": location,
            "appid": api_key,
            "units": "metric"
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        
        return WeatherResponse(
            location=data["name"],
            temperature=data["main"]["temp"],
            humidity=data["main"]["humidity"],
            description=data["weather"][0]["description"],
            wind_speed=data["wind"]["speed"],
            pressure=data["main"]["pressure"]
        )
    except requests.RequestException:
        raise HTTPException(status_code=500, detail="Weather service unavailable")

@router.get("/forecast/{location}")
async def get_weather_forecast(location: str, days: Optional[int] = 5):
    """Get weather forecast for a location"""
    # Mock forecast data
    forecast = []
    for i in range(days):
        forecast.append({
            "date": f"2024-01-{15+i:02d}",
            "temperature_max": 30 + i,
            "temperature_min": 18 + i,
            "description": "Sunny" if i % 2 == 0 else "Cloudy",
            "humidity": 60 + i * 2
        })
    
    return {
        "location": location,
        "forecast": forecast
    }
