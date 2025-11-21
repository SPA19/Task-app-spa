import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
	getTasks,
	createTask,
	updateTask,
	deleteTask,
	getStats,
} from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import FilterBar from "../components/FilterBar";
import StatsCards from "../components/StatsCards";

const Dashboard = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const [tasks, setTasks] = useState([]);
	const [stats, setStats] = useState({ total: 0, stats: [] });
	const [loading, setLoading] = useState(true);
	const [taskToEdit, setTaskToEdit] = useState(null);
	const [filters, setFilters] = useState({
		status: "",
		priority: "",
		search: "",
	});

	useEffect(() => {
		fetchTasks();
		fetchStats();
	}, [filters]);

	const fetchTasks = async () => {
		try {
			setLoading(true);
			const response = await getTasks(filters);
			setTasks(response.data.tasks);
		} catch (error) {
			console.error("Error al obtener tareas:", error);
			alert("Error al cargar las tareas");
		} finally {
			setLoading(false);
		}
	};

	const fetchStats = async () => {
		try {
			const response = await getStats();
			setStats(response.data);
		} catch (error) {
			console.error("Error al obtener estadísticas:", error);
		}
	};

	const handleCreateTask = async (taskData) => {
		try {
			await createTask(taskData);
			fetchTasks();
			fetchStats();
			alert("✅ Tarea creada exitosamente");
		} catch (error) {
			console.error("Error al crear tarea:", error);
			alert("❌ Error al crear la tarea");
		}
	};

	const handleUpdateTask = async (taskData) => {
		try {
			await updateTask(taskToEdit._id, taskData);
			fetchTasks();
			fetchStats();
			setTaskToEdit(null);
			alert("✅ Tarea actualizada exitosamente");
		} catch (error) {
			console.error("Error al actualizar tarea:", error);
			alert("❌ Error al actualizar la tarea");
		}
	};

	const handleDeleteTask = async (taskId) => {
		try {
			await deleteTask(taskId);
			fetchTasks();
			fetchStats();
			alert("✅ Tarea eliminada exitosamente");
		} catch (error) {
			console.error("Error al eliminar tarea:", error);
			alert("❌ Error al eliminar la tarea");
		}
	};

	const handleStatusChange = async (taskId, newStatus) => {
		try {
			const task = tasks.find((t) => t._id === taskId);
			await updateTask(taskId, { ...task, status: newStatus });
			fetchTasks();
			fetchStats();
		} catch (error) {
			console.error("Error al cambiar estado:", error);
			alert("❌ Error al cambiar el estado");
		}
	};

	const handleEdit = (task) => {
		setTaskToEdit(task);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleCancelEdit = () => {
		setTaskToEdit(null);
	};

	const handleFilterChange = (filterName, value) => {
		setFilters({ ...filters, [filterName]: value });
	};

	const handleSearchChange = (value) => {
		setFilters({ ...filters, search: value });
	};

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<div style={styles.container}>
			<header style={styles.header}>
				<div style={styles.headerContent}>
					<div>
						<h1 style={styles.appTitle}>📝TaskApp</h1>
						<p style={styles.greeting}>Hola, {user?.name}! 👋</p>
					</div>
					<button
						onClick={handleLogout}
						style={styles.logoutButton}
					>
						Cerrar Sesión
					</button>
				</div>
			</header>

			<main style={styles.main}>
				<StatsCards stats={stats} />

				<TaskForm
					taskToEdit={taskToEdit}
					onSubmit={taskToEdit ? handleUpdateTask : handleCreateTask}
					onCancel={handleCancelEdit}
				/>

				<FilterBar
					filters={filters}
					onFilterChange={handleFilterChange}
					onSearchChange={handleSearchChange}
				/>

				<TaskList
					tasks={tasks}
					loading={loading}
					onEdit={handleEdit}
					onDelete={handleDeleteTask}
					onStatusChange={handleStatusChange}
				/>
			</main>
			<footer style={styles.footer}>
				<p>
					© 2025 Administracion de tareas personales con Vite + React • Desarrollado
					por Simón Posada Acosta
				</p>
			</footer>
		</div>
	);
};

const styles = {
	container: {
		minHeight: "100vh",
		backgroundColor: "#d3e7f9ff", // Fondo general gris claro
	},

	header: {
		background: "linear-gradient(90deg, #000080, #87CEEB)",
		color: "white",
		boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
		padding: "1rem 0",
	},

	headerContent: {
		maxWidth: "1200px",
		margin: "0 auto",
		padding: "0 1rem",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flexWrap: "wrap",
		gap: "1rem",
	},

	appTitle: {
		margin: 0,
		color: "white",
		fontSize: "1.75rem",
	},

	greeting: {
		margin: "0.5rem 0 0 0",
		color: "#E8ECFF", // Azul muy claro para buen contraste
		fontSize: "0.9rem",
	},

	logoutButton: {
		padding: "0.75rem 1.5rem",
		backgroundColor: "#00008B", // Botón rojo elegante
		color: "white",
		border: "none",
		borderRadius: "4px",
		cursor: "pointer",
		fontWeight: "500",
		fontSize: "0.9rem",
		transition: "background 0.2s ease",
	},

	logoutButtonHover: {
		backgroundColor: "#333", // Hover más oscuro
	},

	main: {
		maxWidth: "1200px",
		margin: "2rem auto",
		padding: "0 1rem",
	},

	footer: {
		backgroundColor: "#1F1F1F",
		color: "white",
		textAlign: "center",
		padding: "25px",
		marginTop: "45px",
	},
};

export default Dashboard;