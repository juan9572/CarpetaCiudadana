import os
import yagmail
import datetime
from dotenv import load_dotenv
from Cryptodome.Cipher import AES
from base64 import b64decode, b64encode
from Cryptodome.Util.Padding import unpad, pad

def decrypt(message):
    load_dotenv()
    key = b64decode(os.getenv('CLAVE_CIFRADO'))
    cipher = AES.new(key, AES.MODE_ECB)
    decrypted_message = unpad(cipher.decrypt(b64decode(message)),
                               AES.block_size).decode('utf-8')
    return decrypted_message

def encrypt(message):
    load_dotenv()
    key = b64decode(os.getenv('CLAVE_CIFRADO'))
    cipher = AES.new(key, AES.MODE_ECB)
    padded_message = pad(message.encode('utf-8'), AES.block_size)
    encrypted_message = b64encode(cipher.encrypt(padded_message)).decode('utf-8')
    return encrypted_message

def html_structure_for_share(destinatario, name, files_names):
    mensaje_html = f'''
    <table width=600" height="550" bgcolor="#e8e3e3" border="0" cellpadding="0" cellspacing="0" style="border: 1px solid black; border-radius: 10px; padding-top: 6px; text-aling: center;">
    <tr>
        <td>
            <h2 style="color: #333333;">¡Hola, {destinatario}!</h2>
            <p>¡{name} te manda estos documentos:</p>
            <ul>
    '''
    for i in range(len(files_names)):
        mensaje_html += f'<li>{files_names[i]}</li>'
    mensaje_html += '''
            </ul>
        </td>
    </tr>
    </table>
    '''
    return mensaje_html

def send_email(destinatario, asunto, contents, temps):
    load_dotenv()
    yag = yagmail.SMTP(user=os.getenv('EMAIL_BOT'),
                        password=os.getenv('PASSWORD_EMAIL_BOT'))
    yag.send(destinatario, asunto, contents)
    if temps[0]:
        for file_name in temps[1]:
            os.remove(file_name)