import requests

# Define the endpoint URL
def sendemail(directory, content, nombre):
    url = "https://prod-32.westus.logic.azure.com:443/workflows/ba2f39c18662405c8f87fef45595cfed/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cxY7RgWXif4xBUMiTqz9p-aDirDi4rYr2XH7mIkrjN0"

    # Define the request payload (data  to send in the POST request)
    payload = {
        "emailAdress": directory,
        "emailSubject": "notificación de petición",
        "username": "Apreciado" +  " " + nombre,
        "Content": content,
    }

    archivos_pdf = ['archivo1.pdf', 'archivo2.pdf', 'archivo3.pdf']

    archivos_para_enviar = []
    for archivo in archivos_pdf:
        archivos_para_enviar.append(('files', open(archivo, 'rb')))

# Send the POST request
    response = requests.post(url, json=payload, files=archivos_para_enviar)

# Process the response
    if response.status_code == 202:
    # Request was successful
        print("POST request successful.")
        print("Response content:", response.text)
    else:
    # Request failed
        print("POST request failed. Status code:", response.status_code)
        print("Error message:", response.text)


def descifrado_cesar(texto_cifrado, desplazamiento):
    resultado = ""
    for caracter in texto_cifrado:
        if caracter.isalpha():
            codigo_ascii = ord(caracter)
            if codigo_ascii >= 65 and codigo_ascii <= 90:
                # Letra mayúscula
                resultado += chr((codigo_ascii - desplazamiento - 65) % 26 + 65)
            elif codigo_ascii >= 97 and codigo_ascii <= 122:
                # Letra minúscula
                resultado += chr((codigo_ascii - desplazamiento - 97) % 26 + 97)
        else:
            resultado += caracter
    return resultado
