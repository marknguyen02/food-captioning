from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.dependencies import get_current_user, get_db
from app.schemas.rating import Rating
from app.utils.media import generate_save_path
from datetime import datetime
from uuid import uuid4


router = APIRouter()


@router.post('/create')
async def rate_caption(request: Rating, user_id = Depends(get_current_user), db: AsyncIOMotorDatabase = Depends(get_db)):
    new_rating = {
        'user_id': user_id,
        'media_url': request.media_url,
        'rate': request.rate,
        'feedback': request.feedback,
        'caption': request.caption,
        'ingredients': request.ingredients,
        'instructions': request.instructions,
        'created_at': datetime.now()
    }

    db['ratings'].insert_one(new_rating)
    return {'message': 'Created rating successfully'}


@router.post('/save')
async def save_media(file: UploadFile = File(...), user_id = Depends(get_current_user)):
    extension = file.filename.split('.')[-1]
    file_name = f"{uuid4()}.{extension}"
    media_url = f'/feedbacks/{file_name}'
    save_path = generate_save_path(media_url)
    with open(save_path, "wb") as f:
        content = await file.read()
        f.write(content)
    
    return {'media_url': media_url}

