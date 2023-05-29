from datetime import timedelta
from models import DatabaseHandler
from interfaz_datos import ExtracInfo
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required

admin_blueprint = Blueprint('admin', __name__, url_prefix='/admin')
db_handler = DatabaseHandler()
info = ExtracInfo()

@admin_blueprint.route('/register', methods=['POST'])
def register_admin():
    try:
        # Extraer datos
        data = request.get_json()
        (name, email,
          password, operador) = info.register_admin_data(data)

        # Insertar datos en la base de datos
        db_handler.insert_admin(name, email, password, operador)

        return jsonify(
            {'message': 'Administrador registrado exitosamente'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_blueprint.route('/login', methods=['POST'])
def login_admin():
    try:
        # Extraer datos
        data = request.get_json()
        name, password = info.login_admin_data(data)

        # Verificar credenciales
        admin = db_handler.get_admin_by_name(name)
        if admin is None or admin['password'] != password:
            return jsonify({'error': 'Cédula o constraseña incorrecta'}), 401
        access_token = create_access_token(identity=admin['name'],
                                            expires_delta=timedelta(hours=24))

        #Agregamos el token a la db
        db_handler.add_activeToken(access_token, '1')

        return jsonify({'access_token': access_token}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_blueprint.route('/logout', methods=['POST'])
@jwt_required()
def logout_admin():
    try:
        token = request.headers.get('Authorization').replace('Bearer ', '')
        instance_token = db_handler.get_activeToken(token)
        if not (instance_token and instance_token['typeUser'] == '1'):
            return jsonify({'message': 'Token not valid'}), 401
        db_handler.remove_activeToken(token)
        return jsonify({'message': 'Logout exitoso'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_blueprint.route('/update_operador', methods=['PUT'])
@jwt_required()
def update_operador():
    try:
        token = request.headers.get('Authorization').replace('Bearer ', '')
        instance_token = db_handler.get_activeToken(token)
        if not (instance_token and instance_token['typeUser'] == '1'):
            return jsonify({'message': 'Token not valid'}), 401

        # Extraer datos
        data = request.get_json()
        (name_admin, name_operador,
          email, serviciosPremium) = info.update_admin_operador(data)

        # Trae al admin existente
        admin = db_handler.get_admin_by_name(name_admin)
        if admin is None:
            return jsonify({'error': 'Admin no encontrado'}), 404

        # Actualizar los campos modificables del ciudadano
        admin['operador']['name'] = name_operador or admin['operador']['name']
        admin['operador']['email'] = email or admin['operador']['email']
        admin['operador']['serviciosPremium'] = (
                    serviciosPremium or admin['operador']['serviciosPremium']
        )

        # Actualizar el operador en la base de datos
        db_handler.update_operador(admin)

        return jsonify({'message': 'Operador actualizado exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_blueprint.route('/update_servicio', methods=['PUT'])
@jwt_required()
def add_servicio():
    try:
        token = request.headers.get('Authorization').replace('Bearer ', '')
        instance_token = db_handler.get_activeToken(token)
        if not (instance_token and instance_token['typeUser'] == '1'):
            return jsonify({'message': 'Token not valid'}), 401

        # Extraer datos
        data = request.get_json()
        (name_admin, name_servicio,
          id_servicio) = info.update_admin_servicio(data)

        #Crear servicio
        servicio = {'name': name_servicio, 'id': id_servicio}

        # Crear un nuevo servicio
        admin = db_handler.get_admin_by_name(name_admin)
        if admin is None:
            return jsonify({'error': 'Admin no encontrado'}), 404

        # Actualizar el servicio en la base de datos
        admin['operador']['serviciosPremium'] = (servicio or
                                    admin['operador']['serviciosPremium'])

        # Agregar el servicio a la base de datos
        db_handler.update_servicio(admin)

        return jsonify({'message': 'Servicio agregado exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@admin_blueprint.route('/delete_servicio/<name_admin>',
                        methods=['DELETE'])
@jwt_required()
def delete_servicio(name_admin):
    try:
        token = request.headers.get('Authorization').replace('Bearer ', '')
        instance_token = db_handler.get_activeToken(token)
        if not (instance_token and instance_token['typeUser'] == '1'):
            return jsonify({'message': 'Token not valid'}), 401

        # Obtener el servicio existente
        admin = db_handler.get_admin_by_name(name_admin)
        if admin is None:
            return jsonify({'error': 'Admin no encontrado'}), 404

        #Borrar servicio
        admin["operador"]["serviciosPremium"] = {}

        # Actualizar el servicio de la base de datos
        db_handler.update_servicio(admin)

        return jsonify({'message': 'Servicio eliminado exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#Servicios premium?
