import ReactionModel, { ReactionDocument, ReactionInput } from "../models/reaction.model";

class ReactionService {
    
    // Crea una nueva reacción en la base de datos
    public async create(reactionInput: ReactionInput): Promise<ReactionDocument> {
        try {
            const reaction = await ReactionModel.create(reactionInput);
            return reaction;
        } catch (error) {
            throw error;  // Propaga cualquier error que ocurra
        }
    }

    // Encuentra todas las reacciones asociadas a un comentario específico
    public async findByCommentId(commentId: string): Promise<ReactionDocument[]> {
        try {
            return ReactionModel.find({ commentId }).populate('userId', 'name email').exec();
        } catch (error) {
            throw error;  // Propaga cualquier error que ocurra
        }
    }

    // Elimina una reacción específica basada en el usuario y el comentario
    public async deleteByUserAndComment(userId: string, commentId: string): Promise<ReactionDocument | null> {
        try {
            const reaction: ReactionDocument | null = await ReactionModel.findOneAndDelete({ userId, commentId });
            return reaction;
        } catch (error) {
            throw error;  // Propaga cualquier error que ocurra
        }
    }
}

export default new ReactionService();
