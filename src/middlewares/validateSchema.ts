import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

// Middleware para validar el cuerpo de la solicitud usando un esquema Zod
const validateSchema = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);  // Intenta validar el cuerpo de la solicitud contra el esquema Zod
            next();  // Si la validación es exitosa, llama al siguiente middleware o controlador
        } catch (error) {
            res.status(400).json(error);  // Devuelve un error 400 Bad Request si la validación falla
        }
    }
}

export default validateSchema;
