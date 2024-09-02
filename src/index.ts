import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';

import { router } from './routes/posts';
import { router as user } from './routes/user';
import { router as comment } from './routes/comment';
import { router as reaction } from './routes/reaction';
import { db } from './config/db'

dotenv.config();
console.log(process.env.DBPASS);

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response)=>{

    res.send('Hello World');

});

app.use('/api/v1/posts', router);
app.use('/api/v1/user', user);
app.use('/api/v1/comment', comment);
app.use('/api/v1/reaction', reaction);

db.then( () => {

    app.listen(port, ()=> {

        console.log(`Server is running on port ${port}`);
    
    });

});