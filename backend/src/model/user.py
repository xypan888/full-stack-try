from sqlmodel import SQLModel, Field
from datetime import datetime, timezone
import uuid


class User(SQLModel, table=True):
    id: uuid.UUID | None = Field(default_factory=uuid.uuid4, primary_key=True)
    email: str = Field(index=True, nullable=False, unique=True)
    hashed_password: str = Field(nullable=False)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserCreate(SQLModel):
    email: str 
    password: str 

class UserResponse(SQLModel):
    id: uuid.UUID
    email: str
    created_at: datetime
    updated_at: datetime