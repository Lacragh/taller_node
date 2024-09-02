import CommentModel, { CommentDocument, CommentInput } from "../models/comment.model";

class CommentService {

    public async create(commentInput: CommentInput): Promise<CommentDocument> {
        try{
            const comment = await CommentModel.create(commentInput);
            return comment;
        }catch (error){
            throw error;
        }
    }

    public async findById(id: string): Promise<CommentDocument | null> {
        try{
            const comment = await CommentModel.findById(id)
            return comment;
        }catch (error){
            throw error;
        }
    }

    public async findAll(): Promise<CommentDocument[]> {
        try{
            return CommentModel.find().populate('userId', 'name email').exec();
        }catch (error){
            throw error;
        }
    }

    public async findByParentId(parentId: string): Promise<CommentDocument[]> {
        try{
            return CommentModel.find({ parentId }).populate('userId', 'name email').exec();
        }catch (error){
            throw error;
        }
    }

    public async update(id: string, commentInput: CommentInput): Promise<CommentDocument | null> {
        try{
            const comment: CommentDocument | null = await CommentModel.findOneAndUpdate({ _id: id }, commentInput, { new: true });
            return comment;
        }catch (error){
            throw error;
        }
    }

    public async delete(id: string): Promise<CommentDocument | null> {
        try{
            const comment: CommentDocument | null = await CommentModel.findByIdAndDelete(id);
            return comment;
        }catch (error){
            throw error;
        }
    }
}

export default new CommentService();