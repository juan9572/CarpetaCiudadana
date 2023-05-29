import requests

# Define the endpoint URL
url = "https://prod-187.westus.logic.azure.com:443/workflows/4a07565298064a54baddd1e5ce62d3ea/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=pd0-NMUTK0RzU-3MpxvzMxwhuzvLmSWk4z6nENy4StI"

# Define the request payload (data to send in the POST request)
payload = {
    "phoneAdress": "(+57)3168177190",
    "content": "Succesful test my friend",
}

# Send the POST request
response = requests.post(url, json=payload)

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