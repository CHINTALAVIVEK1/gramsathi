import React, { useState, useEffect } from 'react';
import { Sprout, Cloud, Bug, MapPin, Calendar, Thermometer } from 'lucide-react';
import { weatherAPI } from '../../utils/api';

const KrishiConnect = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const districts = [
    'Agra', 'Aligarh', 'Allahabad', 'Bareilly', 'Ghaziabad', 'Kanpur', 
    'Lucknow', 'Meerut', 'Moradabad', 'Saharanpur', 'Varanasi'
  ];

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

  const handleDistrictChange = async (district) => {
    setSelectedDistrict(district);

    try {
      // Fetch real weather data from API
      const weatherResponse = await weatherAPI.getCurrentWeather(district);
      const forecastResponse = await weatherAPI.getForecast(district, 3);

      setWeatherData({
        temperature: weatherResponse.temperature,
        humidity: weatherResponse.humidity,
        description: weatherResponse.description,
        windSpeed: weatherResponse.wind_speed,
        pressure: weatherResponse.pressure,
        forecast: forecastResponse.forecast || [
          { day: 'Today', temp: `${weatherResponse.temperature}°C`, condition: weatherResponse.description },
          { day: 'Tomorrow', temp: '30°C', condition: 'Sunny' },
          { day: 'Day 3', temp: '26°C', condition: 'Light Rain' }
        ]
      });
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      // Fallback to mock data
      setWeatherData({
        temperature: 28,
        humidity: 65,
        description: 'Partly cloudy',
        windSpeed: 12,
        pressure: 1013,
        forecast: [
          { day: 'Today', temp: '28°C', condition: 'Partly Cloudy' },
          { day: 'Tomorrow', temp: '30°C', condition: 'Sunny' },
          { day: 'Day 3', temp: '26°C', condition: 'Light Rain' }
        ]
      });
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

        {/* District Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <MapPin className="mr-2 text-green-600" size={20} />
            Select Your District
          </h2>
          <select
            value={selectedDistrict}
            onChange={(e) => handleDistrictChange(e.target.value)}
            className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Choose your district</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weather Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Cloud className="mr-2 text-blue-600" size={20} />
              Weather Information
            </h2>
            {weatherData ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      {weatherData.temperature}°C
                    </div>
                    <div className="text-gray-600">{weatherData.description}</div>
                    <div className="text-sm text-gray-500">
                      Humidity: {weatherData.humidity}% | Wind: {weatherData.windSpeed} km/h
                    </div>
                  </div>
                  <Thermometer className="text-orange-500" size={48} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {weatherData.forecast.map((day, index) => (
                    <div key={index} className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-sm font-medium">{day.day}</div>
                      <div className="text-lg font-bold">{day.temp}</div>
                      <div className="text-xs text-gray-600">{day.condition}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Select a district to view weather information
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
