import UserModel, {UserDocument, UserInput}  from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

class UserService {

    public async create(userInput: UserInput): Promise<UserDocument> {
        try {
            const userExists: UserDocument | null = await this.findByEmail(userInput.email);
            if(userExists)
                 throw  new ReferenceError("User already exists");

            userInput.password = await bcrypt.hash(userInput.password, 10);

            const  user = await  UserModel.create(userInput);
            return user;
        } catch (error) {
           throw error; 
        }
    }

    public async login(userInput:any): Promise<any>{
        try{
            const userExists = await this.findByEmail(userInput.email);
            if(!userExists)
                throw new ReferenceError("User does not exists");
            const isMatch : boolean = await bcrypt.compare(userInput.password, userExists.password);
            if(!isMatch)
                throw new ReferenceError("Not authorized");
            const token = this.generateToken(userExists);
            return {email:userExists.email, name:userExists.name, token:token};
        }
        catch (error){
            throw error;
        }
    }


    public async findByEmail(email: string): Promise<UserDocument | null > {
        try {
            const  user = await  UserModel.findOne({email});
            return user;
        } catch (error) {
           throw error; 
        }
    }

    public async findAll(): Promise<UserDocument[] > {
        try {
            const  users = await  UserModel.find();
            return users;
        } catch (error) {
           throw error; 
        }
    }    

    public async findById(id: string): Promise<UserDocument | null > {
        try {
            const  user = await  UserModel.findById(id);
            return user;
        } catch (error) {
           throw error; 
        }
    }

    public async update(id: string, userInput: UserInput): Promise<UserDocument | null> {
        try {
            const  user: UserDocument | null = await  UserModel.findOneAndUpdate({_id: id}, userInput, {returnOriginal: false});
            return user;            
        } catch (error) {
           throw error; 
        }
    }

    public generateToken(user: UserDocument): string {
        return jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );
    }


    public async delete(id: string): Promise<UserDocument | null> {
        try {
            const  user: UserDocument | null = await  UserModel.findByIdAndDelete(id);
            return user;            
        } catch (error) {
           throw error; 
        }
    }    
}

export default new UserService();