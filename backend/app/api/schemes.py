from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class Scheme(BaseModel):
    id: str
    name: str
    description: str
    eligibility: str
    benefits: str
    application_process: str
    documents_required: List[str]
    category: str

# Mock schemes data
SCHEMES_DATA = [
    {
        "id": "pm-kisan",
        "name": "PM-KISAN Samman Nidhi",
        "description": "Direct income support to farmers",
        "eligibility": "Small and marginal farmers with cultivable land",
        "benefits": "₹6,000 per year in three installments",
        "application_process": "Apply online through PM-KISAN portal or visit nearest CSC",
        "documents_required": ["Aadhaar Card", "Bank Account Details", "Land Records"],
        "category": "agriculture"
    },
    {
        "id": "ayushman-bharat",
        "name": "Ayushman Bharat - PMJAY",
        "description": "Health insurance scheme for poor families",
        "eligibility": "Families listed in SECC-2011 database",
        "benefits": "Health cover up to ₹5 lakh per family per year",
        "application_process": "Visit nearest hospital or health center",
        "documents_required": ["Aadhaar Card", "Ration Card", "SECC-2011 verification"],
        "category": "health"
    },
    {
        "id": "mudra-yojana",
        "name": "Pradhan Mantri MUDRA Yojana",
        "description": "Micro-finance scheme for small businesses",
        "eligibility": "Non-corporate, non-farm small/micro enterprises",
        "benefits": "Loans up to ₹10 lakh without collateral",
        "application_process": "Apply through banks, NBFCs, or MFIs",
        "documents_required": ["Business Plan", "Identity Proof", "Address Proof", "Bank Statements"],
        "category": "business"
    }
]

@router.get("/", response_model=List[Scheme])
async def get_all_schemes(category: Optional[str] = Query(None)):
    """Get all government schemes or filter by category"""
    if category:
        return [scheme for scheme in SCHEMES_DATA if scheme["category"] == category]
    return SCHEMES_DATA

@router.get("/{scheme_id}", response_model=Scheme)
async def get_scheme_details(scheme_id: str):
    """Get details of a specific scheme"""
    for scheme in SCHEMES_DATA:
        if scheme["id"] == scheme_id:
            return scheme
    return {"error": "Scheme not found"}

@router.post("/search")
async def search_schemes(query: str):
    """Search schemes based on query"""
    results = []
    query_lower = query.lower()
    
    for scheme in SCHEMES_DATA:
        if (query_lower in scheme["name"].lower() or 
            query_lower in scheme["description"].lower() or
            query_lower in scheme["category"].lower()):
            results.append(scheme)
    
    return {"query": query, "results": results}

@router.post("/chat")
async def scheme_chat(message: str):
    """Chat interface for scheme queries"""
    message_lower = message.lower()
    
    # Simple keyword-based responses
    if "farmer" in message_lower or "agriculture" in message_lower:
        return {
            "response": "For farmers, I recommend PM-KISAN Samman Nidhi scheme which provides ₹6,000 per year. You can also check Crop Insurance schemes.",
            "suggested_schemes": ["pm-kisan"]
        }
    elif "health" in message_lower or "medical" in message_lower:
        return {
            "response": "For health benefits, Ayushman Bharat provides health cover up to ₹5 lakh per family. Check if you're eligible!",
            "suggested_schemes": ["ayushman-bharat"]
        }
    elif "business" in message_lower or "loan" in message_lower:
        return {
            "response": "For business loans, MUDRA Yojana offers loans up to ₹10 lakh without collateral for small enterprises.",
            "suggested_schemes": ["mudra-yojana"]
        }
    else:
        return {
            "response": "I can help you find government schemes. Try asking about farmer schemes, health benefits, or business loans.",
            "suggested_schemes": []
        }
