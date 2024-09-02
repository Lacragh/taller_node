# Taller Node 

## Desarrolladores
- **Victor Manuel Garzon Meneses**
- **Santiago Jose Belalcazar**

Este proyecto es una API backend construida con Node.js y TypeScript que permite la gestión de usuarios y comentarios. Incluye autenticación y autorización mediante JWT, y operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para usuarios y comentarios. La base de datos utilizada es MongoDB.

## Características

- **Autenticación y Autorización**: Registro e inicio de sesión de usuarios mediante JWT.
- **Roles de Usuario**: Soporte para diferentes roles de usuario, como `superadmin` y `usuario` regular.
- **Operaciones CRUD**: Gestión completa de usuarios y comentarios (crear, leer, actualizar, eliminar).
- **Hilos de Discusión**: Permite respuestas a comentarios, creando un hilo de discusión.
- **Reacciones a Comentarios**: Los usuarios pueden reaccionar a los comentarios con "me gusta", "amor", "en desacuerdo", etc.
- **Protección de Rutas**: Las rutas CRUD están protegidas con middleware de autenticación y autorización.

## Requisitos Previos

Asegúrate de tener instalados los siguientes requisitos:

- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## Instalación de Dependencias

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/taller-node.git
   cd taller-node
  
2. Instala las dependencias con npm o yarn:
   ```bash
   npm install
   # o
   yarn install
  
3. Configuracion:

   3.1 Renombra el archivo .env.example a .env y actualiza las variables de entorno con tus credenciales. Ejemplo:
     ```bash 
     MONGO_URL=mongodb+srv://usuario:password@cluster.mongodb.net/miBaseDeDatos
     JWT_SECRET=tuClaveSecretaParaJWT
     PORT=3000
     ```

   3.2 Inicia el servidor:
     ```bash
     npm run dev
     # o
     yarn dev
  
4. Dificultades encontradas:
   
   Gestión de Reacciones: Durante el desarrollo de la funcionalidad de reacciones, se encontraron desafíos al evitar que los usuarios reaccionaran múltiples veces al mismo comentario con el mismo tipo de       reacción. Esto se resolvió implementando verificaciones adicionales en el controlador.
