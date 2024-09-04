import mongoose from "mongoose";
import dotenv from "dotenv";

// Carga las variables de entorno del archivo .env
dotenv.config();

// Define la cadena de conexión a MongoDB, usando una URL por defecto si no está especificada en las variables de entorno
const connectionString = process.env.MONGO_URL || "mongodb+srv://victor:123@compunet3.mnk2c.mongodb.net/Talleres";

// Conecta a MongoDB usando la cadena de conexión
export const db = mongoose.connect(connectionString)
    .then(() => console.log("Connected to MongoDB"))  // Mensaje en consola al conectarse exitosamente
    .catch((err) => console.log(err));  // Mensaje en consola en caso de error durante la conexión
