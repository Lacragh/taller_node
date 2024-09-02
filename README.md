# Taller Node 
## Victor Manuel Garzon Meneses
## Santiago Jose Belalcazar

Este proyecto es una API backend construida con Node.js y TypeScript que permite la gestión de usuarios y comentarios. Incluye autenticación y autorización mediante JWT, y operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para usuarios y comentarios. La base de datos utilizada es MongoDB.


## Características

- **Autenticación y Autorización**: Registro e inicio de sesión de usuarios mediante JWT.
- **Roles de Usuario**: Soporte para diferentes roles de usuario, como `superadmin` y `usuario` regular.
- **Operaciones CRUD**: Gestión completa de usuarios y comentarios (crear, leer, actualizar, eliminar).
- **Hilos de discusion**: Permite respuestas a comentarios, creando un hilo de comentarios.
- **Protección de Rutas**: Las rutas CRUD están protegidas con middleware de autenticación y autorización.

Asegúrate de tener instalados los siguientes requisitos:

- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/)


## Instalacion de dependencias

Abre una terminal dentro del directorio e ingresa los siguientes comandos `yarn` y `npm install`
