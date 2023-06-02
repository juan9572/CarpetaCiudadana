import uuid
from utils import decrypt

class ExtracInfo:
    def get_folder(self, data):
        cedula = decrypt(data.get('cedula'))
        return cedula

    def create_folder(self, data):
        id = data.get('cedula') or data.get('name_admin')
        return decrypt(id)

    def delete_folder(self, data):
        id = data.get('cedula') or data.get('name_admin')
        return decrypt(id)

    def upload_file(self, data):
        cedula = decrypt(data.form['cedula'])
        name = decrypt(data.form['name'])
        descripcion = decrypt(data.form['descripcion'])
        temp = data.form['temp']
        file = data.files['file']
        return cedula, name, descripcion, temp, file

    def update_file(self, data):
        cedula = decrypt(data.form['cedula'])
        id_doc = decrypt(data.form['id'])
        name = decrypt(data.form['name'])
        descripcion = decrypt(data.form['descripcion'])
        file = data.files['file'] if data.files else None
        return cedula, id_doc, name, descripcion, file

    def delete_file(self, data):
        cedula = decrypt(data.get('cedula'))
        doc_id = decrypt(data.get('id'))
        return cedula, doc_id

    def share_files(self, data):
        cedula = decrypt(data.get('cedula'))
        files_to_share = data.get('files')
        for i in range(len(files_to_share['urls'])):
            files_to_share['urls'][i] = decrypt(files_to_share['urls'][i])
            files_to_share['name'][i] = decrypt(files_to_share['name'][i])
            files_to_share['descripcion'][i] = decrypt(files_to_share['descripcion'][i])
        ciudadano_destino = decrypt(data.get('to_whom'))
        return cedula, files_to_share, ciudadano_destino

    def generarNotificacion(self, data):
        id = self.generar_id_unico()
        documentos = data.get('docs')
        email = data.get('email')
        fromWho = data.get('fromWho')
        return id, documentos, email, fromWho

    def get_peticion(self, data):
        cedula = decrypt(data.get('cedula'))
        return cedula

    def mandarNotificacion(self, data):
        documentos = data.get('docs')
        for i in range(len(documentos)):
            documentos[i] = decrypt(documentos[i])
        email = decrypt(data.get('email'))
        fromWho = decrypt(data.get('fromWho'))
        return documentos, email, fromWho

    def accept_peticion(self, data):
        id_peticion = decrypt(data.get('id'))
        cedula = decrypt(data.get('cedula'))
        documentos = data.get('docs')
        return cedula ,id_peticion, documentos

    def reject_peticion(self, data):
        id_peticion = decrypt(data.get('id'))
        cedula = decrypt(data.get('cedula'))
        return cedula ,id_peticion

    def generar_id_unico(self):
        new_id = uuid.uuid4()
        return str(new_id)