# 🌤️ Weather API Setup Guide

## 🔑 Get Your Free OpenWeatherMap API Key

### Step 1: Sign Up for OpenWeatherMap
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Get Your API Key
1. Log in to your OpenWeatherMap account
2. Go to "API Keys" section
3. Copy your default API key (or create a new one)

### Step 3: Add API Key to Your Project

#### For Backend:
Create a `.env` file in the `backend` directory:
```bash
cd backend
echo "OPENWEATHER_API_KEY=your_api_key_here" > .env
```

Replace `your_api_key_here` with your actual API key.

#### Example `.env` file:
```
OPENWEATHER_API_KEY=abcd1234567890abcd1234567890abcd
DATABASE_URL=sqlite:///./gramsathi.db
SECRET_KEY=your_super_secret_jwt_key_here
```

### Step 4: Restart Your Backend
```bash
cd backend
python main.py
```

## 🌍 Supported Indian Cities

The weather API now supports 60+ major Indian cities including:

### Major Metros:
- Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad

### State Capitals:
- Lucknow, Jaipur, Bhopal, Gandhinagar, Thiruvananthapuram, Panaji, Shimla
- Srinagar, Jammu, Chandigarh, Dehradun, Ranchi, Patna, Raipur, Bhubaneswar
- Guwahati, Agartala, Aizawl, Kohima, Itanagar, Imphal, Shillong, Gangtok

### Other Major Cities:
- Agra, Varanasi, Kanpur, Nagpur, Indore, Thane, Visakhapatnam, Vadodara
- Faridabad, Ghaziabad, Ludhiana, Rajkot, Kochi, Coimbatore, Madurai, Jodhpur
- And many more...

## 🚀 Features

### Real-Time Weather Data:
- ✅ Current temperature and feels-like temperature
- ✅ Humidity, wind speed, and atmospheric pressure
- ✅ Weather description with icons
- ✅ Visibility information
- ✅ 3-day detailed forecast

### Enhanced Display:
- ✅ Weather icons from OpenWeatherMap
- ✅ City and state information
- ✅ Detailed weather cards
- ✅ Loading indicators
- ✅ Error handling with fallback data

## 🔧 API Endpoints

### Get Cities List:
```
GET /api/weather/cities
```

### Get Current Weather:
```
GET /api/weather/current/{city_name}
```

### Get Weather Forecast:
```
GET /api/weather/forecast/{city_name}?days=3
```

## 🛠️ Troubleshooting

### API Key Issues:
- Make sure your API key is active (can take up to 2 hours after signup)
- Check that the `.env` file is in the correct location
- Restart the backend after adding the API key

### City Not Found:
- Try using the exact city name from the dropdown
- The API automatically adds ",IN" for Indian cities

### Rate Limits:
- Free tier: 1,000 calls/day, 60 calls/minute
- Upgrade to paid plan for higher limits

## 💡 Without API Key

If you don't have an API key, the system will show realistic mock data for demonstration purposes. The real-time features will work once you add your API key.

## 🌟 Benefits

- **Real-time data**: Always up-to-date weather information
- **Comprehensive coverage**: All major Indian cities
- **Detailed forecasts**: 3-day weather predictions
- **Professional display**: Weather icons and detailed metrics
- **Reliable service**: Powered by OpenWeatherMap's robust API
