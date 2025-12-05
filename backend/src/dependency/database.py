import os

from sqlalchemy import Engine, event
from sqlmodel import SQLModel, create_engine
from dotenv import load_dotenv

load_dotenv()  
DATABASE_URL = os.getenv("DATABASE_URL")

class EngineFactory:
    def __init__(self):
        self._engine = None

    def get_engine(self) -> Engine:
        if not self._engine:
            self._engine = self.create_engine()
        return self._engine

    def create_engine(self) -> Engine:
        if DATABASE_URL:
            engine = create_engine(DATABASE_URL, echo=True)
            SQLModel.metadata.create_all(engine)
        else:
            raise ValueError("DATABASE_URL is not set in environment variables.")
        return engine
    def dispose_engine(self):
        if self._engine:
            self._engine.dispose()
            self._engine = None