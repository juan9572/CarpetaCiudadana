from models import DatabaseHandler
from interfaz_datos import ExtracInfo
from flask import Blueprint, request, jsonify

admin_blueprint = Blueprint('admin', __name__)
db_handler = DatabaseHandler()

@admin_blueprint.route('/register', methods=['POST'])
def register_admin():
    try:
        # Extraer datos
        data = request.get_json()
        (name, email,
          password, operador) = ExtracInfo().register_admin_data(data)

        # Insertar datos en la base de datos
        db_handler.insert_admin(name, email, password, operador)

        return jsonify(
            {'message': 'Administrador registrado exitosamente'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
