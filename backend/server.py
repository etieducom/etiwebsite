from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="ETI Educom API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactEnquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    enquiry_type: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"


class ContactEnquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: Optional[str] = None
    enquiry_type: str = Field(..., min_length=1)
    message: str = Field(..., min_length=10, max_length=2000)


class ContactEnquiryResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str]
    enquiry_type: str
    message: str
    created_at: str
    status: str


# Routes
@api_router.get("/")
async def root():
    return {"message": "ETI Educom API - The Computer Career School"}


@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ETI Educom API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


@api_router.post("/contact", response_model=ContactEnquiryResponse)
async def create_contact_enquiry(input: ContactEnquiryCreate):
    """Create a new contact enquiry from the website contact form"""
    try:
        enquiry_dict = input.model_dump()
        enquiry_obj = ContactEnquiry(**enquiry_dict)
        
        doc = enquiry_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        _ = await db.contact_enquiries.insert_one(doc)
        
        # Return response with string datetime
        return ContactEnquiryResponse(
            id=doc['id'],
            name=doc['name'],
            email=doc['email'],
            phone=doc['phone'],
            enquiry_type=doc['enquiry_type'],
            message=doc['message'],
            created_at=doc['created_at'],
            status=doc['status']
        )
    except Exception as e:
        logging.error(f"Error creating contact enquiry: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit enquiry")


@api_router.get("/contact", response_model=List[ContactEnquiryResponse])
async def get_contact_enquiries():
    """Get all contact enquiries (admin endpoint)"""
    enquiries = await db.contact_enquiries.find({}, {"_id": 0}).to_list(1000)
    
    return [
        ContactEnquiryResponse(
            id=e['id'],
            name=e['name'],
            email=e['email'],
            phone=e.get('phone'),
            enquiry_type=e['enquiry_type'],
            message=e['message'],
            created_at=e['created_at'] if isinstance(e['created_at'], str) else e['created_at'].isoformat(),
            status=e.get('status', 'new')
        )
        for e in enquiries
    ]


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
