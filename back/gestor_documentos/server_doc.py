import os
import datetime
from flask import Flask
from flask_cors import CORS
from aws import uploadFiles
from dotenv import load_dotenv
from models import DatabaseHandler
from flask_jwt_extended import JWTManager
from documentos import documentos_blueprint
from apscheduler.schedulers.background import BackgroundScheduler

db_handler = DatabaseHandler()
files = uploadFiles()
app = Flask(__name__)

cors = CORS(app)

app.register_blueprint(documentos_blueprint)

def delete_temp_documents():
    try:
        users = db_handler.get_temp_documents()
        current_time = datetime.datetime.now()
        for user in users:
            for doc in user['carpeta']:
                creation_time = doc['creation_time']
                time_difference = current_time - creation_time
                if doc['temp'] and time_difference.total_seconds() >= 24 * 60 * 60:
                    url_id = doc['id']
                    files.delete_file(url_id)
                    db_handler.delete_doc(user['cedula'], doc['id'])
    except Exception as e:
        print('Error deleting temp documents:', str(e))

if __name__ == '__main__':
    load_dotenv()
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    jwt = JWTManager(app)
    scheduler = BackgroundScheduler()
    scheduler.add_job(delete_temp_documents, 'interval', hours=1)  # Ejecuta la función cada hora
    scheduler.start()
    app.run(host='0.0.0.0', port=5001)
