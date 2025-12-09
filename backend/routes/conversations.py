from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models.conversation import Conversation, ConversationCreate, ChatRequest, ChatResponse
from routes.auth import get_current_user
import random

router = APIRouter(prefix="/conversations", tags=["conversations"])

# Database dependency
from server import db

# Mock responses for now (will be replaced with AI later)
MOCK_RESPONSES = {
    "math": [
        "Great question! Let me help you with that math problem. The answer is {answer}. Want to try another one?",
        "Awesome! Math is fun! {answer} is the correct answer. Keep practicing!"
    ],
    "story": [
        "Once upon a time, there was a curious robot named Kido who loved learning new things every day...",
        "Let me tell you an exciting story about a brave explorer who discovered amazing things!"
    ],
    "science": [
        "That's a wonderful science question! Let me explain it in a simple way...",
        "Science is amazing! Here's what you need to know..."
    ],
    "game": [
        "Yes! Let's play a fun game together. I'll start and you can join in!",
        "Games are great for learning! Let's play something exciting!"
    ],
    "animals": [
        "Animals are fascinating creatures! Let me tell you about them...",
        "Great question about animals! Here's what you should know..."
    ],
    "space": [
        "Space is incredible! Let me share some cool facts with you...",
        "The universe is full of wonders! Here's what I can tell you..."
    ],
    "default": [
        "That's an interesting question! Let me think about that...",
        "Great question! I'm here to help you learn and explore!"
    ]
}

def get_mock_response(question: str) -> tuple:
    question_lower = question.lower()
    
    # Simple category detection
    if any(word in question_lower for word in ['add', 'plus', 'minus', 'multiply', 'divide', 'math', 'number']):
        category = "math"
    elif 'story' in question_lower or 'tell me' in question_lower:
        category = "story"
    elif any(word in question_lower for word in ['how', 'why', 'what', 'science', 'work']):
        category = "science"
    elif 'game' in question_lower or 'play' in question_lower:
        category = "game"
    elif any(word in question_lower for word in ['animal', 'bird', 'fish', 'dog', 'cat']):
        category = "animals"
    elif any(word in question_lower for word in ['space', 'planet', 'star', 'moon', 'sun']):
        category = "space"
    else:
        category = "default"
    
    response = random.choice(MOCK_RESPONSES.get(category, MOCK_RESPONSES["default"]))
    return response, category

@router.post("/chat", response_model=ChatResponse)
async def chat(chat_request: ChatRequest, current_user: dict = Depends(get_current_user)):
    # Verify profile belongs to user
    profile = await db.kid_profiles.find_one({
        "id": chat_request.kid_profile_id,
        "parent_id": current_user["id"]
    })
    
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    # Get mock response
    answer, category = get_mock_response(chat_request.question)
    
    # Save conversation
    conversation = Conversation(
        kid_profile_id=chat_request.kid_profile_id,
        user_question=chat_request.question,
        assistant_response=answer,
        category=category,
        session_id=chat_request.session_id
    )
    
    await db.conversations.insert_one(conversation.dict())
    
    return ChatResponse(answer=answer, category=category)

@router.get("/{profile_id}", response_model=List[Conversation])
async def get_conversations(profile_id: str, current_user: dict = Depends(get_current_user)):
    # Verify profile belongs to user
    profile = await db.kid_profiles.find_one({
        "id": profile_id,
        "parent_id": current_user["id"]
    })
    
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    conversations = await db.conversations.find(
        {"kid_profile_id": profile_id}
    ).sort("timestamp", -1).to_list(100)
    
    return [Conversation(**conv) for conv in conversations]

@router.delete("/{conversation_id}")
async def delete_conversation(conversation_id: str, current_user: dict = Depends(get_current_user)):
    # Get conversation
    conversation = await db.conversations.find_one({"id": conversation_id})
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    # Verify profile belongs to user
    profile = await db.kid_profiles.find_one({
        "id": conversation["kid_profile_id"],
        "parent_id": current_user["id"]
    })
    
    if not profile:
        raise HTTPException(status_code=403, detail="Unauthorized")
    
    await db.conversations.delete_one({"id": conversation_id})
    return {"message": "Conversation deleted successfully"}
