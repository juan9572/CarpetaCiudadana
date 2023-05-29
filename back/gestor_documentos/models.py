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
        self.tokens_collection = self.db['tokens_active']
        self.ciudadano_collection = self.db['ciudadanos']
        self.admin_collection = self.db['administrador']

    def get_ciudadano_by_email(self, email):
        return self.ciudadano_collection.find_one({'email': email})

    def get_operador_name_by_cedula_ciudadano(self, cedula):
        ciudadano = self.ciudadano_collection.find_one({'cedula': cedula})
        admin = self.admin_collection.find_one({
            'operador.nit': ciudadano['operadorAsociado']
        })
        return admin['operador']['name']

    def get_operador_name_by_name_admin(self, name_admin):
        admin = self.admin_collection.find_one({'name': name_admin})
        return admin['operador']['name']

    def get_activeToken(self, token):
        return self.tokens_collection.find_one({'token': token})

    def insert_doc(self, cedula, documento):
        self.ciudadano_collection.update_one({'cedula': cedula},
                                            {'$push': {'carpeta': documento}})

    def update_doc(self, cedula, doc_id, document):
        self.ciudadano_collection.update_one({'cedula': cedula,
                                               'carpeta.id': doc_id},
                                             {'$set': document})

    def delete_doc(self, cedula, doc_id):
        self.ciudadano_collection.update_one({'cedula': cedula},
                                             {'$pull': {'carpeta':
                                                         {'id': doc_id}}})

    def delete_folder(self, cedula):
        self.ciudadano_collection.update_one({'cedula': cedula},
                                              {'$set':{'carpeta':[]}})

    def update_folder(self, ciudadano):
        self.ciudadano_collection.replace_one({'cedula': ciudadano['cedula']},
                                               ciudadano)
