\# Galería de Fotos



\## 1. Descripción del proyecto



Galería de Fotos es una aplicación web que permite registrar, almacenar y visualizar fotografías. El sistema utiliza Angular para la interfaz, Node.js y Express para el backend, y MariaDB para almacenar los datos de cada fotografía.



\## 2. Tecnologías utilizadas



\- Angular: desarrollo de la interfaz web.

\- Node.js: entorno de ejecución del backend.

\- Express: gestión de rutas y solicitudes HTTP.

\- MariaDB: sistema gestor de base de datos.

\- Multer: recepción y almacenamiento de archivos.

\- XAMPP y Apache: publicación de la aplicación web.

\- HTTPS: acceso seguro al sitio mediante un certificado local.



\## 3. Requisitos previos



\- Node.js y npm instalados.

\- Angular CLI compatible con la versión del proyecto.

\- XAMPP con Apache.

\- MariaDB configurado para escuchar en el puerto 3308.

\- Navegador web actualizado.



\## 4. Instalación del proyecto



1\. Copiar o descargar la carpeta del proyecto.

2\. Abrir una terminal en la carpeta raíz.

3\. Instalar las dependencias con el comando:



&#x20;  `npm install`



4\. Verificar que la base de datos `galeria\\\_fotos` exista y que contenga la tabla `fotos`.

5\. Revisar la configuración de conexión a MariaDB en el backend.



\## 5. Configuración de la base de datos



La base de datos utilizada se llama `galeria\\\_fotos` y está configurada en el puerto 3308.



El script de creación de la estructura se encuentra en:



`database/galeria\\\_fotos.sql`



La tabla `fotos` almacena el identificador, título, descripción, ruta del archivo, tipo y fecha de subida.



\## 6. Ejecución del backend



Desde la carpeta raíz del proyecto, ejecutar:



`node backend/server.js`



El servidor utiliza el puerto 3000. Para comprobar la API, abrir:



`http://localhost:3000/api/fotos`



\## 7. Ejecución y publicación del frontend



Para generar la versión de producción, ejecutar:



`ng build`



Los archivos compilados se generan en:



`dist/galeria-fotos/browser`



En el entorno configurado, estos archivos se publican en:



`C:/xampp/htdocs/galeria-fotos`



La aplicación se consulta mediante:



`https://galeria-fotos.local`



El dominio y el certificado HTTPS descritos corresponden al entorno local configurado para el desarrollo y las pruebas.



\## 8. Almacenamiento de fotografías



Los archivos de imagen se guardan en:



`backend/uploads`



La base de datos almacena los datos asociados y la ruta de cada archivo. Por ello, se deben respaldar tanto la base de datos como la carpeta de imágenes.



\## 9. Seguridad y mantenimiento



\- Mantener actualizadas las dependencias.

\- Validar los archivos que se reciben.

\- Realizar respaldos de la base de datos y de las fotografías.

\- No publicar contraseñas ni archivos de configuración sensibles.

\- Utilizar certificados válidos al desplegar el sistema en un servidor público.



\## 10. Pruebas de funcionamiento



Se debe comprobar que la aplicación abra correctamente, que permita subir fotografías, que los registros se almacenen en la base de datos y que las imágenes sigan visibles después de recargar la página.

