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
        carpeta = data.get('carpeta')
        return (cedula, name, email, password,
                operadorAsociado, number_phone, carpeta)

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
