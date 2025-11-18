import Task from "../models/Task.js";

// Obtener todas las tareas del usuario
export const getTasks = async (req, res) => {
	try {
		const { status, priority, search } = req.query;

		// Construir filtro
		const filter = { userId: req.user._id };

		if (status) filter.status = status;
		if (priority) filter.priority = priority;
		if (search) {
			filter.$or = [
				{ title: { $regex: search, $options: "i" } },
				{ description: { $regex: search, $options: "i" } },
			];
		}

		const tasks = await Task.find(filter).sort({ createdAt: -1 });

		res.json({ tasks, count: tasks.length });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error al obtener tareas", error: error.message });
	}
};

// Obtener una tarea específica
export const getTaskById = async (req, res) => {
	try {
		const task = await Task.findOne({
			_id: req.params.id,
			userId: req.user._id,
		});

		if (!task) {
			return res.status(404).json({ message: "Tarea no encontrada" });
		}

		res.json({ task });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error al obtener tarea", error: error.message });
	}
};

// Crear tarea
export const createTask = async (req, res) => {
	try {
		const { title, description, status, priority, dueDate } = req.body;

		const task = new Task({
			title,
			description,
			status,
			priority,
			dueDate,
			userId: req.user._id,
		});

		await task.save();

		res.status(201).json({
			message: "Tarea creada exitosamente",
			task,
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error al crear tarea", error: error.message });
	}
};

// Actualizar tarea
export const updateTask = async (req, res) => {
	try {
		const { title, description, status, priority, dueDate } = req.body;

		const task = await Task.findOneAndUpdate(
			{ _id: req.params.id, userId: req.user._id },
			{ title, description, status, priority, dueDate },
			{ new: true, runValidators: true }
		);

		if (!task) {
			return res.status(404).json({ message: "Tarea no encontrada" });
		}

		res.json({
			message: "Tarea actualizada exitosamente",
			task,
		});
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error al actualizar tarea", error: error.message });
	}
};

// Eliminar tarea
export const deleteTask = async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({
			_id: req.params.id,
			userId: req.user._id,
		});

		if (!task) {
			return res.status(404).json({ message: "Tarea no encontrada" });
		}

		res.json({ message: "Tarea eliminada exitosamente" });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error al eliminar tarea", error: error.message });
	}
};

// Obtener estadísticas
export const getStats = async (req, res) => {
	try {
		const userId = req.user._id;

		const stats = await Task.aggregate([
			{ $match: { userId } },
			{
				$group: {
					_id: "$status",
					count: { $sum: 1 },
				},
			},
		]);

		const total = await Task.countDocuments({ userId });

		res.json({ stats, total });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error al obtener estadísticas", error: error.message });
	}
};