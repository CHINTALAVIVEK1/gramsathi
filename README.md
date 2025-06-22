# 🌾 GramSathi - Rural Empowerment Web Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org/)

**GramSathi** (ग्रामसाथी) is a comprehensive digital platform designed to empower rural communities through unified solutions covering agriculture, health, e-commerce, government schemes, and soil health guidance.

## 🎯 Mission
*"Bridging the digital divide for rural India through accessible, multilingual, and comprehensive digital services."*

## 🌟 Live Demo
- **Frontend**: [Demo Link] (Deploy to get live URL)
- **API Documentation**: [API Docs] (Deploy to get live URL)

## 📱 Screenshots
![GramSathi Homepage](docs/screenshots/homepage.png)
*Homepage showcasing all five modules*

## 🌾 Features

### 1. KrishiConnect - Smart Agriculture Support
- District-based crop recommendations
- Real-time weather information via OpenWeatherMap API
- Pest alert system with preventive measures

### 2. ArogyaSetu Rural - Health Support
- AI-powered symptom checker chatbot
- Emergency health tips and first aid guidance
- Telemedicine consultation booking

### 3. Grameen Bazaar - Local Marketplace
- Product listing platform for local sellers
- Image upload and catalog management
- Integrated payment gateway (Razorpay)

### 4. VoiceGov - Scheme Awareness Assistant
- Voice and chat-based government scheme queries
- Multi-language support with text-to-speech
- Comprehensive scheme database

### 5. MittiCheck - Soil Health Guidance
- Soil type analysis and recommendations
- Image-based soil assessment
- Crop and fertilizer suggestions

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: Context API
- **Icons**: Lucide React

### Backend
- **Framework**: FastAPI
- **Database**: SQLite (development) / PostgreSQL (production)
- **Authentication**: JWT
- **File Storage**: Local/Cloud storage

### APIs & Services
- **Weather**: OpenWeatherMap API
- **AI**: OpenAI GPT (optional)
- **Payment**: Razorpay
- **Speech**: Web Speech API

## 📁 Project Structure

```
gramsathi/
├── frontend/                 # React.js frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── modules/         # Feature modules
│   │   │   ├── krishi/      # KrishiConnect
│   │   │   ├── arogya/      # ArogyaSetu Rural
│   │   │   ├── bazaar/      # Grameen Bazaar
│   │   │   ├── voicegov/    # VoiceGov
│   │   │   └── mitti/       # MittiCheck
│   │   ├── utils/           # Utility functions
│   │   ├── hooks/           # Custom React hooks
│   │   └── assets/          # Static assets
│   ├── public/              # Public assets
│   └── package.json
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/             # API routes
│   │   ├── models/          # Database models
│   │   ├── services/        # Business logic
│   │   └── utils/           # Utility functions
│   ├── requirements.txt
│   └── main.py
└── docs/                    # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.8+)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gramsathi
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

## 🌐 Environment Variables

Create `.env` files in both frontend and backend directories:

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8000
VITE_OPENWEATHER_API_KEY=your_openweather_key
VITE_RAZORPAY_KEY=your_razorpay_key
```

### Backend (.env)
```
OPENAI_API_KEY=your_openai_key
OPENWEATHER_API_KEY=your_openweather_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
DATABASE_URL=sqlite:///./gramsathi.db
```

## 📱 Features Overview

- **Responsive Design**: Mobile-first approach for rural accessibility
- **Multilingual Support**: English and Hindi language options
- **Voice Interface**: Speech recognition and text-to-speech
- **Offline Capability**: Basic functionality without internet
- **Rural-Friendly UI**: Simple, intuitive interface design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenWeatherMap for weather data
- OpenAI for AI capabilities
- Razorpay for payment processing
- Rural communities for inspiration and feedback
