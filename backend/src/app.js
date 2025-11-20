import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

// CORS configuración mejorada para producción
const corsOptions = {
	origin: process.env.FRONTEND_URL || "http://localhost:5173",
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true,
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
	res.json({
		message: "API funcionando correctamente",
		environment: process.env.NODE_ENV,
	});
});

// Manejo de errores global
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		message: "Algo salió mal!",
		error:
			process.env.NODE_ENV === "development"
				? err.message
				: "Error interno del servidor",
	});
});

export default app;