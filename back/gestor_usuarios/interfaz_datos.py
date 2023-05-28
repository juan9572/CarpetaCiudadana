import uuid
# Funciones para manejar los datos

class ExtracInfo:
    def register_admin_data(self, data):
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        operador = data.get('operador')
        return name, email, password, operador

    def register_ciudadano_data(self, data):
        cedula = data.get('cedula')
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        operadorAsociado = data.get('operadorAsociado')
        number_phone = data.get('number_phone')
        address = data.get('address')
        carpeta = data.get('carpeta')
        return (cedula, name, email, password,
                operadorAsociado, number_phone, address, carpeta)

    def login_admin_data(self, data):
        name = data.get('name')
        password = data.get('password')
        return name, password

    def login_ciudadano_data(self, data):
        cedula = data.get('cedula')
        password = data.get('password')
        return cedula, password

    def update_ciudadano_data(self, data):
        name = data.get('name')
        number_phone = data.get('number_phone')
        return name, number_phone

    def update_admin_operador(self, data):
        name_admin = data.get('name_admin')
        name_operador = data.get('name_operador')
        email = data.get('email')
        serviciosPremium = data.get('serviciosPremium')
        return name_admin, name_operador, email, serviciosPremium

    def update_admin_servicio(self, data):
        name_admin = data.get('name_admin')
        name_servicio = data.get('name_servicio')
        id = str(uuid.uuid4())
        return name_admin, name_servicio, id
