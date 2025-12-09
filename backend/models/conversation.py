from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid

class Conversation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    kid_profile_id: str
    user_question: str
    assistant_response: str
    category: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    session_id: str

class ConversationCreate(BaseModel):
    kid_profile_id: str
    user_question: str
    assistant_response: str
    category: str
    session_id: str

class ChatRequest(BaseModel):
    question: str
    kid_profile_id: str
    session_id: str

class ChatResponse(BaseModel):
    answer: str
    category: str
