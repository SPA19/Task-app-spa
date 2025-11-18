import express from "express";
import {
	getTasks,
	getTaskById,
	createTask,
	updateTask,
	deleteTask,
	getStats,
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

router.get("/", getTasks);
router.get("/stats", getStats);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;