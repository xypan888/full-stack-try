from sqlalchemy import Engine
from sqlmodel import Session, select

from model.user import User,UserResponse

class UserRepository:
    def __init__(self, engine: Engine):
        self.engine = engine

    def create_user(self,email: str, hashed_password: str) -> UserResponse:
        new_user = User(email=email, hashed_password=hashed_password)
        with Session(self.engine) as session:
            session.add(new_user)
            session.commit()
            session.refresh(new_user)
        return UserResponse.model_validate(new_user)

    def get_by_email(self,email: str) -> User | None:
        with Session(self.engine) as session:
            statement = select(User).where(User.email == email)
            result = session.exec(statement).first()
            return result