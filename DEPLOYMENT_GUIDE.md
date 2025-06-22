# 🚀 GramSathi Deployment Guide

## 🌟 Quick Deploy (Recommended)

### Frontend: Netlify
1. Go to [Netlify](https://netlify.com)
2. Sign up with GitHub
3. "New site from Git" → Select `gramsathi` repo
4. Build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`
5. Environment variables:
   ```
   REACT_APP_API_BASE_URL=https://your-backend-url.railway.app
   REACT_APP_NAME=GramSathi
   ```

### Backend: Railway
1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select `gramsathi` repository
5. Choose `backend` folder
6. Environment variables:
   ```
   OPENWEATHER_API_KEY=76d05d7e85abddfdf1f79bc2acf427ef
   DATABASE_URL=sqlite:///./gramsathi.db
   SECRET_KEY=gramsathi_secret_key_2024
   PORT=8000
   ```

## 🔧 Build Commands

### Frontend (React)
```bash
cd frontend
npm install
npm run build
```

### Backend (Python)
```bash
cd backend
pip install -r requirements.txt
python main.py
```

## 🌐 Environment Variables

### Frontend (.env)
```
REACT_APP_API_BASE_URL=https://your-backend-domain.com
REACT_APP_NAME=GramSathi
REACT_APP_VERSION=1.0.0
```

### Backend (.env)
```
OPENWEATHER_API_KEY=76d05d7e85abddfdf1f79bc2acf427ef
DATABASE_URL=sqlite:///./gramsathi.db
SECRET_KEY=gramsathi_secret_key_2024
PORT=8000
```

## 📊 Hosting Options Comparison

| Platform | Frontend | Backend | Cost | Difficulty |
|----------|----------|---------|------|------------|
| Netlify + Railway | ✅ | ✅ | Free/Cheap | Easy |
| Vercel + Railway | ✅ | ✅ | Free/Cheap | Easy |
| AWS | ✅ | ✅ | Medium | Hard |
| DigitalOcean | ✅ | ✅ | Cheap | Medium |

## 🎯 Post-Deployment

### Test Your Deployment
1. Frontend URL: Check all 5 modules load
2. Backend URL: Visit `/docs` for API documentation
3. Weather API: Test KrishiConnect with real data
4. All modules: Verify functionality

### Custom Domain (Optional)
1. Buy domain from Namecheap/GoDaddy
2. Point to Netlify/Railway
3. Enable HTTPS (automatic)

## 🔒 Security Notes

- ✅ API keys stored as environment variables
- ✅ HTTPS enabled by default
- ✅ CORS configured properly
- ✅ No sensitive data in repository

## 📞 Support

If you need help with deployment:
1. Check platform documentation
2. Use platform support chat
3. GitHub Issues for code problems

## 🎉 Success!

Once deployed, your GramSathi platform will be:
- ✅ Live on the internet
- ✅ Accessible from anywhere
- ✅ Using real weather data
- ✅ Ready for users

Share your live URL with the world! 🌍
