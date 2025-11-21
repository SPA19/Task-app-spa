import React from "react";

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
	const getPriorityColor = (priority) => {
		const colors = { low: "#28a745", medium: "#ffc107", high: "#dc3545" };
		return colors[priority] || "#6c757d";
	};

	const getStatusColor = (status) => {
		const colors = {
			pending: "#6c757d",
			"in-progress": "#007bff",
			completed: "#28a745",
		};
		return colors[status] || "#6c757d";
	};

	const getStatusLabel = (status) => {
		const labels = {
			pending: "Pendiente",
			"in-progress": "En Progreso",
			completed: "Completada",
		};
		return labels[status] || status;
	};

	const getPriorityLabel = (priority) => {
		const labels = { low: "Baja", medium: "Media", high: "Alta" };
		return labels[priority] || priority;
	};

	const formatDate = (date) => {
		if (!date) return null;
		return new Date(date).toLocaleDateString("es-ES", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	const handleDelete = () => {
		if (window.confirm("¿Estás seguro de eliminar esta tarea?")) {
			onDelete(task._id);
		}
	};

	return (
		<div style={styles.card}>
			<div style={styles.header}>
				<h3 style={styles.title}>{task.title}</h3>
				<div style={styles.badges}>
					<span
						style={{
							...styles.badge,
							backgroundColor: getPriorityColor(task.priority),
						}}
					>
						{getPriorityLabel(task.priority)}
					</span>
					<span
						style={{
							...styles.badge,
							backgroundColor: getStatusColor(task.status),
						}}
					>
						{getStatusLabel(task.status)}
					</span>
				</div>
			</div>

			{task.description && <p style={styles.description}>{task.description}</p>}

			{task.dueDate && (
				<p style={styles.dueDate}>📅 Vencimiento: {formatDate(task.dueDate)}</p>
			)}

			<div style={styles.actions}>
				<select
					value={task.status}
					onChange={(e) => onStatusChange(task._id, e.target.value)}
					style={styles.statusSelect}
				>
					<option value="pending">Pendiente</option>
					<option value="in-progress">En Progreso</option>
					<option value="completed">Completada</option>
				</select>

				<div style={styles.buttonGroup}>
					<button
						onClick={() => onEdit(task)}
						style={{ ...styles.button, ...styles.editButton }}
					>
						Editar
					</button>
					<button
						onClick={handleDelete}
						style={{ ...styles.button, ...styles.deleteButton }}
					>
						Eliminar
					</button>
				</div>
			</div>
		</div>
	);
};

const styles = {
	card: {
		backgroundColor: "white",
		borderRadius: "8px",
		padding: "1.5rem",
		boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
		marginBottom: "1rem",
	},
	header: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: "1rem",
		flexWrap: "wrap",
		gap: "0.5rem",
	},
	title: {
		margin: 0,
		color: "#333",
		fontSize: "1.25rem",
		flex: 1,
	},
	badges: {
		display: "flex",
		gap: "0.5rem",
		flexWrap: "wrap",
	},
	badge: {
		padding: "0.25rem 0.75rem",
		borderRadius: "12px",
		fontSize: "0.75rem",
		fontWeight: "600",
		color: "white",
		textTransform: "uppercase",
	},
	description: {
		color: "#666",
		marginBottom: "1rem",
		lineHeight: "1.5",
	},
	dueDate: {
		color: "#888",
		fontSize: "0.9rem",
		marginBottom: "1rem",
	},
	actions: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		gap: "1rem",
		flexWrap: "wrap",
		marginTop: "1rem",
		paddingTop: "1rem",
		borderTop: "1px solid #eee",
	},
	statusSelect: {
		padding: "0.5rem",
		border: "1px solid #ddd",
		borderRadius: "4px",
		fontSize: "0.9rem",
		cursor: "pointer",
		flex: 1,
		minWidth: "150px",
	},
	buttonGroup: {
		display: "flex",
		gap: "0.5rem",
	},
	button: {
		padding: "0.5rem 1rem",
		border: "none",
		borderRadius: "4px",
		fontSize: "0.9rem",
		cursor: "pointer",
		fontWeight: "500",
	},
	editButton: {
		backgroundColor: "#007bff",
		color: "white",
	},
	deleteButton: {
		backgroundColor: "#dc3545",
		color: "white",
	},
};

export default TaskCard;