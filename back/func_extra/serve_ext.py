from flask import Flask, request
import os
from dotenv import load_dotenv
from flask_cors import CORS
import yagmail

app = Flask(__name__)
cors = CORS(app)

@app.route('/enviar_correo', methods=['POST'])
def enviar_correo():
    destinatario = request.form['destinatario']
    asunto = request.form['asunto']
    mensaje_html = f'''
    <table width="500" height="350" bgcolor="#e8e3e3" border="0" cellpadding="0" cellspacing="0" style="border: 1px solid black; border-radius: 10px; padding-top: 6px; text-aling: center;">
    <tr>
        <td>
            <h2 style="color: #333333;">¡Hola, {destinatario}!</h2>
            <p>¡Remitente te manda estos documentos!</p>
        </td>
    </tr>
    </table>
    '''
    archivo_adjunto = request.files['archivo_adjunto']
    # Guardar el archivo adjunto en el sistema de archivos
    archivo_adjunto.save(archivo_adjunto.filename)
    path = os.path.join(app.root_path, archivo_adjunto.filename)
    yag = yagmail.SMTP(user=os.getenv('EMAIL_BOT'),
                        password=os.getenv('PASSWORD_EMAIL_BOT'))
    contents = [mensaje_html, path]
    yag.send(destinatario, asunto, contents)
    # Llamar a la función para enviar el correo con el archivo adjunto
    return 'Correo enviado con éxito.'

if __name__ == '__main__':
    load_dotenv()
    app.run(host='0.0.0.0')

