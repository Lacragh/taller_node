import express, { Request, Response } from "express";

class postController {

    public create(req: Request, res: Response) {

        res.status(201).send("create post")
    
    };
    
    public get(req: Request, res: Response) {
    
        res.send('get post with id ${req.params.id}')
    
    };
    
    public getAll(req: Request, res: Response) {
    
        res.send("get posts")
    
    };

    public update(req: Request, res: Response) {
    
        res.send('update post with id ${req.params.id}')
    
    };
    
    public delete(req: Request, res: Response) {
    
        res.send("delete post with id ${req.params.id}")
    
    };

};

export default new postController;