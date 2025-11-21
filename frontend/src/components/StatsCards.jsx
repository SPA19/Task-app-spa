const StatsCards = ({ stats }) => {
	const getStatsCount = (status) => {
		const stat = stats.stats?.find((s) => s._id === status);
		return stat ? stat.count : 0;
	};

	return (
		<div style={styles.container}>
			<div style={{ ...styles.card, ...styles.total }}>
				<p style={styles.label}>Total</p>
				<p style={styles.value}>{stats.total || 0}</p>
			</div>
			<div style={{ ...styles.card, ...styles.pending }}>
				<p style={styles.label}>Pendientes</p>
				<p style={styles.value}>{getStatsCount("pending")}</p>
			</div>
			<div style={{ ...styles.card, ...styles.progress }}>
				<p style={styles.label}>En Progreso</p>
				<p style={styles.value}>{getStatsCount("in-progress")}</p>
			</div>
			<div style={{ ...styles.card, ...styles.completed }}>
				<p style={styles.label}>Completadas</p>
				<p style={styles.value}>{getStatsCount("completed")}</p>
			</div>
		</div>
	);
};

const styles = {
	container: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
		gap: "1rem",
		marginBottom: "2rem",
	},
	card: {
		backgroundColor: "white",
		borderRadius: "8px",
		padding: "1.5rem",
		boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
		textAlign: "center",
		borderLeft: "4px solid",
	},
	total: { borderLeftColor: "#6c757d" },
	pending: { borderLeftColor: "#fc0101ff" },
	progress: { borderLeftColor: "#007bff" },
	completed: { borderLeftColor: "#28a745" },
	label: {
		margin: 0,
		color: "#666",
		fontSize: "0.9rem",
		fontWeight: "500",
		textTransform: "uppercase",
		marginBottom: "0.5rem",
	},
	value: {
		margin: 0,
		color: "#333",
		fontSize: "2rem",
		fontWeight: "bold",
	},
};

export default StatsCards;