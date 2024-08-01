# db.py
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

def get_database():
    client = MongoClient(os.getenv('MONGO_URL'))
    db = client['quizify']
    return db

def get_users_collection():
    db = get_database()
    return db['users_data']
