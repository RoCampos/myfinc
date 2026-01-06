from flask_login import UserMixin
from flask_login import LoginManager
from app.models.user import User

login_manager = LoginManager()
login_manager.login_view = 'auth.login'

@login_manager.user_loader
def load_user(user_id):
    return User.get(int(user_id))
