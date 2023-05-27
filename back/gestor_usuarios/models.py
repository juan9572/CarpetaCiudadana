import os
from pymongo import MongoClient
from dotenv import load_dotenv

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
        self.tokens_revoked_collection = self.db['tokens_revoked']
        self.tokens_revoked_collection.create_index("token", unique=True)
        self.admin_collection = self.db['administrador']
        self.admin_collection.create_index("name", unique=True)
        self.ciudadano_collection = self.db['ciudadanos']
        self.ciudadano_collection.create_index("cedula", unique=True)

    def insert_admin(self, name, email, password, operador):
        admin = {
            'name': name,
            'email': email,
            'password': password,
            'operador': operador
        }
        self.admin_collection.insert_one(admin)

    def insert_ciudadano(self, cedula, name, email, password,
                          operadorAsociado, number_phone, carpeta):
        ciudadano = {
            'cedula': cedula,
            'name': name,
            'email': email,
            'password': password,
            'operadorAsociado': operadorAsociado,
            'number_phone': number_phone,
            'carpeta' : carpeta
        }
        self.ciudadano_collection.insert_one(ciudadano)

    def get_ciudadano_by_cedula(self, cedula):
        return self.ciudadano_collection.find_one({'cedula': cedula})

    def update_ciudadano(self, ciudadano):
        self.ciudadano_collection.replace_one({'cedula': ciudadano['cedula']}, ciudadano)

    def add_revokedToken(self, token):
        self.tokens_revoked_collection.insert_one({'token':token})

    def is_token_revoked(self, token):
        result = self.tokens_revoked_collection.find_one({'token': token})
        return result is not None