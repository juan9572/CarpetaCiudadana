import os
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime, timedelta

def get_credentials_db():
    host = os.getenv('MONGO_HOST')
    port = os.getenv('MONGO_PORT')
    return (host, int(port))

class DatabaseHandler:
    def __init__(self):
        load_dotenv()
        credentialsDB = get_credentials_db()
        client = MongoClient(credentialsDB[0], credentialsDB[1])
        self.db = client['carpeta_ciudadana']
        self.tokens_collection = self.db['tokens_active']
        self.tokens_collection.create_index("token", unique=True)
        self.tokens_collection.create_index("expire_at",
                                                     expireAfterSeconds=0)
        self.admin_collection = self.db['administrador']
        self.admin_collection.create_index("name", unique=True)
        self.admin_collection.create_index("operador.nit", unique=True)
        self.admin_collection.create_index("operador.serviciosPremium.id",
                                            unique=True)
        self.ciudadano_collection = self.db['ciudadanos']
        self.ciudadano_collection.create_index("cedula", unique=True)
        self.ciudadano_collection.create_index("email", unique=True)

    def insert_admin(self, name, email, password, operador):
        admin = {
            'name': name,
            'email': email,
            'password': password,
            'operador': operador
        }
        self.admin_collection.insert_one(admin)

    def insert_ciudadano(self, cedula, name, email, password,
                          operadorAsociado, number_phone, address, carpeta):
        ciudadano = {
            'cedula': cedula,
            'name': name,
            'email': email,
            'password': password,
            'operadorAsociado': operadorAsociado,
            'number_phone': number_phone,
            'address': address,
            'carpeta' : carpeta
        }
        self.ciudadano_collection.insert_one(ciudadano)

    def get_ciudadano_by_cedula(self, cedula):
        return self.ciudadano_collection.find_one({'cedula': cedula})

    def get_admin_by_name(self, name):
        return self.admin_collection.find_one({'name': name})

    def get_operador_by_id(self, id_operador):
        return self.admin_collection.find_one(
            {'operador.id_operador': id_operador})

    def update_ciudadano(self, ciudadano):
        self.ciudadano_collection.replace_one(
            {'cedula': ciudadano['cedula']}, ciudadano)

    def update_operador(self, admin):
        self.admin_collection.replace_one({'name': admin['name']}, admin)

    def update_servicio(self, admin):
        self.admin_collection.replace_one({'name': admin['name']}, admin)

    def add_activeToken(self, token, user):
        expire_at = datetime.utcnow() + timedelta(hours=24)
        doc = {'token':token, 'typeUser':user, 'expire_at': expire_at}
        self.tokens_collection.insert_one(doc)

    def get_activeToken(self, token):
        return self.tokens_collection.find_one({'token': token})

    def remove_activeToken(self, token):
        self.tokens_collection.delete_one({'token': token})

    def insert_notification(self, documents, user, id):
        notificacion = {
            'nombre': user,
            'documentos': documents,
            'id': id,
        }
        # Buscar el documento en base a algún criterio
        documento = self.ciudadano_colection.find_one({'name': user})
        # Agregar el atributo al documento
        documento['notificacion'] = notificacion
        # Actualizar el documento en la colección
        self.ciudadano_collection.update_one({'notificacion': notificacion}, {'$set': documento})
