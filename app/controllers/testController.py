from flask.blueprints import Blueprint
from flask.typing import ResponseReturnValue
from flask_inertia import render_inertia

testBP = Blueprint('teste', __name__)

@testBP.route('/teste')
def index() -> ResponseReturnValue:

    data = {
        'user': 'Romerito',
        'login': 'bar',
    }

    return render_inertia(
        component_name='Index',
        props=data,
        view_data={
            'description': 'TestPage'
        }
    )
