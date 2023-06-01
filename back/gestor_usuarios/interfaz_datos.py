import uuid
from utils import decrypt
# Funciones para manejar los datos

class ExtracInfo:
    def register_admin_data(self, data):
        name = decrypt(data.get('name'))
        email = decrypt(data.get('email'))
        password = decrypt(data.get('password'))
        operador = data.get('operador')
        return name, email, password, operador

    def register_ciudadano_data(self, data):
        cedula = decrypt(data.get('cedula'))
        name = decrypt(data.get('name'))
        email = decrypt(data.get('email'))
        password = decrypt(data.get('password'))
        operadorAsociado = decrypt(data.get('operadorAsociado'))
        number_phone = decrypt(data.get('number_phone'))
        address = decrypt(data.get('address'))
        carpeta = data.get('carpeta')
        return (cedula, name, email, password,
                operadorAsociado, number_phone, address, carpeta)

    def login_admin_data(self, data):
        name = decrypt(data.get('name'))
        password = decrypt(data.get('password'))
        return name, password

    def login_ciudadano_data(self, data):
        cedula = decrypt(data.get('cedula'))
        password = decrypt(data.get('password'))
        return cedula, password

    def update_ciudadano_data(self, data):
        name = decrypt(data.get('name'))
        number_phone = decrypt(data.get('number_phone'))
        return name, number_phone

    def update_admin_operador(self, data):
        name_admin = decrypt(data.get('name_admin'))
        name_operador = decrypt(data.get('name_operador'))
        email = decrypt(data.get('email'))
        serviciosPremium = data.get('serviciosPremium') #decrypt?
        return name_admin, name_operador, email, serviciosPremium

    def update_admin_servicio(self, data):
        name_admin = decrypt(data.get('name_admin'))
        name_servicio = decrypt(data.get('name_servicio'))
        id = str(uuid.uuid4())
        return name_admin, name_servicio, id
