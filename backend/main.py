from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, weather, schemes, health, marketplace, soil
import os

# Environment variables are automatically loaded by Render

app = FastAPI(
    title="GramSathi API",
    description="Rural Empowerment Platform API",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files not needed for API-only deployment

# API routes
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(weather.router, prefix="/api/weather", tags=["Weather"])
app.include_router(schemes.router, prefix="/api/schemes", tags=["Government Schemes"])
app.include_router(health.router, prefix="/api/health", tags=["Health"])
app.include_router(marketplace.router, prefix="/api/marketplace", tags=["Marketplace"])
app.include_router(soil.router, prefix="/api/soil", tags=["Soil Health"])

@app.get("/")
async def root():
    return {"message": "GramSathi API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "GramSathi API is operational"}

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
