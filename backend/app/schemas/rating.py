from pydantic import BaseModel
from typing import Optional


class Rating(BaseModel):
    media_url: str
    rate: int
    feedback: Optional[str] = None
    caption: str
    ingredients: Optional[list[str]] = []
    instructions: Optional[list[str]] = []
