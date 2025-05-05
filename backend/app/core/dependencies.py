from fastapi import Depends
from app.core.config import oauth2_scheme, database
from app.utils.token import verify_token


async def get_db():
    return database


async def get_current_user(access_token: str=Depends(oauth2_scheme)):
    payload = verify_token(access_token)
    return payload.get('sub')
