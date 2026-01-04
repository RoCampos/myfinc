from flask import Flask
from dotenv import load_dotenv
import os
from app.services.inertia import inertia
from app.controllers.testController import testBP

load_dotenv()

def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['INERTIA_TEMPLATE'] = os.getenv('INERTIA_TEMPLATE')
    app.config['INERTIA_ASSETS'] = os.getenv('INERTIA_ASSETS')

    from flask_cors import CORS
    CORS(app)
    inertia.init_app(app)

    #inertia configurations as a blueprint    
    app.register_blueprint(testBP)
    
    return app