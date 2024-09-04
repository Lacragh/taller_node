import { Request, Response } from "express";
import ReactionService from "../services/reaction.service";

class ReactionController {

    // Crea una nueva reacción en un comentario
    public async create(req: Request, res: Response) {
        try {
            const { id: userId } = req.body.loggedUser;  // Obtiene el ID del usuario desde el cuerpo de la solicitud
            const { commentId, type } = req.body;  // Obtiene el ID del comentario y el tipo de reacción desde el cuerpo de la solicitud
            const reaction = await ReactionService.create({ userId, commentId, type });  // Llama al servicio para crear la reacción
            return res.status(201).json(reaction);  // Devuelve la reacción creada con un estado 201
        } catch (error) {
            return res.status(500).json(error);  // Devuelve un error 500 en caso de excepción
        }
    }

    // Obtiene todas las reacciones asociadas a un comentario específico
    public async getByComment(req: Request, res: Response) {
        try {
            const reactions = await ReactionService.findByCommentId(req.params.commentId);  // Llama al servicio para obtener reacciones por ID de comentario
            return res.json(reactions);  // Devuelve las reacciones encontradas
        } catch (error) {
            return res.status(500).json(error);  // Devuelve un error 500 en caso de excepción
        }
    }

    // Elimina una reacción específica de un comentario
    public async delete(req: Request, res: Response) {
        try {
            const { id: userId } = req.body.loggedUser;  // Obtiene el ID del usuario desde el cuerpo de la solicitud
            const { commentId } = req.params;  // Obtiene el ID del comentario desde los parámetros de la solicitud
            const reaction = await ReactionService.deleteByUserAndComment(userId, commentId);  // Llama al servicio para eliminar la reacción
            if (!reaction) {
                return res.status(404).json({ message: "Reaction not found or you do not have permission to delete this reaction" });  // Devuelve un error 404 si la reacción no se encuentra o el usuario no tiene permiso
            }
            return res.json({ message: "Reaction deleted successfully" });  // Devuelve un mensaje de éxito
        } catch (error) {
            return res.status(500).json(error);  // Devuelve un error 500 en caso de excepción
        }
    }
}

export default new ReactionController();
