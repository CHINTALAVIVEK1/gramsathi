from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime

router = APIRouter()

class Product(BaseModel):
    id: str
    name: str
    description: str
    price: float
    category: str
    seller_name: str
    seller_phone: str
    location: str
    image_url: Optional[str] = None
    quantity_available: int
    unit: str
    created_at: str

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str
    seller_name: str
    seller_phone: str
    location: str
    quantity_available: int
    unit: str

# Mock products data
PRODUCTS_DATA = [
    {
        "id": "prod-001",
        "name": "Fresh Tomatoes",
        "description": "Organic tomatoes grown without pesticides",
        "price": 40.0,
        "category": "vegetables",
        "seller_name": "Ramesh Kumar",
        "seller_phone": "+91-9876543210",
        "location": "Village Rampur, District Meerut",
        "image_url": "/static/images/tomatoes.jpg",
        "quantity_available": 50,
        "unit": "kg",
        "created_at": "2024-01-15T10:30:00"
    },
    {
        "id": "prod-002",
        "name": "Pure Honey",
        "description": "Natural honey from local beekeepers",
        "price": 300.0,
        "category": "dairy",
        "seller_name": "Sunita Devi",
        "seller_phone": "+91-9876543211",
        "location": "Village Madhavpur, District Mathura",
        "image_url": "/static/images/honey.jpg",
        "quantity_available": 20,
        "unit": "bottle (500ml)",
        "created_at": "2024-01-14T15:45:00"
    },
    {
        "id": "prod-003",
        "name": "Handwoven Baskets",
        "description": "Traditional bamboo baskets for storage",
        "price": 150.0,
        "category": "handicrafts",
        "seller_name": "Mohan Lal",
        "seller_phone": "+91-9876543212",
        "location": "Village Bamboo Nagar, District Bareilly",
        "image_url": "/static/images/baskets.jpg",
        "quantity_available": 15,
        "unit": "piece",
        "created_at": "2024-01-13T09:20:00"
    }
]

@router.get("/products", response_model=List[Product])
async def get_all_products(category: Optional[str] = None, location: Optional[str] = None):
    """Get all products or filter by category/location"""
    products = PRODUCTS_DATA.copy()
    
    if category:
        products = [p for p in products if p["category"] == category]
    
    if location:
        products = [p for p in products if location.lower() in p["location"].lower()]
    
    return products

@router.get("/products/{product_id}", response_model=Product)
async def get_product_details(product_id: str):
    """Get details of a specific product"""
    for product in PRODUCTS_DATA:
        if product["id"] == product_id:
            return product
    return {"error": "Product not found"}

@router.post("/products", response_model=Product)
async def create_product(product: ProductCreate):
    """Create a new product listing"""
    new_product = {
        "id": f"prod-{uuid.uuid4().hex[:6]}",
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "category": product.category,
        "seller_name": product.seller_name,
        "seller_phone": product.seller_phone,
        "location": product.location,
        "image_url": None,
        "quantity_available": product.quantity_available,
        "unit": product.unit,
        "created_at": datetime.now().isoformat()
    }
    
    PRODUCTS_DATA.append(new_product)
    return new_product

@router.post("/products/{product_id}/upload-image")
async def upload_product_image(product_id: str, file: UploadFile = File(...)):
    """Upload image for a product"""
    # Mock image upload
    image_url = f"/static/images/{product_id}_{file.filename}"
    
    # Update product with image URL
    for product in PRODUCTS_DATA:
        if product["id"] == product_id:
            product["image_url"] = image_url
            break
    
    return {"message": "Image uploaded successfully", "image_url": image_url}

@router.get("/categories")
async def get_categories():
    """Get all product categories"""
    return {
        "categories": [
            {"id": "vegetables", "name": "Vegetables", "icon": "🥕"},
            {"id": "fruits", "name": "Fruits", "icon": "🍎"},
            {"id": "grains", "name": "Grains & Cereals", "icon": "🌾"},
            {"id": "dairy", "name": "Dairy & Honey", "icon": "🥛"},
            {"id": "handicrafts", "name": "Handicrafts", "icon": "🧺"},
            {"id": "spices", "name": "Spices & Herbs", "icon": "🌶️"}
        ]
    }

@router.post("/checkout")
async def checkout(
    product_id: str,
    quantity: int,
    buyer_name: str,
    buyer_phone: str,
    delivery_address: str
):
    """Process checkout for a product"""
    # Find product
    product = None
    for p in PRODUCTS_DATA:
        if p["id"] == product_id:
            product = p
            break
    
    if not product:
        return {"error": "Product not found"}
    
    total_amount = product["price"] * quantity
    
    return {
        "order_id": f"ORD-{uuid.uuid4().hex[:8].upper()}",
        "product_name": product["name"],
        "quantity": quantity,
        "unit_price": product["price"],
        "total_amount": total_amount,
        "seller_contact": product["seller_phone"],
        "buyer_name": buyer_name,
        "buyer_phone": buyer_phone,
        "delivery_address": delivery_address,
        "status": "confirmed",
        "message": "Order placed successfully! Seller will contact you soon."
    }
