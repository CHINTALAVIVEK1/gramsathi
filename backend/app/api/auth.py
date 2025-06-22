from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class UserLogin(BaseModel):
    username: str
    password: str

class UserRegister(BaseModel):
    username: str
    email: str
    password: str
    phone: Optional[str] = None
    district: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/register", response_model=dict)
async def register_user(user: UserRegister):
    """Register a new user"""
    # TODO: Implement user registration logic
    return {
        "message": "User registered successfully",
        "user_id": "temp_user_id",
        "username": user.username
    }

@router.post("/login", response_model=Token)
async def login_user(user: UserLogin):
    """Login user and return JWT token"""
    # TODO: Implement authentication logic
    if user.username == "demo" and user.password == "demo123":
        return {
            "access_token": "demo_jwt_token",
            "token_type": "bearer"
        }
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.get("/profile")
async def get_user_profile():
    """Get current user profile"""
    # TODO: Implement profile retrieval
    return {
        "username": "demo_user",
        "email": "demo@gramsathi.com",
        "district": "Sample District",
        "phone": "+91-9876543210"
    }
