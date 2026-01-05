from flask import Flask
from dotenv import load_dotenv
import os
from app.services.inertia import inertia
from app.controllers.testController import testBP
from app.controllers.auth.AuthController import auth
from app.services.database import get_connection, sync_engine
from app.models import Base

load_dotenv()

def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['INERTIA_TEMPLATE'] = os.getenv('INERTIA_TEMPLATE')
    app.config['INERTIA_ASSETS'] = os.getenv('INERTIA_ASSETS')

    Base.metadata.create_all(bind=sync_engine)

    from flask_cors import CORS
    CORS(app)
    inertia.init_app(app)

    #inertia configurations as a blueprint    
    app.register_blueprint(testBP)
    app.register_blueprint(auth)
    
    return app