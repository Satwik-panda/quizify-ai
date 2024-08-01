from flask_bcrypt import Bcrypt
from mongo_db import get_users_collection
from flask import Blueprint, request, jsonify
import random
from bson.json_util import dumps


user_blueprint = Blueprint('user_blueprint', __name__)
bcrypt = Bcrypt()

def generate_session_id():
    return ''.join([str(random.randint(0, 9)) for _ in range(14)])

@user_blueprint.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    if not (email and password):
        return jsonify({"message": "Missing fields!" , "status":False})

    print("data received from frontend form----------*********",data)
    users_collection = get_users_collection()
    user = users_collection.find_one({"email": email})
    print("user----------",user)
    username = user['username']

    if not user:
        return jsonify({"message": "Invalid email or password !!" , "status": False})

    if bcrypt.check_password_hash(user['password'], password):
        session_id = generate_session_id()
        users_collection.update_one({"email": email}, {"$set": {"session_id": session_id}})
        return jsonify({"message": "Login successful !!", "session_id": session_id , "username": username ,"status":True ,  "email": user["email"]})
    else:
        return jsonify({"message": "Invalid email or password !!", "status": False})


@user_blueprint.route('/logout', methods=['POST'])
def logout():
    data = request.json
    session_id = data.get('session_id')
    
    if not session_id:
        return jsonify({"message": "Missing session ID !!" , "status" : False})

    users_collection = get_users_collection()
    user = users_collection.find_one({"session_id": session_id})
    print("setting sID null for user:",user)

    if not user:
        return jsonify({"message": "Invalid session ID !!", "status" : False})

    email = user['email']
    users_collection.update_one({"email": email}, {"$unset": {"session_id": ""}})

    return jsonify({"message": "Logout successful !!" , "status" : True})


@user_blueprint.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')
    print("data", data)

    if not (email and password and username):
        return jsonify({"message": "Missing fields !!" , "status" : False})

    users_collection = get_users_collection()

    if users_collection.find_one({"email": email}):
        return jsonify({"message": "Email already exists !!" , "status" : False})

    session_id = generate_session_id()

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    users_collection.insert_one({"email": email, "password": hashed_password, "username": username, "session_id": session_id})

    user = users_collection.find_one({"email": email})

    return jsonify({"message": "Signup successful !!", "session_id": session_id , "username": username ,"status":True , "email": user["email"] })

@user_blueprint.route('/fetch_user', methods=['GET'])
def fetch_user():
    email = request.args.get('email')
    
    if not email:
        return jsonify({"message": "Missing Email !!"})

    users_collection = get_users_collection()
    user = users_collection.find_one({"email": email}, {"_id": 0, "username": 1, "email": 1, "quizzes":1})
    print("user---------------",user)
    if not user:
        return jsonify({"message": "Invalid email ID!"})

    return dumps(user)

@user_blueprint.route('/change_password', methods=['POST'])
def change_password():
    data = request.json
    session_id = data.get('session_id')
    current_password = data.get('current_password')
    new_password = data.get('new_password')

    if not (session_id and current_password and new_password):
        return jsonify({"message": "Missing fields!"}), 400

    users_collection = get_users_collection()
    user = users_collection.find_one({"session_id": session_id})

    if not user:
        return jsonify({"message": "Invalid session ID!"}), 400

    if bcrypt.check_password_hash(user['password'], current_password):
        hashed_new_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        users_collection.update_one({"session_id": session_id}, {"$set": {"password": hashed_new_password}})
        return jsonify({"message": "Password updated successfully!"}), 200
    else:
        return jsonify({"message": "Current password is incorrect!"}), 400

@user_blueprint.route('/change_username', methods=['POST'])
def change_username():
    data = request.json
    session_id = data.get('session_id')
    new_username = data.get('new_username')

    if not (session_id and new_username):
        return jsonify({"message": "Missing fields!"}), 400

    users_collection = get_users_collection()
    user = users_collection.find_one({"session_id": session_id})

    if not user:
        return jsonify({"message": "Invalid session ID!"}), 400

    users_collection.update_one({"session_id": session_id}, {"$set": {"username": new_username}})
    return jsonify({"message": "Username updated successfully!"}), 200

@user_blueprint.route('/store_quiz', methods=['POST'])
def store_quiz():
    data = request.json
    session_id = data.get('session_id')
    quiz_data = data.get('quiz_data')
    
    # if not session_id or not quiz_data:
    #     return jsonify({"message": "Missing fields!"}), 400

    users_collection = get_users_collection()
    user = users_collection.find_one({"session_id": session_id})

    if not user:
        return jsonify({"message": "Invalid session ID!"}), 401

    # Add the quiz data to the user's document
    result = users_collection.update_one(
        {"session_id": session_id},
        {"$push": {"quizzes": quiz_data}}
    )

    if result.modified_count == 1:
        return jsonify({"message": "Quiz data stored successfully!"}), 200
    else:
        return jsonify({"message": "Failed to store quiz data."}), 500
