import os
from base64 import b64decode
from dotenv import load_dotenv
from Cryptodome.Cipher import AES
from Cryptodome.Util.Padding import unpad

def decrypt(message):
    load_dotenv()
    key = b64decode(os.getenv('CLAVE_CIFRADO'))
    cipher = AES.new(key, AES.MODE_ECB)
    decrypted_message = unpad(cipher.decrypt(b64decode(message)),
                               AES.block_size).decode('utf-8')
    return decrypted_message
