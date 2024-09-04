# Taller Node 

## Desarrolladores
- **Victor Manuel Garzon Meneses**
- **Santiago Jose Belalcazar**

Este proyecto es una API backend construida con Node.js y TypeScript que permite la gestión de usuarios y comentarios. Incluye autenticación y autorización mediante JWT, y operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para usuarios y comentarios. La base de datos utilizada es MongoDB.

## Tabla de contenidos

   - Requisitos Previos
   - Instalación
   - Configuración
   - Endpoints
   - Tecnologías Utilizadas
   - Funcionalidades
   - Dificultades
   - Pruebas
   - Despliegue

## Requisitos Previos

Asegúrate de tener instalados los siguientes requisitos:

- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/taller-node.git
   cd taller-node
  
2. Instala las dependencias con npm o yarn:
   ```bash
   npm install
   # o
   yarn install
  
## Configuracion:

1. Renombra el archivo .env.example a .env y actualiza las variables de entorno con tus credenciales. Ejemplo:
   
     ```bash 
     MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/miBaseDeDatos
     JWT_SECRET=tuClaveSecretaParaJWT
     PORT=3000
     ```

2. Inicia el servidor:

     ```bash
     npm run dev
     # o
     yarn dev
     ```

## Endpoints

En el repositorio se incluye un JSON de Postman que tiene pruebas en un entorno local de los endpoints, en el puede encontrar cada una de las operaciones que se tuvieron en cuenta para la aplicacion.

### Gestión de Usuarios

   - POST /api/v1/user/login - Login de un usuario.
   - POST /api/v1/user/ - Crea un nuevo usuario (restringido solo al rol superadmin).
   - GET /api/v1/user/ - Obtiene la lista de usuarios registrados.
   - GET /api/v1/user/profile - Obtiene la informacion del usuario logeado.
   - GET /api/v1/user/:id - Obtiene la informacion de un usuario por su ID.
   - PUT /api/v1/user/:id - Modifica un usuario existente (restringido solo al rol superadmin).
   - DELETE /api/v1/user/:id - Eliminar un usuario (restringido solo al rol superadmin).

### Gestión de Comentarios

   - POST /api/v1/comment/ - Crea un nuevo comentario.
   - POST /api/v1/comment/ - Crea una respuesta a un comentario. (Debe indicarse el comentario al que responde por medio del atributo "parentID : id")
   - GET /api/v1/comment/:id - Obtiene el comentario con la ID especificada.
   - GET /api/v1/comment/parent/:parentId - Obtiene las respuestas del comentario indicado.
   - PUT /api/v1/comment/:id - Modifica el comentario indicado.
   - DELETE /api/v1/comment/:id - Elimina el comentario indicado.

### Gestión de Reacciones

   - POST /api/v1/reaction/ - Crea una reaccion a un comentario (Debe indicarse el comentario al que reacciona por medio del atributo "commentId : id").
   - GET /api/v1/reaction/:commentId - Obtiene las reacciones del comentario indicado.
   - DELETE /api/v1/reaction/:commentId - Elimina una reacción del comentario indicado.

## Tecnologías Utilizadas

   - Node.js: Entorno de ejecución para JavaScript en el servidor.
   - TypeScript: Superconjunto de JavaScript que añade tipado estático.
   - MongoDB: Base de datos NoSQL para la persistencia de datos.
   - JWT: Para la autenticación y autorización segura de los usuarios.

## Funcionalidades de la aplicacion

   - **Autenticación y Autorización**: Registro e inicio de sesión de usuarios mediante JWT.
   - **Roles de Usuario**: Soporte para diferentes roles de usuario, como `superadmin` y `usuario` regular.
   - **Operaciones CRUD**: Gestión completa de usuarios y comentarios (crear, leer, actualizar, eliminar).
   - **Hilos de Discusión**: Permite respuestas a comentarios, creando un hilo de discusión.
   - **Reacciones a Comentarios**: Los usuarios pueden reaccionar a los comentarios con "me gusta", "amor", "en desacuerdo", etc.
   - **Protección de Rutas**: Las rutas CRUD están protegidas con middleware de autenticación y autorización.

## Pruebas

Se incluye un archivo JSON de Postman en el proyecto (Archivo_JSON_POSTMAN.json) que contiene pruebas de cada una de las funcionalidades de la API.
Este archivo contiene todas las solicitudes y scripts de test utilizados para validar la funcionalidad de la API.


**Cómo importar el archivo de Postman**

1. Abre Postman.
2. Haz clic en "Import" en la parte superior izquierda.
3. Selecciona el archivo `Archivo_JSON_POSTMAN.json` .
4. Ejecuta las pruebas desde la colección importada.

## Dificultades encontradas:
   
   Gestión de Reacciones: Durante el desarrollo de la funcionalidad de reacciones, se encontraron desafíos al evitar que los usuarios reaccionaran múltiples veces al mismo comentario con el mismo tipo de       reacción. Esto se resolvió implementando verificaciones adicionales en el controlador.

## Despliegue
   https://tallernode-production.up.railway.app/
