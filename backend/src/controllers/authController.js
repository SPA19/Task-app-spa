import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generar JWT
const generateToken = (userId) => {
	return jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
};

// Registro
export const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		// Verificar si el usuario ya existe
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "El email ya está registrado" });
		}

		// Crear usuario
		const user = new User({ name, email, password });
		await user.save();

		// Generar token
		const token = generateToken(user._id);

		res.status(201).json({
			message: "Usuario registrado exitosamente",
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error al registrar usuario", error: error.message });
	}
};

// Login
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Buscar usuario
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "Credenciales inválidas" });
		}

		// Verificar contraseña
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(401).json({ message: "Credenciales inválidas" });
		}

		// Generar token
		const token = generateToken(user._id);

		res.json({
			message: "Login exitoso",
			token,
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error al iniciar sesión", error: error.message });
	}
};

// Obtener usuario actual
export const getCurrentUser = async (req, res) => {
	try {
		res.json({ user: req.user });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error al obtener usuario", error: error.message });
	}
};