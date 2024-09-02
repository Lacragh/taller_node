import mongoose from "mongoose";

export interface ReactionInput {

    userId: mongoose.Types.ObjectId;
    commentId: mongoose.Types.ObjectId;
    type: 'like' | 'love' | 'disagree';

}

export interface ReactionDocument extends ReactionInput, mongoose.Document {

    createdAt: Date;
    updatedAt: Date;
    deleteAt: Date;

}

const reactionSchema = new mongoose.Schema({

    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    commentId: { type: mongoose.Types.ObjectId, ref: 'Comment', required: true },
    type: { type: String, enum: ['like', 'love', 'disagree'], required: true },

},
{

    timestamps: true, collection: "reactions"

});

const Reaction = mongoose.model<ReactionDocument>("Reaction", reactionSchema);

export default Reaction;