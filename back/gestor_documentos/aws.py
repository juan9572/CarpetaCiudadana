import os
import boto3
from dotenv import load_dotenv

def get_aws_keys():
    access = os.getenv('AWS_ACCESS_KEY')
    secret = os.getenv('AWS_SECRET_KEY')
    session = os.getenv('AWS_SESSION_TOKEN')
    return (access, secret, session)

class uploadFiles:
    def __init__(self):
        load_dotenv()
        self.credentialsAWS = get_aws_keys()
        self.s3 = self.get_boto_client()

    def get_boto_client(self):
        connection = boto3.client(
            's3',
            aws_access_key_id=self.credentialsAWS[0],
            aws_secret_access_key=self.credentialsAWS[1],
            aws_session_token=self.credentialsAWS[2],
            region_name="us-east-1"
        )
        return connection

    def delete_file(self, nombre_archivo):
        nombre = nombre_archivo.split('.com/')[1]
        self.s3.delete_object(Bucket='carpeta.ciudadana', Key=nombre)

    def upload_file(self, archivo, nombre_archivo, id_operador, id_ciudadano):
        bucket_name = 'carpeta.ciudadana'
        ruta_archivo = f'{id_operador}/{id_ciudadano}/{nombre_archivo}'
        self.s3.upload_fileobj(archivo, bucket_name, ruta_archivo)
        url = f'https://{bucket_name}.s3.amazonaws.com/{ruta_archivo}'
        return url

    def share_files(self, files, id_operador, id_ciudadano):
        urls = []
        bucket_name = 'carpeta.ciudadana'
        for file in files:
            file_source = file.split('.com/')[1]
            name_file = os.path.basename(file_source)
            file_destino = f'{id_operador}/{id_ciudadano}/{name_file}'
            urls.append(
                f'https://{bucket_name}.s3.amazonaws.com/{file_destino}'
            )
            self.s3.copy_object(
                Bucket=bucket_name,
                CopySource={'Bucket': bucket_name, 'Key': file_source},
                Key=file_destino
            )
        return urls

    def create_folder(self, name_folder):
        self.s3.put_object(Bucket='carpeta.ciudadana', Key=f'{name_folder}/')

    def delete_folder(self, name_folder):
        bucket_name = 'carpeta.ciudadana'
        objects = self.s3.list_objects_v2(Bucket=bucket_name,
                                           Prefix=name_folder)['Contents']
        keys = [{'Key': obj['Key']} for obj in objects]
        if keys:
            self.s3.delete_objects(Bucket=bucket_name,
                                    Delete={'Objects': keys})
        self.s3.delete_object(Bucket=bucket_name, Key=name_folder)


#Lógica para desencriptar
