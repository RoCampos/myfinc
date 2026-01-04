from flask.blueprints import Blueprint
from flask_inertia import Inertia

inertia_bp = Blueprint('inertia', __name__)

inertia = Inertia()
inertia.init_app(inertia_bp)