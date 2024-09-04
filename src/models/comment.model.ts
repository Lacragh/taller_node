import mongoose from "mongoose";

// Interfaz para definir la estructura de entrada de un comentario
export interface CommentInput {
    userId: mongoose.Types.ObjectId;  // ID del usuario que creó el comentario
    content: string;  // Contenido del comentario
    parentId?: mongoose.Types.ObjectId;  // ID del comentario padre, si es una respuesta
}

// Interfaz para definir la estructura del documento de un comentario en la base de datos
export interface CommentDocument extends CommentInput, mongoose.Document {
    createdAt: Date;  // Fecha de creación del comentario
    updatedAt: Date;  // Fecha de la última actualización del comentario
    deleteAt: Date;  // Fecha de eliminación del comentario (aunque este campo no se define en el esquema, se incluye en la interfaz)
}

// Esquema de Mongoose para el modelo de comentarios
const commentSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },  // Referencia al modelo de usuarios
    content: { type: String, required: true },  // Contenido del comentario
    parentId: { type: mongoose.Types.ObjectId, ref: 'Comment', default: null },  // Referencia al comentario padre
},
{
    timestamps: true,  // Agrega automáticamente los campos `createdAt` y `updatedAt`
    collection: "comments"  // Nombre de la colección en la base de datos
});

// Modelo de Mongoose basado en el esquema
const Comment = mongoose.model<CommentDocument>("Comment", commentSchema);

export default Comment;
