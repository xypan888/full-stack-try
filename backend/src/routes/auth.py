from fastapi import FastAPI, APIRouter,Depends, HTTPException
from sqlmodel import Session, select
from infra.hasher import hash_password, verify_password

from model.user import User, UserCreate, UserResponse
from dependency.database import EngineFactory

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)
engine_factory = EngineFactory()

@router.post("/register",response_model=UserResponse)
async def register(user_data: UserCreate):
    engine = engine_factory.get_engine()
    with Session(engine) as session:
        existing_user = session.exec(select(User).where(User.email == user_data.email)).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
    
    password_haser = hash_password(user_data.password)
    new_user = User(
        email=user_data.email, 
        hashed_password=password_haser
    )

    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return UserResponse.model_validate(new_user)


@router.post("/login",response_model=UserResponse)
async def login(user_data: UserCreate):
    engine = engine_factory.get_engine()
    with Session(engine) as session:
        user = session.exec(select(User).where(User.email == user_data.email)).first()

        if not user :
            raise HTTPException(
                status_code=404, 
                detail="User not found"
            )
        if not verify_password(user_data.password,user.hashed_password):
            raise HTTPException(
                status_code=401,
                detail="Invalid credentials"
            )
    return UserResponse.model_validate(user)
