import { useState, useEffect } from "react";

const TaskForm = ({ taskToEdit, onSubmit, onCancel }) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		status: "pending",
		priority: "medium",
		dueDate: "",
	});

	useEffect(() => {
		if (taskToEdit) {
			setFormData({
				title: taskToEdit.title || "",
				description: taskToEdit.description || "",
				status: taskToEdit.status || "pending",
				priority: taskToEdit.priority || "medium",
				dueDate: taskToEdit.dueDate
					? new Date(taskToEdit.dueDate).toISOString().split("T")[0]
					: "",
			});
		}
	}, [taskToEdit]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
		if (!taskToEdit) {
			setFormData({
				title: "",
				description: "",
				status: "pending",
				priority: "medium",
				dueDate: "",
			});
		}
	};

	return (
		<div style={styles.container}>
			<h3 style={styles.title}>
				{taskToEdit ? "✏️ Editar Tarea" : "➕ Nueva Tarea"}
			</h3>

			<form
				onSubmit={handleSubmit}
				style={styles.form}
			>
				<div style={styles.formGroup}>
					<label style={styles.label}>Título *</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						required
						style={styles.input}
						placeholder="Título de la tarea"
					/>
				</div>

				<div style={styles.formGroup}>
					<label style={styles.label}>Descripción</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
						style={{ ...styles.input, ...styles.textarea }}
						placeholder="Describe la tarea (opcional)"
						rows="3"
					/>
				</div>

				<div style={styles.row}>
					<div style={styles.formGroup}>
						<label style={styles.label}>Estado</label>
						<select
							name="status"
							value={formData.status}
							onChange={handleChange}
							style={styles.select}
						>
							<option value="pending">Pendiente</option>
							<option value="in-progress">En Progreso</option>
							<option value="completed">Completada</option>
						</select>
					</div>

					<div style={styles.formGroup}>
						<label style={styles.label}>Prioridad</label>
						<select
							name="priority"
							value={formData.priority}
							onChange={handleChange}
							style={styles.select}
						>
							<option value="low">Baja</option>
							<option value="medium">Media</option>
							<option value="high">Alta</option>
						</select>
					</div>
				</div>

				<div style={styles.formGroup}>
					<label style={styles.label}>Fecha de Vencimiento</label>
					<input
						type="date"
						name="dueDate"
						value={formData.dueDate}
						onChange={handleChange}
						style={styles.input}
					/>
				</div>

				<div style={styles.buttonGroup}>
					<button
						type="submit"
						style={{ ...styles.button, ...styles.submitButton }}
					>
						{taskToEdit ? "💾 Guardar Cambios" : "➕ Crear Tarea"}
					</button>
					{taskToEdit && (
						<button
							type="button"
							onClick={onCancel}
							style={{ ...styles.button, ...styles.cancelButton }}
						>
							❌ Cancelar
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

const styles = {
	container: {
		backgroundColor: "white",
		borderRadius: "8px",
		padding: "1.5rem",
		boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
		marginBottom: "2rem",
	},
	title: {
		marginTop: 0,
		marginBottom: "1.5rem",
		color: "#333",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
	},
	formGroup: {
		display: "flex",
		flexDirection: "column",
		flex: 1,
	},
	label: {
		marginBottom: "0.5rem",
		fontWeight: "500",
		color: "#555",
		fontSize: "0.9rem",
	},
	input: {
		padding: "0.75rem",
		border: "1px solid #ddd",
		borderRadius: "4px",
		fontSize: "1rem",
	},
	textarea: {
		resize: "vertical",
		minHeight: "80px",
		fontFamily: "inherit",
	},
	select: {
		padding: "0.75rem",
		border: "1px solid #ddd",
		borderRadius: "4px",
		fontSize: "1rem",
		cursor: "pointer",
		backgroundColor: "white",
	},
	row: {
		display: "flex",
		gap: "1rem",
	},
	buttonGroup: {
		display: "flex",
		gap: "1rem",
		marginTop: "0.5rem",
	},
	button: {
		padding: "0.75rem 1.5rem",
		border: "none",
		borderRadius: "4px",
		fontSize: "1rem",
		cursor: "pointer",
		fontWeight: "500",
	},
	submitButton: {
		backgroundColor: "#28a745",
		color: "white",
		flex: 1,
	},
	cancelButton: {
		backgroundColor: "#6c757d",
		color: "white",
	},
};

export default TaskForm;