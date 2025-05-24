from fastapi import APIRouter, HTTPException, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.config import config
from app.schemas.admin import RoleRequest, FeedBackResponse
from app.utils.s3 import generate_presigned_url
from botocore.client import BaseClient
from app.core.dependencies import get_current_user, get_mongo_db, get_s3_client


router = APIRouter()


@router.get('/star')
async def count_star(db: AsyncIOMotorDatabase = Depends(get_mongo_db)):
    pipeline = [
        {"$group": {"_id": "$rate", "count": {"$sum": 1}}}
    ]

    result = await db.ratings.aggregate(pipeline).to_list(length=None)

    rate_counts = {str(i): 0 for i in range(1, 6)}

    for item in result:
        rate = str(item["_id"])
        count = item["count"]
        if rate in rate_counts:
            rate_counts[rate] = count

    return rate_counts


@router.get('/star-summay')
async def get_star_summary(db: AsyncIOMotorDatabase = Depends(get_mongo_db)):
    pipeline = [
        {
            "$group": {
                "_id": None,
                "total": {"$sum": 1},
                "avg": {"$avg": "$rate"}
            }
        }
    ]

    result = await db.ratings.aggregate(pipeline).to_list(length=1)

    if result:
        return {
            "total_ratings": result[0]["total"],
            "average_rating": round(result[0]["avg"], 2)
        }
    else:
        return {
            "total_ratings": 0,
            "average_rating": 0.0
        }
    
@router.get('/users')
async def get_all_users(db: AsyncIOMotorDatabase = Depends(get_mongo_db)):
    users_cursor = db['users'].find({}, {'password': 0, '_id': 0})
    users = await users_cursor.to_list(length=None)
    return users


@router.post('/role')
async def change_user_role(request: RoleRequest, db: AsyncIOMotorDatabase = Depends(get_mongo_db)):
    result = await db.users.update_one(
        {"user_id": request.user_id},
        {"$set": {"role": request.new_role}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "User role updated successfully"}

@router.post("/lock")
async def lock_or_unlock_account(user_id: str, db: AsyncIOMotorDatabase = Depends(get_mongo_db)):
    user = await db["users"].find_one({"user_id": user_id})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    current_locked = user.get("locked", False)
    new_locked = not current_locked

    await db["users"].update_one(
        {"user_id": user_id},
        {"$set": {"locked": new_locked}}
    )

    return {"message": "User account has been locked successfully"}


@router.get('/feedback', response_model=list[FeedBackResponse])
async def get_feedbacks(
    db: AsyncIOMotorDatabase = Depends(get_mongo_db), 
    s3_client: BaseClient = Depends(get_s3_client) 
):
    pipeline = [
        {
            "$lookup": {
                "from": "users",
                "localField": "user_id",
                "foreignField": "user_id",
                "as": "user_info"
            }
        },
        { "$unwind": "$user_info" },
        {
            "$project": {
                "_id": 0,
                "full_name": "$user_info.fullname",
                "created_at": {
                    "$dateToString": {
                        "format": "%Y-%m-%dT%H:%M:%S.%LZ",
                        "date": "$created_at"
                    }
                },
                "rating": "$rate",
                "feedback": 1,
                "caption": 1,
                "media_url": 1
            }
        }
    ]

    cursor = db['ratings'].aggregate(pipeline)
    results = await cursor.to_list(length=None)

    for feedback in results:
        if feedback.get("media_url"):
            feedback["media_url"] = generate_presigned_url(feedback["media_url"], s3_client)

    return results

@router.get('/statistics')
async def get_statistics(db: AsyncIOMotorDatabase = Depends(get_mongo_db)):
    medias_count = await db.medias.count_documents({})
    users_count = await db.users.count_documents({})
    pipeline = [
        {
            "$group": {
                "_id": None,
                "avg_rating": {"$avg": "$rate"}
            }
        }
    ]

    cursor = db.ratings.aggregate(pipeline)
    agg_result = await cursor.to_list(length=1)
    avg_rating = agg_result[0]['avg_rating'] if agg_result else None

    return {
        "medias_count": medias_count,
        "users_count": users_count,
        "avg_rating": avg_rating
    }