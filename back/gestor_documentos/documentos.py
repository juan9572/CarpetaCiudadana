from aws import uploadFiles
from models import DatabaseHandler
from interfaz_presentacion import ExtracInfo
from flask import Blueprint, request, jsonify
from interfaz_documentos import InteractWithAPI
from flask_jwt_extended import jwt_required

documentos_blueprint = Blueprint('documentos', __name__, url_prefix='/docs')
db_handler = DatabaseHandler()
info = ExtracInfo()
files = uploadFiles()
authenticate = InteractWithAPI()

@documentos_blueprint.route('/create-folder', methods=['POST'])
@jwt_required()
def create_folder():
    try:
        token = request.headers.get('Authorization').replace('Bearer ', '')
        instance_token = db_handler.get_activeToken(token)
        if not (instance_token):
            return jsonify({'message': 'Token not valid'}), 401

        # Extraer datos
        data = request.get_json()
        id = info.create_folder(data)

        # Verificar credenciales
        if instance_token["typeUser"] == "1":
            name = db_handler.get_operador_name_by_name_admin(id)
            files.create_folder(name)
        else:
            name = db_handler.get_operador_name_by_cedula_ciudadano(id)
            files.create_folder(f'{name}/{id}')

        return jsonify({'message': 'Carpeta creada'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@documentos_blueprint.route('/delete-folder', methods=['POST'])
@jwt_required()
def delete_folder():
    try:
        token = request.headers.get('Authorization').replace('Bearer ', '')
        instance_token = db_handler.get_activeToken(token)
        if not (instance_token):
            return jsonify({'message': 'Token not valid'}), 401

        # Extraer datos
        data = request.get_json()
        id = info.delete_folder(data)

        # Verificar credenciales
        if instance_token["typeUser"] == "1":
            name = db_handler.get_operador_name_by_name_admin(id)
            files.delete_folder(name)
        else:
            name = db_handler.get_operador_name_by_cedula_ciudadano(id)
            files.delete_folder(f'{name}/{id}')

        # Actualizar la base de datos
        db_handler.delete_folder(id)

        return jsonify({'message': 'Carpeta eliminada'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@documentos_blueprint.route('/upload-file', methods=['POST'])
@jwt_required()
def upload_file():
    try:
        token = request.headers.get('Authorization').replace('Bearer ', '')
        instance_token = db_handler.get_activeToken(token)
        if not (instance_token):
            return jsonify({'message': 'Token not valid'}), 401

        # Extraer datos
        cedula, name, description, file = info.upload_file(request)

        # Agregar archivo
        operador = db_handler.get_operador_name_by_cedula_ciudadano(cedula)
        url_id = files.upload_file(file, file.filename, operador, cedula)

        #Guardar en db
        document = {
            'id': url_id,
            'name': name,
            'descripcion': description
        }
        db_handler.insert_doc(cedula, document)

        return jsonify({'message': 'Documento guardado exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@documentos_blueprint.route('/update-file', methods=['POST'])
@jwt_required()
def update_file():
    try:
        token = request.headers.get('Authorization').replace('Bearer ', '')
        instance_token = db_handler.get_activeToken(token)
        if not instance_token:
            return jsonify({'message': 'Token not valid'}), 401

        # Extraer datos
        cedula, doc_id, name, description, file = info.update_file(request)

        # Obtener el ID del documento a actualizar
        url_id = ""
        if file:
            files.delete_file(doc_id)
            operador = db_handler.get_operador_name_by_cedula_ciudadano(cedula)
            url_id = files.upload_file(file, file.filename, operador, cedula)
        else:
            url_id = doc_id


        # Actualizar los metadatos del documento en la base de datos
        document = {
            'carpeta.$.id':  url_id,
            'carpeta.$.name': name,
            'carpeta.$.descripcion': description
        }
        db_handler.update_doc(cedula, doc_id, document)

        return jsonify({'message': 'Documento actualizado exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@documentos_blueprint.route('/delete-file', methods=['POST'])
@jwt_required()
def delete_file():
    try:
        token = request.headers.get('Authorization').replace('Bearer ', '')
        instance_token = db_handler.get_activeToken(token)
        if not instance_token:
            return jsonify({'message': 'Token not valid'}), 401

        # Extraer datos
        data = request.get_json()
        cedula, doc_id = info.delete_file(data)

        # Borrar el archivo de S3
        files.delete_file(doc_id)

        # Actualizar los metadatos en la base de datos
        db_handler.delete_doc(cedula, doc_id)

        return jsonify({'message': 'Documento eliminado exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@documentos_blueprint.route('/share-files', methods=['POST'])
@jwt_required()
def share_files():
    try:
        token = request.headers.get('Authorization').replace('Bearer ', '')
        instance_token = db_handler.get_activeToken(token)
        if not instance_token:
            return jsonify({'message': 'Token not valid'}), 401

        # Extraer datos
        data = request.get_json()
        files_to_share, ciudadano_destino = info.share_files(data)
        ciudadano = db_handler.get_ciudadano_by_email(ciudadano_destino)
        if ciudadano:
            operador = db_handler.get_operador_name_by_cedula_ciudadano(
                ciudadano['cedula']
            )

            # Compartir los archivos del S3 a otro lugar
            urls = files.share_files(files_to_share['urls'], operador, ciudadano['cedula'])

            # Actualizar los metadatos en la base de datos
            for i in range(len(urls)):
                doc = {
                    'id': urls[i],
                    'name': files_to_share['name'][i],
                    'descripcion': files_to_share['descripcion'][i]
                }
                ciudadano['carpeta'].append(doc)
            db_handler.update_folder(ciudadano)
        else:
            pass

        return jsonify({'message': 'Se compartio exitosamente los documentos'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
