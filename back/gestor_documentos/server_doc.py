import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from documentos import documentos_blueprint

app = Flask(__name__)

cors = CORS(app)

app.register_blueprint(documentos_blueprint)

if __name__ == '__main__':
    load_dotenv()
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    jwt = JWTManager(app)
    app.run(host='0.0.0.0', port=5001)
