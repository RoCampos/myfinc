from sqlalchemy import create_engine
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv

load_dotenv()

sync_engine = create_engine(
    f"postgresql+psycopg://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}@localhost:5432/{os.getenv('POSTGRES_DB')}"
)

def get_connection():
    return Session(bind=sync_engine)
