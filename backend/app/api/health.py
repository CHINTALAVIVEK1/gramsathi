from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class SymptomCheck(BaseModel):
    symptoms: List[str]
    age: Optional[int] = None
    gender: Optional[str] = None

class HealthTip(BaseModel):
    id: str
    title: str
    description: str
    category: str
    urgency: str

# Mock health tips data
HEALTH_TIPS = [
    {
        "id": "fever-care",
        "title": "Fever Management",
        "description": "Keep hydrated, rest well, use cold compress on forehead. Seek medical help if fever exceeds 102°F or persists for more than 3 days.",
        "category": "general",
        "urgency": "medium"
    },
    {
        "id": "diarrhea-care",
        "title": "Diarrhea Treatment",
        "description": "Drink ORS solution, avoid dairy and spicy foods. Seek immediate medical attention if blood in stool or severe dehydration.",
        "category": "digestive",
        "urgency": "high"
    },
    {
        "id": "wound-care",
        "title": "Wound Care",
        "description": "Clean with clean water, apply antiseptic, cover with clean bandage. Change dressing daily and watch for signs of infection.",
        "category": "injury",
        "urgency": "medium"
    }
]

@router.post("/symptom-check")
async def check_symptoms(symptom_data: SymptomCheck):
    """Basic symptom checker"""
    symptoms = [s.lower() for s in symptom_data.symptoms]
    
    # Simple symptom analysis
    if any(s in symptoms for s in ["fever", "temperature", "hot"]):
        return {
            "condition": "Possible Fever",
            "severity": "Medium",
            "recommendations": [
                "Rest and stay hydrated",
                "Monitor temperature regularly",
                "Consult doctor if fever persists or exceeds 102°F"
            ],
            "emergency": False
        }
    elif any(s in symptoms for s in ["chest pain", "heart pain", "breathing"]):
        return {
            "condition": "Possible Cardiac/Respiratory Issue",
            "severity": "High",
            "recommendations": [
                "Seek immediate medical attention",
                "Call emergency services if severe",
                "Do not ignore chest pain"
            ],
            "emergency": True
        }
    elif any(s in symptoms for s in ["headache", "head pain"]):
        return {
            "condition": "Headache",
            "severity": "Low to Medium",
            "recommendations": [
                "Rest in a quiet, dark room",
                "Stay hydrated",
                "Consider mild pain relief",
                "Consult doctor if severe or persistent"
            ],
            "emergency": False
        }
    else:
        return {
            "condition": "General Health Concern",
            "severity": "Unknown",
            "recommendations": [
                "Monitor symptoms closely",
                "Consult healthcare provider for proper diagnosis",
                "Maintain good hygiene and rest"
            ],
            "emergency": False
        }

@router.get("/tips", response_model=List[HealthTip])
async def get_health_tips(category: Optional[str] = None):
    """Get health tips"""
    if category:
        return [tip for tip in HEALTH_TIPS if tip["category"] == category]
    return HEALTH_TIPS

@router.get("/emergency-contacts")
async def get_emergency_contacts():
    """Get emergency contact numbers"""
    return {
        "ambulance": "108",
        "police": "100",
        "fire": "101",
        "women_helpline": "1091",
        "child_helpline": "1098",
        "disaster_management": "108",
        "poison_control": "1066"
    }

@router.post("/book-consultation")
async def book_consultation(
    patient_name: str,
    phone: str,
    preferred_time: str,
    symptoms: str
):
    """Book a telemedicine consultation"""
    # Mock booking system
    return {
        "booking_id": "CONS-2024-001",
        "status": "confirmed",
        "patient_name": patient_name,
        "scheduled_time": preferred_time,
        "doctor": "Dr. Rajesh Kumar",
        "consultation_link": "https://meet.gramsathi.com/consultation/CONS-2024-001",
        "message": "Your consultation has been booked. You will receive a call/video link at the scheduled time."
    }
