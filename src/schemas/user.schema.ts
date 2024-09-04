import { object, string } from 'zod';

// Esquema de validación Zod para los datos de un usuario
const userSchema = object({
    name: string({ required_error: "Name is required" }),  // Nombre del usuario, obligatorio
    email: string({ required_error: "Email is required" })  // Correo electrónico, obligatorio y debe ser una dirección de correo válida
        .email("Not a valid email address"),  // Valida que el correo electrónico tenga un formato correcto
    password: string({ required_error: "Password is required" })  // Contraseña, obligatoria
        .min(8, "Password must be at least 8 characters long")  // Valida que la contraseña tenga al menos 8 caracteres
});

export default userSchema;
