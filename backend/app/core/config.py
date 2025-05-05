from dotenv import load_dotenv
import os
from fastapi.security import OAuth2PasswordBearer
from motor.motor_asyncio import AsyncIOMotorClient


load_dotenv()

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES'))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv('REFRESH_TOKEN_EXPIRE_DAYS'))
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
JWT_ALGORITHM = os.getenv('JWT_ALGORITHM')

MONGODB_DB_NAME = os.getenv('MONGODB_DB_NAME')
MONGODB_URI = os.getenv('MONGODB_URI')

client = AsyncIOMotorClient(MONGODB_URI)
database = client[MONGODB_DB_NAME]
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/auth/login')