import express, { Request, Response } from "express";
import { UserDocument, UserInput } from "../models/user.model";
import userService from "../services/user.service";

class userController {

    public async create(req: Request, res: Response) {

        try{

            if (req.body.loggedUser.role !== 'superadmin') {
                console.log(req.body.loggedUser)
                return res.status(403).json({ message: 'Forbidden' });
            }
            const user: UserDocument = await userService.create(req.body as UserInput);
            return res.status(201).json(user);

        }catch (error) {

            if(error instanceof ReferenceError){
                return res.status(400).json({ message: "User already exists" })
            }
            return res.status(500).json(error);

        }
    
    };
    public async login(req: Request, res:Response){
        try{
            const userObj = await userService.login(req.body);
            return res.status(200).json(userObj)
        }
        catch (error){
            console.log(error)
            if (error instanceof ReferenceError){
                return res.status(400).json({ message:"User does not exists"})
            }else if(error instanceof ReferenceError){
                return res.status(400).json({ message:"Not Authorized"})
            }
            return res.status(500).json(error)
        }
        
    }
    
    public async get(req: Request, res: Response) {
    
        try{

            const user: UserDocument | null = await userService.findById(req.params.id);
            return res.json(user);

        }catch (error) {

           return res.status(500).json(error);

        }
    
    };
    
    public async getAll(req: Request, res: Response) {
    
        try{

            const users: UserDocument[] = await userService.findAll();
            return res.json(users);

        }catch (error) {

            return res.status(500).json(error);

        }
    
    };

    public async update(req: Request, res: Response) {
    
        try{
            if (req.body.loggedUser.role !== 'superadmin') {
                console.log(req.body.loggedUser)
                return res.status(403).json({ message: 'Forbidden' });
            }
            const user: UserDocument | null = await userService.update(req.params.id, req.body as UserInput);
            if(!user) {
                return res.status(404).json({ message: `User with id: ${req.params.id} not found` })
            };
            return res.json(user);

        }catch (error) {

            return res.status(500).json(error);

        }
    
    };
    
    public async delete(req: Request, res: Response) {
    
        try{
            if (req.body.loggedUser.role !== 'superadmin') {
                console.log(req.body.loggedUser)
                return res.status(403).json({ message: 'Forbidden' });
            }
            const user: UserDocument | null = await userService.delete(req.params.id);
            if(!user) {
               return res.status(404).json({ message: `User with id: ${req.params.id} not found` })
            };
            return res.json(user);

        }catch (error) {

           return res.status(500).json(error);

        }
    
    };

};

export default new userController;