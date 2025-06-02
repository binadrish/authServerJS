import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { v4 as uuidv4 } from 'uuid';
import { dbClient } from "../config/dbConnector.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta';


export const loginModel = async (email, password) => {
    try {
        // Obtener el usuario desde la base de datos
        const result = await dbClient.execute({
            sql: "SELECT * FROM user WHERE email = ?",
            args: [email],
        });

        // Verificar que no se encontró un usuario
        if (result.rows.length === 0) {
            throw new Error("Invalid email or password");
        }

        // Acceder a la primera fila de resultados
        const user = result.rows[0];

        // Comparar la contraseña proporcionada con la almacenada
        const isMatch = await comparePassword(password, user.password_hash);
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        // Generar un nuevo token de sesión (opcional, dependiendo de tu implementación)
        const sessionToken = uuidv4(); // Genera un token único para la sesión
        const tokenId = uuidv4(); // Genera un token único para la sesión
        const tokenType = "session";
        const tokenExpiration = new Date(Date.now() + 3600000); // Expira en 1 hora
        const tokenCreatedAt = new Date();
        const revokeToken = false; // Indica si el token debe ser revocado
        const userId = user.id;

        await dbClient.execute({
            sql: "INSERT INTO authTokens (id, tokenValue, type, expires_at, created_at, revoked, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
            args: [tokenId, sessionToken, tokenType, tokenExpiration, tokenCreatedAt, revokeToken, userId],
        });


        // guarar el token en un jwt y mandarlo al cliente
        // Crear el payload del JWT
        const payload = {
        userId: user.id,
        sessionToken: sessionToken,
        role: user.role // Incluye otros datos relevantes si es necesario
        };

        // Opciones del token, como el tiempo de expiración
        const options = {
        expiresIn: '1h' // El token expirará en 1 hora
        };

        // Generar el JWT
        const jwtToken = jwt.sign(payload, JWT_SECRET, options);


        // Inicio de sesión exitoso
        return { message: "Login successful", userId: user.id, token: jwtToken };
    } catch (error) {
        console.error("Login error:", error);
        throw new Error(error.message || "An error occurred during login");
    }
}

export const registerModel = async (email, password, role) => {
    try {
        // Verificar si el usuario ya existe
        const existingUser = await dbClient.execute({
            sql: "SELECT * FROM user WHERE email = ?",
            args: [email],
        });

        if (existingUser.rows.length > 0) {
            throw new Error("Email already registered");
        }

        // Hashear la contraseña
        const hashedPassword = await hashPassword(password);
        const createdAt = new Date();

        // Insertar el nuevo usuario en la base de datos
        const userId = uuidv4(); // Generar un ID único para el usuario
        await dbClient.execute({
            sql: "INSERT INTO user (id, email, password_hash, created_at, is_active, role) VALUES (?, ?, ?, ?, ?, ?)",
            args: [userId, email, hashedPassword, createdAt, true,role],
        });

        return { message: "User registered successfully", userId };
    } catch (error) {
        console.error("Registration error:", error);
        throw new Error(error.message || "An error occurred during registration");
    }
}
