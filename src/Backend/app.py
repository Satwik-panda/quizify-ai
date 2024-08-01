from flask_cors import CORS
from flask import Flask
from users import user_blueprint

app = Flask(__name__)
CORS(app)

# user login blueprint we have to register
app.register_blueprint(user_blueprint)

if __name__ == '__main__':
    app.run()

    
