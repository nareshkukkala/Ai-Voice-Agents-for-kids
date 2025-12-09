# KidoTalk Backend Integration Contracts

## Overview
This document defines the API contracts and integration plan for KidoTalk's backend implementation.

## Current Frontend State (Mock Data)
- **Location**: `/app/frontend/src/mock.js`
- **Mock Data**:
  - Conversations (6 sample Q&A pairs)
  - Features (3 kid features)
  - Parent features (4 safety items)
  - Steps (3 onboarding steps)
  - FAQs (5 questions)

## Backend Architecture

### Database Collections

#### 1. **users** Collection
```javascript
{
  _id: ObjectId,
  email: String,
  password_hash: String,
  name: String,
  created_at: DateTime,
  updated_at: DateTime
}
```

#### 2. **kid_profiles** Collection
```javascript
{
  _id: ObjectId,
  parent_id: ObjectId (ref: users),
  name: String,
  age: Number,
  language_level: String,
  time_limit_minutes: Number,
  quiet_hours: {
    start: String,
    end: String
  },
  created_at: DateTime
}
```

#### 3. **conversations** Collection
```javascript
{
  _id: ObjectId,
  kid_profile_id: ObjectId (ref: kid_profiles),
  user_question: String,
  assistant_response: String,
  category: String (math, story, science, game, animals, space),
  timestamp: DateTime,
  session_id: String
}
```

#### 4. **activity_logs** Collection
```javascript
{
  _id: ObjectId,
  kid_profile_id: ObjectId (ref: kid_profiles),
  activity_type: String,
  duration_seconds: Number,
  timestamp: DateTime
}
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new parent account
- `POST /api/auth/login` - Login parent account
- `POST /api/auth/logout` - Logout

### Kid Profiles
- `POST /api/profiles` - Create kid profile
- `GET /api/profiles` - Get all profiles for logged-in parent
- `GET /api/profiles/:id` - Get single profile
- `PUT /api/profiles/:id` - Update profile settings
- `DELETE /api/profiles/:id` - Delete profile

### Voice Conversations
- `POST /api/conversations` - Save conversation
- `GET /api/conversations/:profile_id` - Get conversation history
- `DELETE /api/conversations/:id` - Delete conversation

### AI Integration (Future)
- `POST /api/chat` - Send question to AI, get response
  - Input: { question: String, kid_profile_id: String }
  - Output: { answer: String, category: String }

### Activity Tracking
- `POST /api/activity` - Log activity
- `GET /api/activity/:profile_id` - Get activity summary

## Integration Plan

### Phase 1: Basic Backend (Current Sprint)
1. Set up user authentication (JWT-based)
2. Create kid profile management
3. Implement conversation storage
4. Replace mock data in `VoiceDemo.jsx` with API calls

### Phase 2: AI Integration (Future)
1. Integrate OpenAI/Anthropic for responses
2. Implement content filtering
3. Add category detection

### Frontend Changes Required

#### Files to Update:
1. **VoiceDemo.jsx**
   - Replace mock conversations with API calls to `POST /api/chat`
   - Save conversations to `POST /api/conversations`
   - Require user to be logged in

2. **New Components Needed**:
   - Login/Register modal
   - Profile creation form
   - Profile management page
   - Activity dashboard

3. **App.js**
   - Add authentication context
   - Add protected routes for profile management

## Mock Data Removal Plan
Once backend is ready:
- Remove mock conversation responses from VoiceDemo
- Keep FAQ and features as static content (no backend needed)
- Keep How It Works steps as static content

## Security Considerations
- All conversation endpoints require authentication
- Parents can only access their own kid profiles
- Implement rate limiting on chat endpoints
- Content filtering for kid safety
