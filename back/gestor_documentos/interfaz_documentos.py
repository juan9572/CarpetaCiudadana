import requests
# Funciones para comunicarse con el end-point del gobierno

class InteractWithAPI:
    def aunthenticateDocument(self, data):
        id_citizen = data.get('cedula')
        url = data.get('url')
        endpoint = f'http://169.51.195.62:30174/apis/authenticateDocument/{id_citizen}/{url}'
        response = requests.get(endpoint)
        return response.status_code

    def sendPeticion(self, data):
        endpoint = data.get('endpoint')
        peticion = {
            'documentos': data.get('docs'),
            'email': data.get('email')
        }
        #requests.post(endpoint, peticion)