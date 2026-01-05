from flask.typing import ResponseReturnValue
from flask import Blueprint
from flask_inertia import render_inertia


auth = Blueprint('auth', __name__)

@auth.route('/login') 
def login() -> ResponseReturnValue:    
    return render_inertia(
        component_name='Auth/Login')


@auth.route('/register') 
def register() -> ResponseReturnValue:
    return render_inertia(
        component_name='Auth/Register')
