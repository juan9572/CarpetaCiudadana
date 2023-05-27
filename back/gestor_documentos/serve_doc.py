from flask import Flask, request, jsonify
from pymongo import MongoClient
import boto3
import os
from dotenv import load_dotenv

app = Flask(__name__)

@app.route('/hello', methods=['GET'])
def hello():
    return "Hello"

# Ruta para subir el archivo PDF del ciudadano
@app.route('/ciudadanos', methods=['POST'])
def subir_ciudadano():
    nombre = request.form['name']
    archivo_pdf = request.files['file']
    # Mover el archivo al directorio temporal
    ruta_temporal = os.path.join('/files/', archivo_pdf.filename)
    archivo_pdf.save(ruta_temporal)
    # Guardar el archivo en S3 y obtener la URL
    url_pdf = guardar_archivo_s3(open(ruta_temporal, 'rb'), nombre + '.pdf')
    # Guardar los datos del ciudadano en MongoDB
    ciudadano = {'nombre': nombre, 'url_pdf': url_pdf}
    collection.insert_one(ciudadano)
    # Eliminar el archivo temporal
    os.remove(ruta_temporal)
    return jsonify({'message': 'Ciudadano guardado correctamente.'})

# Función para guardar el archivo en S3 y obtener la URL
def guardar_archivo_s3(archivo, nombre_archivo):
    bucket_name = 'nombre_del_bucket'  # Reemplaza con el nombre de tu bucket en S3
    s3.upload_fileobj(archivo, bucket_name, nombre_archivo)
    url = f'https://{bucket_name}.s3.amazonaws.com/{nombre_archivo}'
    return url

def get_boto_client():
    connection = boto3.client(
        's3',
        aws_access_key_id=credentialsAWS[0],
        aws_secret_access_key=credentialsAWS[1],
        aws_session_token=credentialsAWS[2],
        region_name="us-east-1"
    )
    return connection

def get_credentials_db():
    host = os.getenv('MONGO_HOST')
    port = os.getenv('MONGO_PORT')
    return (host, int(port))

def get_aws_keys():
    access = os.getenv('ACCESS_KEY')
    secret = os.getenv('SECRET_KEY')
    session = os.getenv('SESSION_TOKEN')
    return (access, secret, session)

if __name__ == '__main__':
    load_dotenv()
    #Aws config
    credentialsAWS = get_aws_keys()
    s3 = get_boto_client()
    #Db config
    credentialsDB = get_credentials_db()
    client = MongoClient(credentialsDB[0], credentialsDB[1])
    db = client['carpeta_ciudadana']
    collection = db['ciudadanos'];
    app.run()
    print("All closed")