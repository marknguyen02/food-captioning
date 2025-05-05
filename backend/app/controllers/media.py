from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.dependencies import get_current_user, get_db
from app.schemas.media import \
    MediaCreate, \
    MediaUpdate, \
    MediaDelete, \
    MediaDetailResponse, \
    MediaAlbumResponse
from app.utils.media import generate_save_path, generate_display_path
from datetime import datetime
from uuid import uuid4
import os


router = APIRouter()


@router.get('/read', response_model=MediaDetailResponse)
async def get_media(media_id: str, user_id: str=Depends(get_current_user), db: AsyncIOMotorDatabase=Depends(get_db)):
    media = await db['medias'].find_one({
        'media_id': media_id,
        'user_id': user_id
    })

    if media is None:
        raise HTTPException(status_code=404, detail="Media not found")
    
    return {
        'media_id': media['media_id'],
        'media_url': generate_display_path(media['media_url']),
        'media_name': media['media_name'],
        'media_type': media['media_type'],
        'caption': media['caption'],
        'instructions': media['instructions'],
        'ingredients': media['ingredients']
    }


@router.get('/read-album', response_model=list[MediaAlbumResponse])
async def get_media_album(album_id: str, user_id: str=Depends(get_current_user), db: AsyncIOMotorDatabase=Depends(get_db)):
    medias_cursor = db['medias'].find({
        'album_id': album_id,
        'user_id': user_id
    })
    
    medias = []
    async for media in medias_cursor:
        medias.append({
            'media_id': media['media_id'],
            'media_url': generate_display_path(media['media_url']),
            'media_name': media['media_name'],
        })
    
    return medias


@router.post('/add')
async def add_media(file: UploadFile = File(...), user_id: str=Depends(get_current_user)):
    extension = file.filename.split('.')[-1]
    file_name = f"{uuid4()}.{extension}"
    media_url = f'/users/{file_name}'
    file_path = generate_save_path(media_url)
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    return {'media_url': media_url}


@router.post('/create')
async def create_media(request: MediaCreate, user_id: str=Depends(get_current_user), db: AsyncIOMotorDatabase=Depends(get_db)):
    album = await db['albums'].find_one({
        'album_id': request.album_id,
        'user_id': user_id
    })


    if album is None:
        raise HTTPException(status_code=404, detail="Album not found")
    
    if album.get('thumbnail_url') is None:
        await db['albums'].update_one(
            {'album_id': request.album_id, 'user_id': user_id},
            {'$set': {'thumbnail_url': request.media_url}}
        )

    media_id = os.path.splitext(request.media_url.split('/')[-1])[0]
    media = {
        'media_id': media_id,
        'user_id': user_id,
        'album_id': request.album_id,
        'media_url': request.media_url,
        'media_name': request.media_name,
        'media_type': request.media_type,
        'caption': request.caption,
        'ingredients': request.ingredients,
        'instructions': request.instructions,
        'created_at': datetime.now()
    }

    await db['medias'].insert_one(media)
    return {'message': 'Create media successfully'}


@router.patch('/update')
async def update_media(
    request: MediaUpdate,
    user_id: str = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    update_fields = request.model_dump(exclude_none=True, exclude_unset=True)

    result = await db['medias'].update_one(
        {'media_id': request.media_id, 'user_id': user_id},
        {'$set': update_fields}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Media not found")
    
    return {"message": "Media updated successfully"}



@router.delete('/delete')
async def delete_media(
    request: list[MediaDelete], 
    user_id: str = Depends(get_current_user), 
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    media_ids = [item.media_id for item in request]

    result = await db['medias'].delete_many(
        {
            'media_id': {'$in': media_ids},
            'user_id': user_id
        })

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="No media found to delete")

    return {"message": f"Successfully deleted {result.deleted_count} media"}



@router.delete('/delete-album')
async def delete_media_album(album_id: str, user_id: str=Depends(get_current_user), db: AsyncIOMotorDatabase=Depends(get_db)):
    result = await db['medias'].delete_many(
        {
            'album_id': album_id,
            'user_id': user_id
        }
    )
    return {"message": f"{result.deleted_count} media deleted successfully"} 

