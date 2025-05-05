from fastapi import APIRouter, HTTPException, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.dependencies import get_current_user, get_db
from app.schemas.album import AlbumCreate, AlbumResponse, AlbumUpdate, AlbumDelete
from app.utils.media import generate_display_path, convert_to_db_url
from uuid import uuid4
from datetime import datetime


router = APIRouter()


@router.post('/create')
async def create_album(
    album: AlbumCreate, 
    user_id: str=Depends(get_current_user), 
    db: AsyncIOMotorDatabase=Depends(get_db)
):
    album = {
        'album_id': str(uuid4()),
        'album_name': album.album_name,
        'user_id': user_id,
        'created_at': datetime.now()
    }

    await db['albums'].insert_one(album)
    return {'message': 'Album created successfully'}


@router.get('/read', response_model=list[AlbumResponse])
async def read_all_albums(
    user_id: str=Depends(get_current_user), 
    db: AsyncIOMotorDatabase=Depends(get_db)
):
    albums_cursor = db['albums'].find({'user_id': user_id})
    albums = []
    async for album in albums_cursor:
        new_album = {            
            'album_id': album['album_id'],
            'album_name': album['album_name'],
            'created_at': album['created_at']
        }

        if 'thumbnail_url' in album:
            media = await db['medias'].find_one({'media_url': album['thumbnail_url']})
            if media:
                new_album['thumbnail_url'] = generate_display_path(album['thumbnail_url']) 
            else: 
                await db['albums'].update_one(
                    {'album_id': album['album_id'], 'user_id': user_id},
                    {'$unset': {'thumbnail_url': 1}}
                )           
        albums.append(new_album)
            
    return albums


@router.patch('/update')
async def update_album(
    request: AlbumUpdate,
    user_id: str = Depends(get_current_user),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    update_fields = request.model_dump(exclude_none=True, exclude_unset=True)
    if 'thumbnail_url' in update_fields:
        update_fields['thumbnail_url'] = convert_to_db_url(update_fields['thumbnail_url'])

    if not update_fields:
        raise HTTPException(status_code=400, detail="No fields provided for update")

    result = await db['albums'].update_one(
        {'album_id': request.album_id, 'user_id': user_id},
        {'$set': update_fields}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Album not found")

    return {"message": "Album updated successfully"}


@router.delete('/delete')
async def delete_album(
    request: list[AlbumDelete], 
    user_id: str = Depends(get_current_user), 
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    album_ids = [item.album_id for item in request]

    result = await db['albums'].delete_many({
        'album_id': {'$in': album_ids},
        'user_id': user_id
    })

    await db['medias'].delete_many({
        'album_id': {'$in': album_ids},
        'user_id': user_id
    })

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="No albums found to delete")

    return {"message": f"Successfully deleted {result.deleted_count} album(s)"}



