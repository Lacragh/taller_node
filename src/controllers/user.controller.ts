import express, { Request, Response } from "express";
import { UserDocument, UserInput } from "../models/user.model";
import userService from "../services/user.service";

class userController {

    // Crea un nuevo usuario si el usuario autenticado es un superadmin
    public async create(req: Request, res: Response) {
        try {
            if (req.body.loggedUser.role !== 'superadmin') {  // Verifica si el usuario autenticado es un superadmin
                console.log(req.body.loggedUser);
                return res.status(403).json({ message: 'Forbidden' });  // Devuelve 403 Forbidden si no es superadmin
            }
            const user: UserDocument = await userService.create(req.body as UserInput);  // Llama al servicio para crear el usuario
            return res.status(201).json(user);  // Devuelve el usuario creado con estado 201
        } catch (error) {
            if (error instanceof ReferenceError) {
                return res.status(400).json({ message: "User already exists" });  // Devuelve 400 Bad Request si el usuario ya existe
            }
            return res.status(500).json(error);  // Devuelve 500 Internal Server Error en caso de otra excepción
        }
    }

    // Inicia sesión y devuelve información del usuario
    public async login(req: Request, res: Response) {
        try {
            const userObj = await userService.login(req.body);  // Llama al servicio de login
            return res.status(200).json(userObj);  // Devuelve la información del usuario con estado 200
        } catch (error) {
            console.log(error);
            if (error instanceof ReferenceError) {
                return res.status(400).json({ message: "User does not exist" });  // Devuelve 400 Bad Request si el usuario no existe
            } else if (error instanceof ReferenceError) {
                return res.status(400).json({ message: "Not Authorized" });  // Devuelve 400 Bad Request si el usuario no está autorizado
            }
            return res.status(500).json(error);  // Devuelve 500 Internal Server Error en caso de otra excepción
        }
    }

    // Obtiene un usuario por su ID
    public async get(req: Request, res: Response) {
        try {
            const user: UserDocument | null = await userService.findById(req.params.id);  // Llama al servicio para encontrar el usuario por ID
            return res.json(user);  // Devuelve el usuario encontrado
        } catch (error) {
            return res.status(500).json(error);  // Devuelve 500 Internal Server Error en caso de excepción
        }
    }

    // Obtiene todos los usuarios
    public async getAll(req: Request, res: Response) {
        try {
            const users: UserDocument[] = await userService.findAll();  // Llama al servicio para obtener todos los usuarios
            return res.json(users);  // Devuelve la lista de usuarios
        } catch (error) {
            return res.status(500).json(error);  // Devuelve 500 Internal Server Error en caso de excepción
        }
    }

    // Actualiza un usuario por su ID si el usuario autenticado es un superadmin
    public async update(req: Request, res: Response) {
        try {
            if (req.body.loggedUser.role !== 'superadmin') {  // Verifica si el usuario autenticado es un superadmin
                console.log(req.body.loggedUser);
                return res.status(403).json({ message: 'Forbidden' });  // Devuelve 403 Forbidden si no es superadmin
            }
            const user: UserDocument | null = await userService.update(req.params.id, req.body as UserInput);  // Llama al servicio para actualizar el usuario
            if (!user) {
                return res.status(404).json({ message: `User with id: ${req.params.id} not found` });  // Devuelve 404 Not Found si el usuario no se encuentra
            }
            return res.json(user);  // Devuelve el usuario actualizado
        } catch (error) {
            return res.status(500).json(error);  // Devuelve 500 Internal Server Error en caso de excepción
        }
    }

    // Elimina un usuario por su ID si el usuario autenticado es un superadmin
    public async delete(req: Request, res: Response) {
        try {
            if (req.body.loggedUser.role !== 'superadmin') {  // Verifica si el usuario autenticado es un superadmin
                console.log(req.body.loggedUser);
                return res.status(403).json({ message: 'Forbidden' });  // Devuelve 403 Forbidden si no es superadmin
            }
            const user: UserDocument | null = await userService.delete(req.params.id);  // Llama al servicio para eliminar el usuario
            if (!user) {
                return res.status(404).json({ message: `User with id: ${req.params.id} not found` });  // Devuelve 404 Not Found si el usuario no se encuentra
            }
            return res.json(user);  // Devuelve el usuario eliminado
        } catch (error) {
            return res.status(500).json(error);  // Devuelve 500 Internal Server Error en caso de excepción
        }
    }
}

export default new userController();
