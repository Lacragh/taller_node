import CommentModel, { CommentDocument, CommentInput } from "../models/comment.model";

class CommentService {

    // Crea un nuevo comentario en la base de datos
    public async create(commentInput: CommentInput): Promise<CommentDocument> {
        try {
            const comment = await CommentModel.create(commentInput);
            return comment;
        } catch (error) {
            throw error;  // Propaga cualquier error que ocurra
        }
    }

    // Encuentra un comentario por su ID
    public async findById(id: string): Promise<CommentDocument | null> {
        try {
            const comment = await CommentModel.findById(id);
            return comment;
        } catch (error) {
            throw error;  // Propaga cualquier error que ocurra
        }
    }

    // Encuentra todos los comentarios y poblados con información del usuario
    public async findAll(): Promise<CommentDocument[]> {
        try {
            return CommentModel.find().populate('userId', 'name email').exec();
        } catch (error) {
            throw error;  // Propaga cualquier error que ocurra
        }
    }

    // Encuentra todos los comentarios que tienen el mismo ID de comentario padre
    public async findByParentId(parentId: string): Promise<CommentDocument[]> {
        try {
            return CommentModel.find({ parentId }).populate('userId', 'name email').exec();
        } catch (error) {
            throw error;  // Propaga cualquier error que ocurra
        }
    }

    // Actualiza un comentario existente por su ID
    public async update(id: string, commentInput: CommentInput): Promise<CommentDocument | null> {
        try {
            const comment: CommentDocument | null = await CommentModel.findOneAndUpdate(
                { _id: id }, 
                commentInput, 
                { new: true }  // Retorna el documento actualizado
            );
            return comment;
        } catch (error) {
            throw error;  // Propaga cualquier error que ocurra
        }
    }

    // Elimina un comentario por su ID
    public async delete(id: string): Promise<CommentDocument | null> {
        try {
            const comment: CommentDocument | null = await CommentModel.findByIdAndDelete(id);
            return comment;
        } catch (error) {
            throw error;  // Propaga cualquier error que ocurra
        }
    }
}

export default new CommentService();
