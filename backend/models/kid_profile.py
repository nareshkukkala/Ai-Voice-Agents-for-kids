from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid

class QuietHours(BaseModel):
    start: str = "21:00"
    end: str = "07:00"

class KidProfile(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    parent_id: str
    name: str
    age: int
    language_level: str = "beginner"
    time_limit_minutes: int = 30
    quiet_hours: Optional[QuietHours] = QuietHours()
    created_at: datetime = Field(default_factory=datetime.utcnow)

class KidProfileCreate(BaseModel):
    name: str
    age: int
    language_level: str = "beginner"
    time_limit_minutes: int = 30
    quiet_hours: Optional[QuietHours] = QuietHours()

class KidProfileUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    language_level: Optional[str] = None
    time_limit_minutes: Optional[int] = None
    quiet_hours: Optional[QuietHours] = None
