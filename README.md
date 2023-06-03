UNIVERSIDAD EAFIT 







Caso de estudio – Carpeta Ciudadana 

Entrega final 







Juan Pablo Rincon

Manuela Tolosa

Salomón Velez



Equipo : MUFASA









PROFESOR: 

Danny Andres Salcedo






Medellín ,Colombia

26 de Abril del 2023

[**1. Requerimientos Funcionales	3**](#_2c2zhtitqm5j)**

[1.1. CRUD de documentos	3](#_5lcz0hfb7wrq)

[1.2. Creación de usuarios	4](#_3mhyxw3hzycu)

[1.3. Compartir documentos	5](#_u8axr6fpkb4y)

[1.4. Tramites de documentos	6](#_uuvy01avird1)

[1.5. Servicio premium por parte de los operadores	6](#_iog33ipdgnjt)

[**2. Requerimientos No Funcionales	7**](#_imln0moyj7ng)

[2.1. Performance Requirements	7](#_3vfmbumf1x6m)

[2.2. Safety Requirements	7](#_mnxkawahwglt)

[2.3. Software Quality Attributes	8](#_7kvi3f87v1tj)

[2.4. Other Requirements	8](#_ph8c68qdtdve)

[**3. Mapeo NFRs VS QoS	9**](#_g1p8egms8dm)

[**4. Diagrama de Contexto	9**](#_cbge78klbzx7)

[**5. Architectural Overview	10**](#_wxro4po2chgr)

[**6. Diagrama de Componentes	10**](#_vjg2nf4ik6li)

[6.1. Sequence Diagram	12](#_70xa4rhu1orc)

[6.2. Entity Model Diagram	13](#_18yy5vo7plbe)

[6.3. Deployment Diagram	14](#_rfb6ay9qoz1h)

[6.4. Architectural Decisions	14](#_qzjnnth5ja7j)

[**7.Link repositorio	19**](#_3wmlk9wmlsl9)


El sistema está planeado para ser un gran repositorio virtual donde los ciudadanos puedan almacenar a perpetuidad documentos que le concierne pero que a diferencia del mundo físico, sean fáciles de compartir con entidades y empresas y además tengan todas las garantías de seguridad que hoy sólo se logran a través de trámites como apostillas y autenticaciones.Aparte el sistema se plantea del punto para que haya una importante participación de actores privados que actuarán como operadores del sistema. 

# <a name="_ybimjpck1mx4"></a>
1. # <a name="_2c2zhtitqm5j"></a>**Requerimientos Funcionales**
   1. # <a name="_5lcz0hfb7wrq"></a>CRUD de documentos

***Description and Priority***

*El sistema provee un servicio de repositorio, donde los usuarios podrán*

*registrar, guardar, editar y eliminar sus documentos. Esta característica tiene una alta prioridad debido a que es la funcionalidad principal del ciudadano.*

***Functional Requirements***

***REQF-1: “Carga de documentos al repositorio”**: El sistema debe permitir a los ciudadanos cargar documentos a su carpeta para poder almacenarlos.*

- ***Acciones del usuario:** Seleccionar el archivo que desea cargar y hacer clic en el botón "Cargar".*
- ***Respuesta del sistema:** Almacenar el documento en la carpeta correspondiente del usuario.*

<a name="_1ci93xb"></a>***REQF-2: “Descargar documentos del repositorio”**: El sistema debe proporcionar una funcionalidad de descarga de documentos a los ciudadanos desde su carpeta.*

- ***Acciones del usuario:** Seleccionar el archivo que desea descargar y hacer clic en el botón "Descargar".*
- ***Respuesta del sistema:** Descargar el documento seleccionado.*

***REQF-3: “Búsqueda de documentos”**: El sistema debe permitir a los ciudadanos buscar documentos en su carpeta, filtrandolos por el nombre del documento.*

- ***Acciones del usuario:** Ingresar el nombre del documento en el campo de búsqueda y hacer clic en el botón "Buscar".*
- ***Respuesta del sistema:** Mostrar los documentos que coinciden con la búsqueda realizada.*

***REQF-4: “Edición y reemplazo de documentos”**: El sistema debe permitir a los ciudadanos editar los documentos almacenados en el repositorio y reemplazarlos con nuevos documentos.*

- ***Acciones del usuario:** Seleccionar el archivo que desea editar, realizar los cambios necesarios y hacer clic en el botón "Guardar".*
- ***Respuesta del sistema:** Actualizar el contenido del documento y almacenar la nueva versión en la carpeta correspondiente.*

<a name="_hj6wnfwsaddp"></a>***REQF-5: “Eliminar documentos”**: El sistema debe proporcionar una funcionalidad para que los ciudadanos puedan eliminar documentos de su carpeta.*

- <a name="_p4s0f38qx91p"></a>***Acciones del usuario:** Seleccionar el archivo que desea eliminar y hacer clic en el botón "Eliminar".*
- ***Respuesta del sistema:** Eliminar el documento seleccionado de la carpeta correspondiente.*

<a name="_eaplhickni2s"></a>***REQF-6: “Visualizar documentos”**: El sistema deberá permitir a los ciudadanos abrir los documentos almacenados en su carpeta.*

- ***Acciones del usuario:** Seleccionar el archivo que desea ver y hacer clic en el botón "Ver".*
- ***Respuesta del sistema:** Mostrar el documento seleccionado en una interfaz de visualización.*

<a name="_akec95kol4vc"></a>***REQF-7: “Documentos temporales”**: El sistema debe permitir que el ciudadano suba documentos temporales para completar un trámite urgente, y luego actualizar los documentos con la versión definitiva firmada digitalmente.*

- ***Acciones del usuario:** El ciudadano debe tener la opción de subir documentos temporales para completar un trámite urgente.*
- ***Respuesta del sistema:** El sistema debe permitir al ciudadano actualizar los documentos temporales con la versión definitiva firmada digitalmente.*

1. # <a name="_3mhyxw3hzycu"></a>Creación de usuarios
***Description and Priority***

*El sistema debe proveer la opción de crear usuarios de tipo operador y ciudadano, cada uno de estos con sus características y opciones propias. Esta característica es de prioridad alta.*

`	`***Functional Requirements***

***REQF-8: "Registro de ciudadanos":**El sistema debe permitir que los ciudadanos se registren y creen una cuenta de ciudadano.*

- ***Acciones del usuario:***
- *Acceder al formulario de registro de ciudadanos.*
- *Ingresar información personal, como nombre completo, número de identificación, correo electrónico y contraseña.*
- *Confirmar la información ingresada y enviar el formulario de registro.*
- ***Respuestas del sistema:***
- *Verificar que la información ingresada sea válida.*
- *Crear una cuenta de ciudadano con la información proporcionada.*
- *Confirmar al usuario que su registro ha sido exitoso y proporcionar un mensaje de bienvenida.*

***REQF-9: "Ingreso de ciudadanos":**El sistema debe permitir que los ciudadanos ingresen a su cuenta.*

- ***Acciones del usuario:***
- *Ingresar su correo electrónico y contraseña en el formulario de ingreso.*
- *Confirmar la información ingresada y enviar el formulario de ingreso.*
- ***Respuestas del sistema:***
- *Verificar que el correo electrónico y la contraseña ingresados sean válidos.*
- *Permitir el acceso a la cuenta del ciudadano.*
- *Redirigir al ciudadano a la página de inicio de sesión.*

***REQF-10: "Ingreso de administrador":** El sistema debe permitir que las entidades ingresen a su cuenta.*

- ***Acciones del usuario:**Ingresar su correo electrónico y contraseña en el formulario de ingreso de operadores.*
- *Confirmar la información ingresada y enviar el formulario de ingreso.*
- ***Respuestas del sistema:***
- *Verificar que el correo electrónico y la contraseña ingresados sean válidos.*
- *Permitir el acceso a la cuenta del operador.*
- *Redirigir al operador a la página de inicio de sesión de su cuenta.*

***REQF-11: "Inscripción a operador":**El sistema debe permitir que los ciudadanos se inscriban ante el servicio de un operador.*

- ***Acciones del usuario:***
- *Buscar el operador al que desea inscribirse.*
- *Acceder al formulario de inscripción proporcionado por el sistema.*
- *Confirmar la información ingresada y enviar el formulario de inscripción.*
- ***Respuestas del sistema:***
- *Verificar que la información ingresada sea válida.*
- *Verificar si el ciudadano ya está inscrito en otro operador.*
- *Aceptar la solicitud de inscripción del ciudadano y agregarlo a la lista de usuarios del operador.*
- *Confirmar al usuario que su inscripción ha sido exitosa.*

<a name="_d6xvz5nkx3uk"></a>***REQF-12: “Transferencia de operador”**: Un ciudadano puede solicitar transferencia de un operador hacia otro totalmente distinto.*

- ***Acciones del usuario:***
- *Acceder al formulario de solicitud de transferencia de operador.*
- *Indicar el operador al que desea transferirse.*
- *Confirmar la información ingresada y enviar el formulario de solicitud de transferencia.*
- ***Respuestas del sistema:***

*-Verificar que la información ingresada sea válida.*

*-Verificar que el ciudadano esté inscrito en el operador actual.*

*-Verificar que el operador al que desea transferirse sea un operador válido.*

*-Transferir al ciudadano al operador solicitado y actualizar su información en el sistema.*

*-Confirmar al ciudadano que su solicitud de transferencia ha sido	completada.*

1. # <a name="_u8axr6fpkb4y"></a>Compartir documentos
***Description and Priority***

*El sistema debe proveer la opción a los ciudadanos de poder compartir documentos hacia operador y entidades, Esta característica es de prioridad media.*

`	`***Functional Requirements***

***REQF-13: Notificaciones subida de documentos correctamente:** El sistema debe mostrar una notificación al usuario cuando los archivos se han cargado correctamente en su carpeta.*

- ***Acciones del usuario:** Cargar un archivo al repositorio.*
- ***Respuesta del sistema:** Mostrar una notificación al usuario confirmando que el archivo ha sido cargado correctamente*

***REQF-14: Paquete de documentos:** El sistema debe permitir que el ciudadano cree un paquete de documentos para enviar a una entidad específica a través de su operador.*

- ***Acciones del usuario:** Seleccionar los documentos que desea enviar como paquete y enviarlos.*
- ***Respuesta del sistema:** Crear un paquete de documentos y enviarlo a la entidad correspondiente.*
- <a name="_28yioz5q25aj"></a>*El sistema debe permitir que el ciudadano cree un paquete de documentos para enviar a una entidad específica a través de su operador.*

***REQF-15: Recepción de paquetes de documentos (cuenta operador creada):**  Si un ciudadano tiene una cuenta en el sistema, el sistema debe permitir que los paquetes de documentos enviados por los ciudadanos sean recibidos directamente en la carpeta de la institución correspondiente.*** 

- ***Acciones del usuario:** Recibir un paquete de documentos enviado por un ciudadano.*
- ***Respuesta del sistema:** Almacenar el paquete de documentos en la carpeta correspondiente de la entidad y notifica mediante un correo electrónico.*

***REQF-16: Recepción de paquetes de documentos (cuenta operador no creada):** Si un ciudadano  no tiene una cuenta en el sistema, el sistema debe permitir que los paquetes de documentos enviados por los ciudadanos sean recibidos directamente en el correo electrónico del  usuario correspondiente.*

- ***Acciones del usuario:** Recibir un correo electrónico con un paquete de documentos enviado por un ciudadano.*
- ***Respuesta del sistema:** Descargar el paquete de documentos y enviarlo a la entidad correspondiente y notifica mediante un correo electrónico.*
  1. # <a name="_uuvy01avird1"></a>Tramites de documentos
***Description and Priority***

*El sistema deberá permitir a los ciudadanos poder realizar trámites con los operadores del sistema, esto va desde pedir a los operadores que suban documentos a su carpeta como el operador solicitar documentos al usuario. Esta característica es de prioridad media.*

`	`***Functional Requirement***

***REQF-17: Autenticidad de documentos:**El sistema debe garantizar que los paquetes de documentos enviados estén firmados digitalmente para garantizar su autenticidad.*

- ***Acciones del usuario:** Firmar digitalmente los documentos que se envían como paquete.*
- ***Respuesta del sistema:** Verificar la firma digital de los documentos recibidos.*

***REQF-18: Peticiones Ciudadano-Ciudadano:**Un ciudadano debe tener la capacidad de enviar solicitudes a los ciudadanos para compartir documentos con ellos.*

- ***Acciones del usuario:** Generar una petición de documentos para un ciudadano específico.*
- ***Respuesta del sistema:** Almacenar la petición y notificar al ciudadano correspondiente mediante un mensaje SMS y un correo electrónico.*

***REQF-19: "Rechazar petición"**:El sistema debe permitir que el ciudadano rechace una petición de documentos solicitados por el operador y no se deben enviar los archivos.*

- ***Acciones del usuario:** El ciudadano debe tener la opción de rechazar una petición de documentos solicitados por el operador.*
- ***Respuesta del sistema:** El sistema no debe enviar los archivos solicitados al operador.*

***REQF-20 : "Aceptar petición":**El sistema debe permitir que el ciudadano acepte una petición de documentos solicitados por el operador y se deben enviar los documentos correspondientes.*

- ***Acciones del usuario:*** 
- *El ciudadano debe tener la opción de aceptar una petición de documentos solicitados por el operador.*
- *El ciudadano selecciona el documento solicitado y se manda.*
- *El sistema confirma que se envió correctamente el documento*
- ***Respuesta del sistema:** El sistema debe enviar los documentos correspondientes al operador.*

1. # <a name="_iog33ipdgnjt"></a>Servicio premium por parte de los operadores
***	

***Description and Priority***

*El sistema deberá permitir a los usuarios tipo operador definir la serie de servicios pertenecientes al servicio premium de cada operador. Esta característica es de prioridad baja.*

`	`***Functional Requirements***

***REQF-21: "Creación de servicios":**El sistema debe permitir que los usuarios operadores puedan crear nuevos servicios.*

- ***Acciones del usuario:***
- *El usuario operador selecciona la opción de crear un nuevo servicio.*
- *El usuario proporciona la información requerida para el nuevo servicio, como nombre, descripción y costo.*
- *El usuario confirma la creación del nuevo servicio.*
- ***Respuestas del sistema:***
- *El sistema crea el nuevo servicio y lo agrega a la lista de servicios disponibles.*

***REQF-22: "Modificación de servicios":**El sistema debe permitir a los usuarios operadores modificar los servicios creados.*

- ***Acciones del usuario:***
- *El usuario operador selecciona el servicio que desea modificar.*
- *El usuario modifica la información del servicio, como el nombre, descripción y costo.*
- *El usuario confirma los cambios realizados en el servicio.*
- ***Respuestas del sistema:***
- *El sistema actualiza la información del servicio modificado y muestra un mensaje de confirmación al usuario y se le notifica a los ciudadanos.*

***REQF-23: "Eliminación de servicios":**El sistema debe permitir a los usuarios operadores poder borrar los servicios creados.*

- ***Acciones del usuario:***
- *El usuario operador selecciona el servicio que desea eliminar.*
- *El usuario confirma la eliminación del servicio.*
- ***Respuestas del sistema:***
- *El sistema elimina el servicio seleccionado de la lista de servicios disponibles y muestra un mensaje de confirmación al usuario.*

1. # <a name="_imln0moyj7ng"></a>**Requerimientos No Funcionales**
   1. ## <a name="_3vfmbumf1x6m"></a>***Performance Requirements***
1. <a name="_6jgv5hftdy0a"></a>***REQNF (1):**El sistema debe tener una baja latencia para garantizar una envio de documentos y mensajes rápido.*

<a name="_tet622vj98w8"></a>*Criterio de aceptación: El sistema debe tardar menos de 3.5 segundos en el envío de documentos.*
1. ## <a name="_mnxkawahwglt"></a>***Safety Requirements***
1. <a name="_o4irps4asaib"></a>***REQNF (2):**El sistema deberá almacenar los documentos con una seguridad garantizada.*

*Criterio de aceptación: Los datos y envíos de documentos deberán estar cifrados.*

1. <a name="_rf7zttzcbz37"></a>***REQNF (3):**El sistema no debería permitir algún tipo de cambio o aspecto que afecte los documentos a menos que sea el usuario quien haga estos cambios.*

<a name="_yqocp8vc8kf4"></a>*Criterio de aceptación: El sistema solo debe permitir la modificación de documentos por actores fuera del usuario.*

1. <a name="_ibi8awj5c6hw"></a>***REQNF (4):**El sistema  deberá permitir que los documentos del usuario no sean vistos por otros usuarios o entidades que no estén relacionados a él.*

*Criterio de aceptación: El sistema deberá tener un sistema de autenticación sofisticado para evitar accesos no autorizados.*

1. <a name="_406nr01ahsgd"></a>***REQNF (5):** El sistema debe poseer una característica de cifrado a la hora de compartir mensajes y documentos entre los distintos usuarios del sistema.*

1. ## <a name="_7kvi3f87v1tj"></a>***Software Quality Attributes***
1. <a name="_r46obieuu5q1"></a>***REQNF (6):**El usuario o las entidades tanto públicas como privadas podrán usar el sistema de forma fácil, incluyendo aquellos con un bajo grado de apropiación de las tecnologías de información. (usabilidad)* 

<a name="_e3evxi824rrl"></a>*Criterio de aceptación: Los usuarios deberán ser capaces de adaptarse a la aplicación con un máximo de 20 minutos de uso.*

1. ***REQNF (7):**El usuario o las entidades tanto públicas como privadas podrán usar el sistema en cualquier momento, mientras tengan conexión a internet.(disponibilidad)*

<a name="_k0j7ihkiaz62"></a>*Criterio de aceptación: El sistema debe estar disponible el 99% del tiempo*

1. <a name="_3m04qn9hadp"></a>***REQNF (8):**El sistema debe generar confianza para así poder que los usuarios y las entidades tanto públicas como privadas se sientan seguros al momento de usar el sistema. (fiabilidad)*
1. <a name="_6q8vhgkjo2zm"></a>***REQNF (9):**El sistema debe ser capaz de manejar gran cantidad de usuarios y de documentos al tiempo (escalabilidad, interoperabilidad)*

*Criterio de aceptación: Se espera que la app sea usada por 10.000 personas concurrentemente.*

1. ***REQNF (10):**El ciudadano o las entidades tanto públicas como privadas podrán usar el sistema de forma rápida y eficaz. (rendimiento)*

1. ###### <a name="_ph8c68qdtdve"></a>***Other Requirements***
1. <a name="_i4miyhtiwyk"></a>***REQNF (11):**El sistema debe ser capaz de almacenar documentos certificados de cualquier tamaño sin que esto afecte el rendimiento del sistema ni la calidad del servicio.*
1. ***REQNF (12):** El sistema debe permitir la transferencia directa de documentos entre los operadores sin pasar por el centralizador.*

1. # <a name="_g1p8egms8dm"></a>**Mapeo NFRs VS QoS**
![](https://raw.githubusercontent.com/juan9572/CarpetaCiudadana/main/static/Aspose.Words.13fb085f-7337-4ba0-a0ac-cbfe3601abb8.001.png)
1. # <a name="_67pfwgrhamcb"></a><a name="_cbge78klbzx7"></a>**Diagrama de Contexto**
![](https://raw.githubusercontent.com/juan9572/CarpetaCiudadana/main/static/Aspose.Words.13fb085f-7337-4ba0-a0ac-cbfe3601abb8.002.jpeg)
1. # <a name="_qpkrvi7mnc7"></a><a name="_wxro4po2chgr"></a>**Architectural Overview**
![](https://raw.githubusercontent.com/juan9572/CarpetaCiudadana/main/static/Aspose.Words.13fb085f-7337-4ba0-a0ac-cbfe3601abb8.003.png)
1. # <a name="_vjg2nf4ik6li"></a>**Diagrama de Componentes**
Los componentes que están en un cuadro naranja son los componentes técnicos y los componentes de aplicación están de color azul.

![](https://raw.githubusercontent.com/juan9572/CarpetaCiudadana/main/static/Aspose.Words.13fb085f-7337-4ba0-a0ac-cbfe3601abb8.004.png)

Componentes de aplicación:

- Interfaz de API: Un componente diseñado para desacoplar la recepción y el envío de información a través de las API’s, permitiendo así la separación funcional de los usuarios del componente.
- Usuarios: Un componente encargado de recibir los datos necesarios para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) relacionadas con usuarios, incluyendo administradores, operadores y ciudadanos.
- Autenticador: Un componente encargado de manejar la sesión de logueo de los usuarios, tanto administradores de operadores como ciudadanos.
- Interfaz de datos: Un componente diseñado para desacoplar la comunicación entre la interfaz de usuario (front-end) y el módulo de usuarios.
- Mensajes por correo: Un componente encargado de enviar notificaciones a los usuarios a través de su dirección de correo electrónico.
- Mensajes por SMS: Un componente encargado de enviar notificaciones a los usuarios mediante mensajes de SMS a sus dispositivos móviles.
- React: Un componente encargado de generar y renderizar los archivos HTML de la página web utilizando el framework React.
- JavaScript: Un componente encargado de proporcionar funcionalidades que hacen que la página web sea más interactiva y dinámica para los usuarios.
- CSS: Un componente encargado de definir y aplicar los estilos visuales de la página web, incluyendo la presentación, diseño y apariencia de los elementos HTML.
- Documentos: Un componente encargado de gestionar todas las operaciones relacionadas con los documentos, incluyendo operaciones CRUD (Crear, Leer, Actualizar, Eliminar), compartir, realizar trámites y crear paquetes de documentos.
- Interfaz de presentación: Un componente diseñado para desacoplar la visualización de los documentos del front-end, permitiendo una separación clara entre la lógica de presentación y la interfaz de usuario.
- Interfaz de documentos: Un componente encargado de desacoplar la validación de documentos en relación al uso de las API's, permitiendo una separación clara entre la lógica de validación y la implementación de las API's.
- Conector de base de datos: Un componente encargado de proporcionar una interfaz para utilizar el módulo de persistencia de datos, permitiendo la conexión y manipulación de la base de datos.

Componentes técnicos:

- Base de datos: nos permite guardar el registro de ciudadanos y su relación con carpeta y documentos.
- Cache: nos permite guardar las consultas más recientes a la capa de persistencia para poder obtener los datos más rápido.
- Recolectar metadatos: recolectar los metadatos de los documentos.
- Servicios premium: nos permite ver los servicios premium de cada operador
- registerCitizen: api para registrar ciudadano.
- authenticateDocument: api para autenticar un documento.
- validateCitizen: api para saber si un ciudadano está registrado a un operador.

1. ### <a name="_70xa4rhu1orc"></a>**Sequence Diagram**
![](https://raw.githubusercontent.com/juan9572/CarpetaCiudadana/main/static/Aspose.Words.13fb085f-7337-4ba0-a0ac-cbfe3601abb8.005.png)

![](https://raw.githubusercontent.com/juan9572/CarpetaCiudadana/main/static/Aspose.Words.13fb085f-7337-4ba0-a0ac-cbfe3601abb8.006.png)
1. ### <a name="_18yy5vo7plbe"></a>**Entity Model Diagram**
![](https://raw.githubusercontent.com/juan9572/CarpetaCiudadana/main/static/Aspose.Words.13fb085f-7337-4ba0-a0ac-cbfe3601abb8.007.png)
1. ### <a name="_rfb6ay9qoz1h"></a>**Deployment Diagram**
![](https://raw.githubusercontent.com/juan9572/CarpetaCiudadana/main/static/Aspose.Words.13fb085f-7337-4ba0-a0ac-cbfe3601abb8.008.png)
1. ### <a name="_qzjnnth5ja7j"></a>**Architectural Decisions**


|Nombre|Elastic Load Balancer (ELB) de AWS|
| - | - |
|La decisión arquitectónica|` `Utilizar un ELB de AWS para balancear carga.|
|Identificador único|AD-1|
|Cuestión o problema|` `¿Cómo balancear la carga en la aplicación?|
|Supuestos|` `Se supone que existe una necesidad de balancear la carga entre los diferentes componentes o instancias de la aplicación para mejorar la capacidad de respuesta y escalabilidad. Además, se asume que la aplicación se ejecutará en la infraestructura de AWS.|
|Alternativas|<p>- No utilizar un balanceador de carga y gestionar manualmente la distribución de la carga entre los componentes de la aplicación.</p><p>- Utilizar una solución de balanceo de carga proporcionada por otro proveedor o implementar una solución de balanceo de carga personalizada.</p>|
|Decisión|Se elige la alternativa 1 y se utilizará un ELB de AWS para balancear la carga en la aplicación.|
|Justificación|<p>Se ha elegido utilizar un ELB de AWS debido a las siguientes razones:</p><p>AWS ELB es un servicio administrado que proporciona un balanceador de carga escalable y altamente disponible sin la necesidad de configuración y administración manual.</p><p>ELB ofrece opciones como Elastic Load Balancer Classic, Application Load Balancer (ALB) y Network Load Balancer (NLB) para adaptarse a diferentes necesidades de aplicaciones y protocolos de red.</p><p>ELB puede distribuir la carga de manera inteligente entre las instancias de la aplicación, lo que mejora la capacidad de respuesta y evita la sobrecarga de cualquier componente en particular.</p><p>ELB también proporciona capacidades de detección y recuperación de fallas para garantizar la disponibilidad continua de la aplicación.</p>|
|Implicaciones|<p>- ` `Será necesario configurar y administrar el ELB de AWS de acuerdo con los requisitos de la aplicación.</p><p>- La arquitectura de la aplicación debe ser compatible con el balanceo de carga y debe seguir las mejores prácticas recomendadas por AWS para obtener el máximo rendimiento.</p><p>- Se debe monitorear el rendimiento del ELB y ajustar la configuración según sea necesario para evitar posibles cuellos de botella o problemas de escalabilidad.</p><p>- Puede haber costos asociados con el uso de un ELB de AWS, por lo que se debe tener en cuenta en el presupuesto de la aplicación.</p>|




|Nombre|Auto Scaling Group|
| - | - |
|La decisión arquitectónica|Utilizar un Auto Scaling Group de AWS para manejar los microservicios y garantizar alta disponibilidad y escalabilidad.|
|Identificador único|AD-2|
|Cuestión o problema|¿Cómo gestionar los microservicios de manera eficiente y garantizar alta disponibilidad y escalabilidad?|
|Supuestos|<p>Se supone que los microservicios son una parte fundamental de la arquitectura y que se requiere alta disponibilidad y escalabilidad para manejar las cargas de trabajo.</p><p>Se asume que AWS proporciona un servicio de Auto Scaling Group adecuado para satisfacer los requisitos de disponibilidad y escalabilidad.</p>|
|Alternativas|<p>- Gestionar manualmente la escala de los microservicios sin utilizar un servicio automatizado.</p><p>- Utilizar un Auto Scaling Group de AWS para gestionar la escala de los microservicios de manera automática.</p>|
|Decisión|Se elige la alternativa 2 y se utilizará un Auto Scaling Group de AWS para manejar los microservicios y garantizar alta disponibilidad y escalabilidad.|
|Justificación|Se ha elegido utilizar un Auto Scaling Group porque ofrece una solución automatizada para gestionar la escala de los microservicios. El Auto Scaling Group puede monitorear la carga y la demanda en tiempo real, ajustando automáticamente el número de instancias en función de los umbrales de escalado configurados. Esto permite manejar picos de tráfico y distribuir la carga de manera eficiente, garantizando la disponibilidad y el rendimiento óptimo de los microservicios.|
|Implicaciones|<p>- Será necesario configurar adecuadamente el Auto Scaling Group, definiendo los umbrales de escalado y las políticas de creación y terminación de instancias.</p><p>- Se requerirá definir la estrategia de equilibrio de carga para distribuir el tráfico de manera equitativa entre las instancias del Auto Scaling Group.</p><p>- Será importante monitorear y ajustar los umbrales de escalado para adaptarse a las demandas cambiantes y asegurar una respuesta eficiente ante variaciones en la carga.</p><p>- Se deberá considerar la integración con otros servicios de AWS, como Elastic Load Balancer y Amazon RDS, para asegurar una arquitectura coherente y escalable.</p><p>- Será necesario implementar mecanismos de registro y monitoreo para obtener visibilidad sobre el estado y rendimiento de las instancias del Auto Scaling Group.</p><p>- Se deberá evaluar y ajustar los recursos asignados a las instancias del Auto Scaling Group para garantizar un rendimiento óptimo y evitar costos innecesarios.</p><p>- Será importante establecer políticas de seguridad y acceso adecuadas para proteger las instancias del Auto Scaling Group y los microservicios gestionados.</p><p>- Se deberá capacitar al equipo de desarrollo y operaciones en el uso y administración del Auto Scaling Group y las herramientas asociadas para asegurar un funcionamiento eficiente y una respuesta adecuada ante situaciones de alta disponibilidad y escalabilidad.</p>|



|Nombre|AWS S3|
| - | - |
|La decisión arquitectónica|Utilizar S3 para almacenar los documentos más pesados y aliviar la carga a la base de datos.|
|Identificador único|AD-3|
|Cuestión o problema|¿Cómo manejar el almacenamiento de documentos pesados de manera eficiente y aliviar la carga en la base de datos?|
|Supuestos|<p>Se supone que existen documentos pesados que necesitan ser almacenados y que la base de datos puede verse afectada por su almacenamiento.</p><p>Se asume que el uso de S3 como almacenamiento externo es una opción viable y puede ayudar a aliviar la carga en la base de datos.</p><p></p>|
|Alternativas|<p>- Almacenar todos los documentos en la base de datos sin utilizar S3.</p><p>- Utilizar un sistema de almacenamiento externo como S3 para almacenar los documentos pesados.</p>|
|Decisión|` `Se elige la alternativa 2 y se utilizará S3 para almacenar los documentos más pesados y aliviarle la carga a la base de datos.|
|Justificación|Se ha elegido utilizar S3 porque ofrece un almacenamiento escalable y duradero para los documentos pesados. Al separar los documentos de la base de datos, se reduce la carga en la misma y se mejora el rendimiento general del sistema. S3 también proporciona opciones de acceso controlado y seguridad para proteger los documentos almacenados.|
|Implicaciones|<p>- Será necesario implementar la integración entre la aplicación y S3 para el almacenamiento y recuperación de los documentos.</p><p>- Se requerirá definir una estructura adecuada de almacenamiento en S3 para organizar y acceder a los documentos de manera eficiente.</p><p>- Se deberá gestionar la sincronización y consistencia entre la base de datos y S3 cuando se realicen operaciones de creación, actualización o eliminación de documentos.</p><p>- Será importante monitorear y gestionar el espacio de almacenamiento en S3 para evitar exceder los límites y controlar los costos asociados.</p><p>- Se deberá considerar la implementación de mecanismos de respaldo y recuperación de los documentos almacenados en S3 para garantizar la disponibilidad y evitar la pérdida de datos.</p><p>- Será necesario capacitar al equipo de desarrollo y operaciones en el uso y administración de la integración con S3 para garantizar un funcionamiento eficiente y una respuesta adecuada ante situaciones de carga pesada en la base de datos.</p>|


|Nombre|Uso de microservicios para mejorar la robustez y tolerancia a fallos de la aplicación.|
| - | - |
|La decisión arquitectónica|Utilizar microservicios para diseñar la aplicación y mejorar su capacidad de manejo de fallos y su robustez.|
|Identificador único|AD-4|
|Cuestión o problema|¿Cómo mejorar la robustez y tolerancia a fallos de la aplicación?|
|Supuestos|Se supone que la aplicación está diseñada como un monolito y presenta desafíos en términos de escalabilidad, mantenibilidad y recuperación ante fallos. Se entiende que el uso de microservicios puede abordar estos problemas y proporcionar beneficios en términos de desacoplamiento, escalabilidad horizontal y recuperación ante fallos.|
|Alternativas|<p>- Mantener la arquitectura actual de monolito sin adoptar microservicios.</p><p>- Utilizar una arquitectura basada en contenedores sin descomponer la aplicación en microservicios.</p>|
|Decisión|` `Se elige la alternativa 2 y se utilizará una arquitectura basada en microservicios para mejorar la robustez y tolerancia a fallos de la aplicación.|
|Justificación|` `Se ha optado por utilizar microservicios porque permiten descomponer la aplicación en componentes más pequeños e independientes, lo que facilita la escalabilidad y el mantenimiento. Los microservicios pueden implementarse y desplegarse de forma independiente, lo que reduce el impacto de fallos en un componente en particular y mejora la capacidad de recuperación de la aplicación en su conjunto. Además, el uso de microservicios facilita la adopción de prácticas como la replicación y la distribución de cargas, lo que mejora la capacidad de manejo de fallos y la tolerancia a fallos.|
|Implicaciones|<p>- Se requerirá realizar un análisis y diseño adecuado para identificar los límites de los microservicios y definir la comunicación y la interacción entre ellos.</p><p>- Será necesario establecer mecanismos de monitoreo y recuperación ante fallos para cada microservicio, como la implementación de circuit breakers, mecanismos de reintentos y manejo de excepciones.</p><p>- Se deberá implementar una estrategia de despliegue y escalado que tenga en cuenta la naturaleza distribuida de los microservicios, como el uso de orquestadores de contenedores o plataformas de gestión de microservicios.</p><p>- Será importante considerar el impacto en la complejidad de la gestión de la infraestructura y las operaciones debido al aumento de la cantidad de componentes y servicios involucrados.</p><p>- Se deberá establecer un proceso de prueba y validación exhaustivo para garantizar la integridad de los microservicios y su capacidad de funcionamiento conjunto.</p><p>- Será necesario definir claramente las responsabilidades de cada microservicio y mantener una buena comunicación y colaboración entre los equipos responsables de cada uno.</p><p>- Se deberá evaluar el impacto en el rendimiento y los recursos necesarios para implementar la arquitectura basada en microservicios, asegurando que la infraestructura sea capaz de soportar la carga esperada y la escalabilidad requerida.</p>|

# <a name="_3wmlk9wmlsl9"></a>**7.Link repositorio**
<https://github.com/juan9572/CarpetaCiudadana>


