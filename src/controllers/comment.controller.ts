import { Request, Response } from "express";
import { CommentDocument, CommentInput } from "../models/comment.model";
import CommentService from "../services/comment.service";

class CommentController {

    public async create(req: Request, res: Response) {

        try {

            const { userId, content, parentId } = req.body;
            const comment: CommentDocument = await CommentService.create({ userId, content, parentId });
            return res.status(201).json(comment);

        } catch (error) {

            return res.status(500).json(error);

        }

    };

    public async get(req: Request, res: Response) {

        try {

            const comment: CommentDocument | null = await CommentService.findById(req.params.id);
            return res.json(comment);
            

        } catch (error) {

            return res.status(500).json(error);

        }

    };

    public async getAll(req: Request, res: Response) {

        try {

            const comments: CommentDocument[] = await CommentService.findAll();
            return res.json(comments);

        } catch (error) {

            return res.status(500).json(error);

        }

    };

    public async getByParentId(req: Request, res: Response) {

        try {
            
            const comments: CommentDocument[] = await CommentService.findByParentId(req.params.parentId);
            return res.json(comments);

        } catch (error) {

           return res.status(500).json(error);

        }

    };

    public async update(req: Request, res: Response) {

        try {

            const comment: CommentDocument | null = await CommentService.findById(req.params.id);
            
            if (!comment) {
                return res.status(404).json({ message: `Comment with id: ${req.params.id} not found` });
            }

    
            const { id } = req.body.loggedUser; 
            if (comment.userId.toString() !== id) {
                return res.status(403).json({ message: "You do not have permission to modify this comment" });
            }

            const updatedComment: CommentDocument | null = await CommentService.update(req.params.id, req.body as CommentInput);
            return res.json(updatedComment);

        } catch (error) {

           return res.status(500).json(error);

        }

    };

    public async delete(req: Request, res: Response) {

        try {

            const comment: CommentDocument | null = await CommentService.findById(req.params.id);
            
            if (!comment) {
                return res.status(404).json({ message: `Comment with id: ${req.params.id} not found` });
            }

            const { id } = req.body.loggedUser; 
            if (comment.userId.toString() !== id) {
                return res.status(403).json({ message: "You do not have permission to delete this comment" });
            }

            
            await CommentService.delete(req.params.id);
            return res.json({ message: "Comment deleted successfully" });

        } catch (error) {

            return res.status(500).json(error);

        }
        
    };

};

export default new CommentController();