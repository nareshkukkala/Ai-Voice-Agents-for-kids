from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models.conversation import Conversation, ConversationCreate, ChatRequest, ChatResponse
from routes.auth import get_current_user
from emergentintegrations.llm.chat import LlmChat, UserMessage
from dotenv import load_dotenv
import os
import logging

load_dotenv()

router = APIRouter(prefix="/conversations", tags=["conversations"])
logger = logging.getLogger(__name__)

# Database dependency
from server import db

# System message for kid-friendly responses
KID_SYSTEM_MESSAGE = """You are KidoTalk, a friendly AI voice assistant designed for children aged 5-12. 

Your role:
- Answer questions in simple, easy-to-understand language
- Be encouraging, patient, and positive
- Keep responses short (2-4 sentences maximum)
- Make learning fun and engaging
- Never use scary, inappropriate, or complex language
- If asked something inappropriate, gently redirect to educational topics
- Use age-appropriate examples and explanations

Remember: You're talking to a child, so be warm, friendly, and supportive!"""

def detect_category(question: str) -> str:
    """Detect the category of the question"""
    question_lower = question.lower()
    
    if any(word in question_lower for word in ['add', 'plus', 'minus', 'multiply', 'divide', 'math', 'number', 'count']):
        return "math"
    elif 'story' in question_lower or 'tell me' in question_lower:
        return "story"
    elif any(word in question_lower for word in ['how', 'why', 'what', 'science', 'work']):
        return "science"
    elif 'game' in question_lower or 'play' in question_lower:
        return "game"
    elif any(word in question_lower for word in ['animal', 'bird', 'fish', 'dog', 'cat', 'pet']):
        return "animals"
    elif any(word in question_lower for word in ['space', 'planet', 'star', 'moon', 'sun', 'galaxy']):
        return "space"
    else:
        return "general"

async def get_ai_response(question: str, session_id: str) -> tuple:
    """Get AI response using OpenAI GPT-4o"""
    try:
        api_key = os.getenv("EMERGENT_LLM_KEY")
        
        # Initialize chat
        chat = LlmChat(
            api_key=api_key,
            session_id=session_id,
            system_message=KID_SYSTEM_MESSAGE
        ).with_model("openai", "gpt-4o")
        
        # Create user message
        user_message = UserMessage(text=question)
        
        # Get response
        response = await chat.send_message(user_message)
        category = detect_category(question)
        
        return response, category
        
    except Exception as e:
        logger.error(f"AI response error: {str(e)}")
        # Fallback to simple response
        return "That's a great question! Let me help you with that.", "general"

@router.post("/chat", response_model=ChatResponse)
async def chat(chat_request: ChatRequest):
    # For demo purposes, allow without authentication
    # In production, you would require authentication
    
    # Get AI response
    answer, category = await get_ai_response(chat_request.question, chat_request.session_id)
    
    # Save conversation (demo mode - no authentication required)
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
