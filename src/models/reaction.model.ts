import mongoose from "mongoose";

// Interfaz para definir la estructura de entrada de una reacción
export interface ReactionInput {
    userId: mongoose.Types.ObjectId;  // ID del usuario que realiza la reacción
    commentId: mongoose.Types.ObjectId;  // ID del comentario al que se reacciona
    type: 'like' | 'love' | 'disagree';  // Tipo de reacción: 'like', 'love', o 'disagree'
}

// Interfaz para definir la estructura del documento de una reacción en la base de datos
export interface ReactionDocument extends ReactionInput, mongoose.Document {
    createdAt: Date;  // Fecha de creación de la reacción
    updatedAt: Date;  // Fecha de la última actualización de la reacción
    deleteAt: Date;  // Fecha de eliminación de la reacción (aunque este campo no se define en el esquema, se incluye en la interfaz)
}

// Esquema de Mongoose para el modelo de reacciones
const reactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },  // Referencia al modelo de usuarios
    commentId: { type: mongoose.Types.ObjectId, ref: 'Comment', required: true },  // Referencia al modelo de comentarios
    type: { type: String, enum: ['like', 'love', 'disagree'], required: true },  // Tipo de reacción, debe ser uno de los valores especificados
},
{
    timestamps: true,  // Agrega automáticamente los campos `createdAt` y `updatedAt`
    collection: "reactions"  // Nombre de la colección en la base de datos
});

// Modelo de Mongoose basado en el esquema
const Reaction = mongoose.model<ReactionDocument>("Reaction", reactionSchema);

export default Reaction;
