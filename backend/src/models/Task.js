import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "El título es requerido"],
			trim: true,
		},
		description: {
			type: String,
			trim: true,
			default: "",
		},
		status: {
			type: String,
			enum: ["pending", "in-progress", "completed"],
			default: "pending",
		},
		priority: {
			type: String,
			enum: ["low", "medium", "high"],
			default: "medium",
		},
		dueDate: {
			type: Date,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

// Índices para búsquedas más rápidas
taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ title: "text", description: "text" });

const Task = mongoose.model("Task", taskSchema);

export default Task;