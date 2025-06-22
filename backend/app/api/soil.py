from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class SoilAnalysis(BaseModel):
    soil_type: str
    ph_level: Optional[float] = None
    nitrogen: Optional[str] = None
    phosphorus: Optional[str] = None
    potassium: Optional[str] = None
    organic_matter: Optional[str] = None

class CropRecommendation(BaseModel):
    crop_name: str
    suitability_score: int
    season: str
    expected_yield: str
    care_instructions: List[str]

class FertilizerRecommendation(BaseModel):
    fertilizer_type: str
    quantity: str
    application_method: str
    timing: str

# Mock soil and crop data
SOIL_TYPES = {
    "clay": {
        "description": "Heavy soil with good water retention but poor drainage",
        "characteristics": ["High water retention", "Poor drainage", "Rich in nutrients", "Hard when dry"],
        "suitable_crops": ["rice", "wheat", "sugarcane", "cotton"]
    },
    "sandy": {
        "description": "Light soil with good drainage but low water retention",
        "characteristics": ["Good drainage", "Low water retention", "Easy to work", "Low nutrient retention"],
        "suitable_crops": ["millet", "groundnut", "watermelon", "carrot"]
    },
    "loamy": {
        "description": "Ideal soil with balanced properties",
        "characteristics": ["Balanced drainage", "Good water retention", "Rich in nutrients", "Easy to work"],
        "suitable_crops": ["tomato", "potato", "corn", "beans", "most vegetables"]
    },
    "black": {
        "description": "Cotton soil with high clay content",
        "characteristics": ["High clay content", "Rich in lime", "Good for cotton", "Swells when wet"],
        "suitable_crops": ["cotton", "soybean", "sorghum", "chickpea"]
    }
}

CROP_RECOMMENDATIONS = {
    "clay": [
        {
            "crop_name": "Rice",
            "suitability_score": 95,
            "season": "Kharif (June-October)",
            "expected_yield": "4-6 tons per hectare",
            "care_instructions": [
                "Maintain water level 2-5 cm",
                "Apply nitrogen in 3 splits",
                "Control weeds in early stages",
                "Harvest when 80% grains are golden"
            ]
        },
        {
            "crop_name": "Wheat",
            "suitability_score": 85,
            "season": "Rabi (November-April)",
            "expected_yield": "3-5 tons per hectare",
            "care_instructions": [
                "Sow in November for best results",
                "Apply phosphorus at sowing",
                "Irrigate at critical stages",
                "Harvest when moisture is 20-25%"
            ]
        }
    ],
    "sandy": [
        {
            "crop_name": "Groundnut",
            "suitability_score": 90,
            "season": "Kharif (June-October)",
            "expected_yield": "2-3 tons per hectare",
            "care_instructions": [
                "Ensure good drainage",
                "Apply gypsum for pod development",
                "Control leaf spot diseases",
                "Harvest when pods are mature"
            ]
        }
    ],
    "loamy": [
        {
            "crop_name": "Tomato",
            "suitability_score": 95,
            "season": "Year-round with protection",
            "expected_yield": "40-60 tons per hectare",
            "care_instructions": [
                "Provide support for plants",
                "Regular watering but avoid waterlogging",
                "Apply balanced fertilizer",
                "Control pests and diseases regularly"
            ]
        }
    ]
}

@router.post("/analyze")
async def analyze_soil(soil_data: SoilAnalysis):
    """Analyze soil and provide recommendations"""
    soil_type = soil_data.soil_type.lower()
    
    if soil_type not in SOIL_TYPES:
        return {"error": "Soil type not recognized"}
    
    soil_info = SOIL_TYPES[soil_type]
    crop_recommendations = CROP_RECOMMENDATIONS.get(soil_type, [])
    
    # Generate fertilizer recommendations based on soil type
    fertilizer_recommendations = []
    if soil_type == "sandy":
        fertilizer_recommendations = [
            {
                "fertilizer_type": "Organic Compost",
                "quantity": "5-10 tons per hectare",
                "application_method": "Mix with soil before planting",
                "timing": "Before sowing"
            },
            {
                "fertilizer_type": "NPK (10:26:26)",
                "quantity": "200-300 kg per hectare",
                "application_method": "Broadcast and incorporate",
                "timing": "At sowing"
            }
        ]
    elif soil_type == "clay":
        fertilizer_recommendations = [
            {
                "fertilizer_type": "Organic Matter",
                "quantity": "3-5 tons per hectare",
                "application_method": "Mix with soil",
                "timing": "Before monsoon"
            },
            {
                "fertilizer_type": "Gypsum",
                "quantity": "500 kg per hectare",
                "application_method": "Broadcast",
                "timing": "Before plowing"
            }
        ]
    else:
        fertilizer_recommendations = [
            {
                "fertilizer_type": "Balanced NPK",
                "quantity": "As per soil test",
                "application_method": "Based on crop requirement",
                "timing": "Split application"
            }
        ]
    
    return {
        "soil_type": soil_type,
        "soil_description": soil_info["description"],
        "characteristics": soil_info["characteristics"],
        "crop_recommendations": crop_recommendations,
        "fertilizer_recommendations": fertilizer_recommendations,
        "general_tips": [
            "Get soil tested every 2-3 years",
            "Maintain soil organic matter",
            "Practice crop rotation",
            "Use appropriate irrigation methods"
        ]
    }

@router.post("/image-analysis")
async def analyze_soil_image(file: UploadFile = File(...)):
    """Analyze soil from uploaded image"""
    # Mock image analysis - in real implementation, use AI/ML model
    return {
        "detected_soil_type": "loamy",
        "confidence": 85,
        "analysis": {
            "color": "Dark brown",
            "texture": "Medium",
            "moisture": "Moderate",
            "organic_content": "Good"
        },
        "recommendations": [
            "Soil appears healthy for most crops",
            "Consider adding organic matter",
            "Test pH level for optimal results"
        ]
    }

@router.get("/soil-types")
async def get_soil_types():
    """Get all supported soil types"""
    return {
        "soil_types": [
            {"id": "clay", "name": "Clay Soil", "description": SOIL_TYPES["clay"]["description"]},
            {"id": "sandy", "name": "Sandy Soil", "description": SOIL_TYPES["sandy"]["description"]},
            {"id": "loamy", "name": "Loamy Soil", "description": SOIL_TYPES["loamy"]["description"]},
            {"id": "black", "name": "Black Soil", "description": SOIL_TYPES["black"]["description"]}
        ]
    }

@router.get("/crop-calendar/{district}")
async def get_crop_calendar(district: str):
    """Get crop calendar for a district"""
    # Mock crop calendar
    return {
        "district": district,
        "calendar": [
            {
                "month": "June",
                "activities": ["Sow Kharif crops", "Prepare fields", "Apply basal fertilizer"],
                "crops": ["Rice", "Cotton", "Sugarcane"]
            },
            {
                "month": "November",
                "activities": ["Sow Rabi crops", "Harvest Kharif crops", "Prepare for winter"],
                "crops": ["Wheat", "Mustard", "Chickpea"]
            },
            {
                "month": "March",
                "activities": ["Harvest Rabi crops", "Prepare for summer crops"],
                "crops": ["Summer vegetables", "Fodder crops"]
            }
        ]
    }
