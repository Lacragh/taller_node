# Taller de Migración a GraphQL

# Desarrollado por:
- Victor Manuel Garzon Meneses
- Santiago Jose Belalcazar
- Manuel Herrera


## Descripción del Proyecto
Este proyecto consiste en la migración de una API REST existente a GraphQL, manteniendo la funcionalidad original pero aprovechando las ventajas de GraphQL para mejorar la eficiencia y flexibilidad en la gestión de datos.

## Características Principales
- **Gestión de Usuarios**: Sistema completo de CRUD con roles (superadmin y usuario regular)
- **Gestión de Comentarios**: Creación, lectura, actualización y eliminación de comentarios
- **Sistema de Respuestas**: Implementación de hilos de discusión
- **Sistema de Reacciones**: Permite a usuarios reaccionar a comentarios
- **Autenticación**: Sistema JWT para proteger rutas y operaciones

## Tecnologías Utilizadas
- Node.js
- TypeScript
- GraphQL
- MongoDB
- JWT para autenticación

## Estructura del Proyecto
La estructura del proyecto se organiza de la siguiente manera:
```
src/
├── config/         # Configuración de la base de datos
├── controllers/    # Controladores de la aplicación
├── graphql/        # Esquemas y resolvers de GraphQL
├── middlewares/    # Middlewares de autenticación y validación
├── models/         # Modelos de datos
├── routes/         # Rutas de la API
└── services/       # Servicios de la aplicación
```

## Instalación y Configuración

### Requisitos Previos
- Node.js (v14 o superior)
- MongoDB
- npm o yarn

### Pasos de Instalación
1. Clonar el repositorio:
```bash
git clone https://github.com/Lacragh/taller_node/tree/graphql
cd https://github.com/Lacragh/taller_node/tree/graphql
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` con las siguientes variables:
```
MONGO_URL=<tu-url-de-mongodb>
JWT_SECRET=<tu-clave-secreta>
PORT=3000
```

4. Iniciar el servidor:
```bash
npm run dev
```

## Endpoints GraphQL

### Queries
- `users`: Obtiene lista de usuarios
- `user(id: ID!)`: Obtiene un usuario específico
- `comments`: Obtiene todos los comentarios
- `commentByParent(parentId: ID!)`: Obtiene respuestas a un comentario
- `reactionsByComment(commentId: ID!)`: Obtiene reacciones de un comentario

### Mutations
- `createUser(input: CreateUserInput!)`: Crea nuevo usuario
- `login(input: LoginInput!)`: Inicia sesión
- `createComment(input: CreateCommentInput!)`: Crea comentario
- `createReaction(input: CreateReactionInput!)`: Crea reacción

## Seguridad
- Autenticación mediante JWT
- Middleware de autorización para proteger rutas
- Validación de roles para operaciones específicas

## Dificultades Encontradas
1. **Gestión de Reacciones**: Se encontraron desafíos al implementar la lógica para evitar reacciones duplicadas.
2. **Migración a GraphQL**: La transición desde REST requirió una reestructuración significativa de los resolvers.

## Pruebas
Se incluye una colección de Postman con pruebas para todas las funcionalidades:

```104:116:README.md
## Pruebas

Se incluye un archivo JSON de Postman en el proyecto (Archivo_JSON_POSTMAN.json) que contiene pruebas de cada una de las funcionalidades de la API.
Este archivo contiene todas las solicitudes y scripts de test utilizados para validar la funcionalidad de la API.


**Cómo importar el archivo de Postman**

1. Abre Postman.
2. Haz clic en "Import" en la parte superior izquierda.
3. Selecciona el archivo `Archivo_JSON_POSTMAN.json` .
4. Ejecuta las pruebas desde la colección importada.

```


## Despliegue
La aplicación está desplegada en Railway:
[https://tallernode-production.up.railway.app/](https://tallernode-production.up.railway.app/)

## Estado del Proyecto
- ✅ Implementación de GraphQL
- ✅ Sistema de Autenticación
- ✅ CRUD de Usuarios
- ✅ Sistema de Comentarios
- ✅ Sistema de Reacciones
- ✅ Documentación
- ✅ Pruebas
