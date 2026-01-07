from flask.typing import ResponseReturnValue
from flask import Blueprint, request, redirect, url_for, flash
from flask_inertia import render_inertia
from app.services.database import get_connection
from flask_login import login_required, login_user, logout_user
from app.models.user import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import current_user



auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['GET', 'POST']) 
def login() -> ResponseReturnValue:    
    if request.method == 'POST':

        email = request.json['email']
        password = request.json['password']

        with get_connection() as session:
            user = session.query(User).filter_by(email=email).first()

            if not user:
                flash('User not found', 'error')
                return redirect(url_for('auth.login'), 302)
            
            if not check_password_hash(user.password, password):
                flash('Invalid password', 'error')
                return redirect(url_for('auth.login'), 302)
            
            login_user(user)
            return redirect(url_for('auth.dashboard'))    

    return render_inertia(
        component_name='Auth/Auth')


@auth.route('/register', methods=['GET', 'POST']) 
def register() -> ResponseReturnValue:
    if request.method == 'POST':

        email = request.json['email']
        name = request.json['name']
        password = request.json['password']

        with get_connection() as session:
            resultado = session.query(User).filter_by(email=email).first()

            if not resultado:
                user = User(
                    name=name,
                    email=email,
                    password=generate_password_hash(password)
                )
                session.add(user)
                session.commit()
            else:
                flash('Usuário já existe', 'error')
                return redirect(url_for('auth.login'), 302)                
        
        return redirect(url_for('auth.dashboard'))

    return render_inertia(
        component_name='Auth/Auth')


@auth.route('/dashboard')
@login_required 
def dashboard() -> ResponseReturnValue:
    return render_inertia(
        component_name='Dashboard',
        props={
            'user': current_user.name
        }
    )

@auth.route('/logout', methods=['POST'])
@login_required
def logout () -> ResponseReturnValue:
    logout_user()
    return redirect(url_for('auth.login'))