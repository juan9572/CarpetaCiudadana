from models import DatabaseHandler
from interfaz_datos import ExtracInfo
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt

ciudadano_blueprint = Blueprint('ciudadano', __name__, url_prefix='/ciudadano')
db_handler = DatabaseHandler()

info = ExtracInfo()

@ciudadano_blueprint.route('/login', methods=['POST'])
def login_ciudadano():
    try:
        # Extraer datos
        data = request.get_json()
        cedula, password = info.login_ciudadano_data(data)

        # Verificar credenciales
        ciudadano = db_handler.get_ciudadano_by_cedula(cedula)
        if ciudadano is None or ciudadano['password'] != password:
            return jsonify({'error': 'Cédula o constraseña incorrecta'}), 401
        access_token = create_access_token(identity=ciudadano['cedula'])

        return jsonify({'access_token': access_token}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ciudadano_blueprint.route('/register', methods=['POST'])
def register_ciudadano():
    try:
        # Extraer datos
        data = request.get_json()
        (cedula, name, email, password, operadorAsociado,
          number_phone, carpeta) = info.register_ciudadano_data(data)

        # Insertar datos en la base de datos
        db_handler.insert_ciudadano(cedula, name, email, password,
                                     operadorAsociado, number_phone, carpeta)

        return jsonify({'message': 'Ciudadano registrado exitosamente'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ciudadano_blueprint.route('/<cedula>', methods=['PUT'])
@jwt_required()
def update_ciudadano(cedula):
    try:
        token = get_raw_jwt()['jti']
        if db_handler.is_token_revoked(token):
            return jsonify({'message': 'Token already revoked'}), 401
        # Extraer datos
        data = request.get_json()
        name, number_phone = info.update_ciudadano_data(data)

        # Verificar si el ciudadano existe
        ciudadano = db_handler.get_ciudadano_by_cedula(cedula)
        if ciudadano is None:
            return jsonify({'error': 'Cédula no encontrada'}), 404

        # Actualizar los campos modificables del ciudadano
        ciudadano['name'] = name or ciudadano['name']
        ciudadano['number_phone'] = number_phone or ciudadano['number_phone']

        # Actualizar el ciudadano en la base de datos
        db_handler.update_ciudadano(ciudadano)

        return jsonify({'message': 'Ciudadano actualizado exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ciudadano_blueprint.route('/logout', methods=['POST'])
@jwt_required()
def logout_ciudadano():
    try:
        token = get_jwt()['jti']
        if db_handler.is_token_revoked(token):
            return jsonify({'message': 'Token already revoked'}), 401
        db_handler.add_revokedToken(token)
        return jsonify({'message': 'Logout exitoso'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

