import mongoose from "mongoose";

// Interfaz para definir la estructura de entrada de un usuario
export interface UserInput {
    name: string;  // Nombre del usuario
    email: string;  // Correo electrónico del usuario (debe ser único)
    password: string;  // Contraseña del usuario
    role: 'superadmin' | 'user';  // Rol del usuario, puede ser 'superadmin' o 'user'
}

// Interfaz para definir la estructura del documento de un usuario en la base de datos
export interface UserDocument extends UserInput, mongoose.Document {
    createAt: Date;  // Fecha de creación del usuario (campo incorrecto, debería ser `createdAt`)
    updateAt: Date;  // Fecha de la última actualización del usuario (campo incorrecto, debería ser `updatedAt`)
    deleteAt: Date;  // Fecha de eliminación del usuario (este campo no se define en el esquema, pero se incluye en la interfaz)
}

// Esquema de Mongoose para el modelo de usuarios
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Nombre del usuario, obligatorio
    email: { type: String, required: true, index: true, unique: true },  // Correo electrónico, obligatorio, único e indexado
    password: { type: String, required: true },  // Contraseña del usuario, obligatoria
    role: { type: String, enum: ['superadmin', 'user'], default: 'user' }  // Rol del usuario, puede ser 'superadmin' o 'user', con valor por defecto 'user'
},
{
    timestamps: true,  // Agrega automáticamente los campos `createdAt` y `updatedAt`
    collection: "users"  // Nombre de la colección en la base de datos
});

// Modelo de Mongoose basado en el esquema
const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
