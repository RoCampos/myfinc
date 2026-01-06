from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from app.models import Base
from flask_login import UserMixin
from app.services.database import get_connection

class User(Base, UserMixin):
    __tablename__ = "users"
    id:Mapped[int] = mapped_column(primary_key=True)
    name:Mapped[str] = mapped_column(String)
    email:Mapped[str] = mapped_column(String)
    password:Mapped[str] = mapped_column(String)

    @classmethod
    def get(cls, user_id):
        with get_connection() as session:
            user = session.query(User).filter_by(id=user_id).first()
            return user
        return None