from pydantic import BaseModel


class RoleRequest(BaseModel):
    user_id: str
    new_role: str


class FeedBackResponse(BaseModel):
    full_name: str
    created_at: str
    rating: int
    feedback: str
    caption: str
    media_url: str