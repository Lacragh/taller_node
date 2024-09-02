import { Request, Response } from "express";
import ReactionService from "../services/reaction.service";

class ReactionController {

    public async create(req: Request, res: Response) {

        try {

            const { id: userId } = req.body.loggedUser;
            const { commentId, type } = req.body;
            const reaction = await ReactionService.create({ userId, commentId, type });
            return res.status(201).json(reaction);

        } catch (error) {

            return res.status(500).json(error);

        }
        
    };

    public async getByComment(req: Request, res: Response) {

        try {
            
            const reactions = await ReactionService.findByCommentId(req.params.commentId);
            res.json(reactions);

        } catch (error) {

            res.status(500).json(error);

        }

    };

    public async delete(req: Request, res: Response) {

        try {

            const { id: userId } = req.body.loggedUser;
            const { commentId } = req.params;
            const reaction = await ReactionService.deleteByUserAndComment(userId, commentId);
            if (!reaction) {
                return res.status(404).json({ message: "Reaction not found or you do not have permission to delete this reaction" });
            }
            res.json({ message: "Reaction deleted successfully" });

        } catch (error) {

            res.status(500).json(error);

        }

    };
    
};

export default new ReactionController();