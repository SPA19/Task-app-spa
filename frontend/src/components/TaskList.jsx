import TaskCard from "./TaskCard";

const TaskList = ({ tasks, loading, onEdit, onDelete, onStatusChange }) => {
	if (loading) {
		return (
			<div style={styles.loading}>
				<p>⏳ Cargando tareas...</p>
			</div>
		);
	}

	if (tasks.length === 0) {
		return (
			<div style={styles.empty}>
				<p style={styles.emptyText}>📝 No hay tareas para mostrar</p>
				<p style={styles.emptySubtext}>
					Crea tu primera tarea usando el formulario de arriba
				</p>
			</div>
		);
	}

	return (
		<div style={styles.container}>
			<h3 style={styles.title}>📋 Mis Tareas ({tasks.length})</h3>
			<div style={styles.grid}>
				{tasks.map((task) => (
					<TaskCard
						key={task._id}
						task={task}
						onEdit={onEdit}
						onDelete={onDelete}
						onStatusChange={onStatusChange}
					/>
				))}
			</div>
		</div>
	);
};

const styles = {
	container: {
		marginBottom: "2rem",
	},
	title: {
		color: "#333",
		fontSize: "1.5rem",
		marginBottom: "1rem",
	},
	grid: {
		display: "grid",
		gap: "1rem",
	},
	loading: {
		textAlign: "center",
		padding: "3rem",
		backgroundColor: "white",
		borderRadius: "8px",
		boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
	},
	empty: {
		textAlign: "center",
		padding: "3rem",
		backgroundColor: "white",
		borderRadius: "8px",
		boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
	},
	emptyText: {
		fontSize: "1.25rem",
		color: "#666",
		marginBottom: "0.5rem",
	},
	emptySubtext: {
		color: "#999",
		fontSize: "0.9rem",
	},
};

export default TaskList;