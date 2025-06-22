import React, { useState, useEffect } from 'react';
import { Sprout, Cloud, Bug, MapPin, Calendar, Thermometer } from 'lucide-react';
import { weatherAPI } from '../../utils/api';

const KrishiConnect = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availableCities, setAvailableCities] = useState([]);

  // Load cities on component mount
  useEffect(() => {
    const loadCities = async () => {
      try {
        const response = await weatherAPI.getCities();
        setAvailableCities(response.cities || []);
      } catch (error) {
        console.error('Failed to load cities:', error);
        // Fallback to major Indian cities
        setAvailableCities([
          'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad',
          'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Agra', 'Varanasi', 'Patna',
          'Bhopal', 'Ludhiana', 'Coimbatore', 'Kochi', 'Visakhapatnam', 'Vadodara'
        ]);
      }
    };
    loadCities();
  }, []);

  const cropRecommendations = [
    {
      name: 'Wheat',
      season: 'Rabi (Nov-Apr)',
      suitability: 95,
      yield: '4-5 tons/hectare',
      tips: ['Sow in November', 'Apply phosphorus at sowing', 'Irrigate at critical stages']
    },
    {
      name: 'Rice',
      season: 'Kharif (Jun-Oct)',
      suitability: 90,
      yield: '5-6 tons/hectare',
      tips: ['Maintain water level', 'Apply nitrogen in splits', 'Control weeds early']
    },
    {
      name: 'Sugarcane',
      season: 'Year-round',
      suitability: 85,
      yield: '70-80 tons/hectare',
      tips: ['Plant in February-March', 'Ensure proper drainage', 'Regular irrigation needed']
    }
  ];

  const pestAlerts = [
    {
      pest: 'Brown Plant Hopper',
      crop: 'Rice',
      severity: 'High',
      solution: 'Use neem-based pesticides, maintain field hygiene'
    },
    {
      pest: 'Aphids',
      crop: 'Wheat',
      severity: 'Medium',
      solution: 'Spray insecticidal soap, encourage beneficial insects'
    }
  ];

  const handleCityChange = async (city) => {
    setSelectedCity(city);
    setLoading(true);

    try {
      // Fetch real weather data from API
      const weatherResponse = await weatherAPI.getCurrentWeather(city);
      const forecastResponse = await weatherAPI.getForecast(city, 3);

      setWeatherData({
        location: weatherResponse.location,
        state: weatherResponse.state,
        country: weatherResponse.country,
        temperature: weatherResponse.temperature,
        feelsLike: weatherResponse.feels_like,
        humidity: weatherResponse.humidity,
        description: weatherResponse.description,
        windSpeed: weatherResponse.wind_speed,
        pressure: weatherResponse.pressure,
        visibility: weatherResponse.visibility,
        icon: weatherResponse.icon,
        forecast: forecastResponse.forecast.map((day, index) => ({
          day: index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : `Day ${index + 1}`,
          date: day.date,
          temp: `${Math.round(day.temperature_max)}°C`,
          tempMin: `${Math.round(day.temperature_min)}°C`,
          condition: day.description,
          humidity: day.humidity,
          icon: day.icon
        }))
      });
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      // Fallback to mock data
      setWeatherData({
        location: city,
        state: 'India',
        country: 'IN',
        temperature: 28,
        feelsLike: 32,
        humidity: 65,
        description: 'Partly cloudy',
        windSpeed: 12,
        pressure: 1013,
        visibility: 10,
        icon: '02d',
        forecast: [
          { day: 'Today', temp: '28°C', tempMin: '22°C', condition: 'Partly Cloudy', humidity: 65 },
          { day: 'Tomorrow', temp: '30°C', tempMin: '24°C', condition: 'Sunny', humidity: 60 },
          { day: 'Day 3', temp: '26°C', tempMin: '20°C', condition: 'Light Rain', humidity: 75 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <Sprout className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            KrishiConnect
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Smart agriculture support with crop recommendations, weather updates, and pest management
          </p>
        </div>

        {/* City Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <MapPin className="mr-2 text-green-600" size={20} />
            Select Your City
          </h2>
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            >
              <option value="">Choose your city</option>
              {availableCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {loading && (
              <div className="flex items-center text-green-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div>
                Loading weather data...
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            🌍 Real-time weather data for all major Indian cities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weather Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Cloud className="mr-2 text-blue-600" size={20} />
              Real-Time Weather Information
            </h2>
            {weatherData ? (
              <div>
                {/* Current Weather */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-3xl font-bold text-gray-900">
                        {weatherData.temperature}°C
                      </div>
                      <div className="text-gray-600 capitalize">{weatherData.description}</div>
                      <div className="text-sm text-gray-500">
                        Feels like {weatherData.feelsLike}°C
                      </div>
                      <div className="text-sm text-blue-600 font-medium mt-1">
                        📍 {weatherData.location}{weatherData.state && `, ${weatherData.state}`}
                      </div>
                    </div>
                    <div className="text-center">
                      {weatherData.icon && (
                        <img
                          src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                          alt={weatherData.description}
                          className="w-16 h-16 mx-auto"
                        />
                      )}
                      <Thermometer className="text-orange-500 mx-auto mt-2" size={24} />
                    </div>
                  </div>

                  {/* Weather Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm text-gray-600">Humidity</div>
                      <div className="text-lg font-bold text-blue-600">{weatherData.humidity}%</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600">Wind Speed</div>
                      <div className="text-lg font-bold text-green-600">{weatherData.windSpeed} km/h</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-sm text-gray-600">Pressure</div>
                      <div className="text-lg font-bold text-purple-600">{weatherData.pressure} hPa</div>
                    </div>
                    {weatherData.visibility && (
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-sm text-gray-600">Visibility</div>
                        <div className="text-lg font-bold text-orange-600">{weatherData.visibility} km</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3-Day Forecast */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">3-Day Forecast</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {weatherData.forecast.map((day, index) => (
                      <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                        <div className="text-sm font-medium text-blue-800">{day.day}</div>
                        {day.date && (
                          <div className="text-xs text-blue-600 mb-2">{new Date(day.date).toLocaleDateString()}</div>
                        )}
                        {day.icon && (
                          <img
                            src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                            alt={day.condition}
                            className="w-10 h-10 mx-auto mb-2"
                          />
                        )}
                        <div className="text-lg font-bold text-gray-900">
                          {day.temp}
                          {day.tempMin && <span className="text-sm text-gray-600"> / {day.tempMin}</span>}
                        </div>
                        <div className="text-xs text-gray-600 capitalize">{day.condition}</div>
                        {day.humidity && (
                          <div className="text-xs text-blue-600 mt-1">💧 {day.humidity}%</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Cloud className="mx-auto mb-4 text-gray-400" size={48} />
                <p>Select a city to view real-time weather information</p>
                <p className="text-sm mt-2">🌤️ Powered by OpenWeatherMap API</p>
              </div>
            )}
          </div>

          {/* Crop Recommendations */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Sprout className="mr-2 text-green-600" size={20} />
              Crop Recommendations
            </h2>
            <div className="space-y-4">
              {cropRecommendations.map((crop, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{crop.name}</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {crop.suitability}% suitable
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <Calendar className="inline mr-1" size={14} />
                    {crop.season}
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Expected yield: {crop.yield}
                  </div>
                  <div className="text-sm">
                    <strong>Tips:</strong>
                    <ul className="list-disc list-inside mt-1 text-gray-600">
                      {crop.tips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pest Alerts */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Bug className="mr-2 text-red-600" size={20} />
            Pest Alerts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pestAlerts.map((alert, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{alert.pest}</h3>
                  <span className={`px-2 py-1 rounded text-sm ${
                    alert.severity === 'High' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Affects: {alert.crop}
                </div>
                <div className="text-sm">
                  <strong>Solution:</strong> {alert.solution}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KrishiConnect;
