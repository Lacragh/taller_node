import ReactionModel, { ReactionDocument, ReactionInput } from "../models/reaction.model";

class ReactionService {
    
    public async create(reactionInput: ReactionInput): Promise<ReactionDocument> {
        try {
            const reaction = await ReactionModel.create(reactionInput);
            return reaction;
        } catch (error) {
            throw error;
        }
    }

    public async findByCommentId(commentId: string): Promise<ReactionDocument[]> {
        try {
            return ReactionModel.find({ commentId }).populate('userId', 'name email').exec();
        } catch (error) {
            throw error;
        }
    }

    public async deleteByUserAndComment(userId: string, commentId: string): Promise<ReactionDocument | null> {
        try {
            const reaction: ReactionDocument | null = await ReactionModel.findOneAndDelete({ userId, commentId });
            return reaction
        } catch (error) {
            throw error;
        }
    }
}

export default new ReactionService();