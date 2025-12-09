from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models.kid_profile import KidProfile, KidProfileCreate, KidProfileUpdate
from routes.auth import get_current_user

router = APIRouter(prefix="/profiles", tags=["kid_profiles"])

# Database dependency
from server import db

@router.post("", response_model=KidProfile)
async def create_profile(profile_data: KidProfileCreate, current_user: dict = Depends(get_current_user)):
    profile = KidProfile(
        parent_id=current_user["id"],
        **profile_data.dict()
    )
    
    await db.kid_profiles.insert_one(profile.dict())
    return profile

@router.get("", response_model=List[KidProfile])
async def get_profiles(current_user: dict = Depends(get_current_user)):
    profiles = await db.kid_profiles.find({"parent_id": current_user["id"]}).to_list(100)
    return [KidProfile(**profile) for profile in profiles]

@router.get("/{profile_id}", response_model=KidProfile)
async def get_profile(profile_id: str, current_user: dict = Depends(get_current_user)):
    profile = await db.kid_profiles.find_one({"id": profile_id, "parent_id": current_user["id"]})
    
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    return KidProfile(**profile)

@router.put("/{profile_id}", response_model=KidProfile)
async def update_profile(
    profile_id: str,
    profile_data: KidProfileUpdate,
    current_user: dict = Depends(get_current_user)
):
    profile = await db.kid_profiles.find_one({"id": profile_id, "parent_id": current_user["id"]})
    
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    update_data = {k: v for k, v in profile_data.dict().items() if v is not None}
    
    if update_data:
        await db.kid_profiles.update_one(
            {"id": profile_id},
            {"$set": update_data}
        )
    
    updated_profile = await db.kid_profiles.find_one({"id": profile_id})
    return KidProfile(**updated_profile)

@router.delete("/{profile_id}")
async def delete_profile(profile_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.kid_profiles.delete_one({"id": profile_id, "parent_id": current_user["id"]})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Profile not found")
    
    return {"message": "Profile deleted successfully"}
