
class ExtracInfo:
    def create_folder(self, data):
        id = data.get('cedula') or data.get('name_admin')
        return id

    def delete_folder(self, data):
        id = data.get('cedula') or data.get('name_admin')
        return id

    def upload_file(self, data):
        cedula = data.form['cedula']
        name = data.form['name']
        descripcion = data.form['descripcion']
        file = data.files['file']
        return cedula, name, descripcion, file

    def update_file(self, data):
        cedula = data.form['cedula']
        id_doc = data.form['id']
        name = data.form['name']
        descripcion = data.form['descripcion']
        file = data.files['file'] if data.files else None
        return cedula, id_doc, name, descripcion, file

    def delete_file(self, data):
        cedula = data.get('cedula')
        doc_id = data.get('id')
        return cedula, doc_id

    def share_files(self, data):
        files_to_share = data.get('files')
        ciudadano_destino = data.get('to_whom')
        return files_to_share, ciudadano_destino