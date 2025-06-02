import { loginModel, registerModel } from "../models/authModel.js";

export const loginController = async (req, res) => {
    // Extraer email y password del cuerpo de la solicitud
    const { email, password } = req.body;
    // Validar que se proporcionen email y password
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    // sanitizar email
    const sanitizedEmail = email.trim().toLowerCase();
    try {
        // Llamar al modelo de inicio de sesión
        const result = await loginModel(sanitizedEmail, password);
        // Enviar respuesta exitosa
        return res.status(200).json(result);
    } catch (error) {
        if (error.message === "Invalid email or password") {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const registerController = async (req, res) => {
    // Extraer email y password del cuerpo de la solicitud
    const { email, password } = req.body;
    const role = "user";
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    // sanitizar email
    const sanitizedEmail = email.trim().toLowerCase();
    
    try {
        const result = await registerModel(sanitizedEmail, password, role);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}