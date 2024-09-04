import UserModel, { UserDocument, UserInput } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {

    // Crea un nuevo usuario después de verificar que no exista uno con el mismo correo electrónico
    public async create(userInput: UserInput): Promise<UserDocument> {
        try {
            const userExists: UserDocument | null = await this.findByEmail(userInput.email);
            if (userExists) 
                throw new ReferenceError("User already exists");

            // Encripta la contraseña antes de guardarla
            userInput.password = await bcrypt.hash(userInput.password, 10);

            const user = await UserModel.create(userInput);
            return user;
        } catch (error) {
            throw error;  // Propaga cualquier error que ocurra
        }
    }

    // Realiza el login del usuario, valida las credenciales y genera un token JWT si es válido
    public async login(userInput: any): Promise<any> {
        try {
            const userExists = await this.findByEmail(userInput.email);
            if (!userExists) 
                throw new ReferenceError("User does not exists");

            const isMatch: boolean = await bcrypt.compare(userInput.password, userExists.password);
            if (!isMatch) 
                throw new ReferenceError("Not authorized");

            // Genera un token JWT para el usuario
            const token = this.generateToken(userExists);
            return { email: userExists.email, name: userExists.name, token: token };
        } catch (error) {
            throw error;  // Propaga cualquier error que ocurra
        }
    }

    // Busca un usuario por su correo electrónico
    public async findByEmail(email: string): Promise<UserDocument | null> {
        try {
            const user = await UserModel.findOne({ email });
            return user;
        } catch (error) {
            throw error;  // Propaga cualquier error que ocurra
        }
    }

    // Recupera todos los usuarios de la base de datos
    public async findAll(): Promise<UserDocument[]> {
        try {
            const users = await UserModel.find();
            return users;
        } catch (error) {
            throw error;  // Propaga cualquier error que ocurra
        }
    }

    // Busca un usuario por su ID
    public async findById(id: string): Promise<UserDocument | null> {
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (error) {
            throw error;  // Propaga cualquier error que ocurra
        }
    }

    // Actualiza un usuario existente por su ID
    public async update(id: string, userInput: UserInput): Promise<UserDocument | null> {
        try {
            const user: UserDocument | null = await UserModel.findOneAndUpdate(
                { _id: id }, 
                userInput, 
                { returnOriginal: false }  // Retorna el documento actualizado
            );
            return user;
        } catch (error) {
            throw error;  // Propaga cualquier error que ocurra
        }
    }

    // Genera un token JWT para el usuario
    public generateToken(user: UserDocument): string {
        return jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET!,  // Clave secreta para firmar el token
            { expiresIn: '1h' }  // Expira en 1 hora
        );
    }

    // Elimina un usuario por su ID
    public async delete(id: string): Promise<UserDocument | null> {
        try {
            const user: UserDocument | null = await UserModel.findByIdAndDelete(id);
            return user;
        } catch (error) {
            throw error;  // Propaga cualquier error que ocurra
        }
    }
}

export default new UserService();
