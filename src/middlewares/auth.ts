import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

// Middleware para autenticar solicitudes usando JWT
const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token: string | undefined = req.headers.authorization;  // Obtiene el token de los encabezados de autorización
        
        if (!token) {
            return res.status(401).json({ message: "Not Authorized" });  // Devuelve 401 si no hay token
        } else {
            token = token.replace("Bearer ", "");  // Elimina el prefijo "Bearer " del token
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");  // Verifica y decodifica el token usando la clave secreta
            req.body.loggedUser = decoded;  // Agrega el usuario decodificado al cuerpo de la solicitud
            req.params.role = decoded.role;  // Agrega el rol decodificado a los parámetros de la solicitud (esto podría ser innecesario o debería estar en req.body)
            next();  // Llama al siguiente middleware o controlador
        }

    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).json({ message: "Token Expired", error });  // Devuelve 401 si el token ha expirado
        } else {
            return res.status(401).json({ message: "Token Invalid", error });  // Devuelve 401 si el token es inválido
        }
    }
};

export default auth;
