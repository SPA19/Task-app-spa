const FilterBar = ({ filters, onFilterChange, onSearchChange }) => {
	return (
		<div style={styles.container}>
			<div style={styles.searchContainer}>
				<input
					type="text"
					placeholder="🔍 Buscar tareas..."
					value={filters.search}
					onChange={(e) => onSearchChange(e.target.value)}
					style={styles.searchInput}
				/>
			</div>

			<div style={styles.filtersContainer}>
				<div style={styles.filterGroup}>
					<label style={styles.label}>Estado:</label>
					<select
						value={filters.status}
						onChange={(e) => onFilterChange("status", e.target.value)}
						style={styles.select}
					>
						<option value="">Todos</option>
						<option value="pending">Pendiente</option>
						<option value="in-progress">En Progreso</option>
						<option value="completed">Completada</option>
					</select>
				</div>

				<div style={styles.filterGroup}>
					<label style={styles.label}>Prioridad:</label>
					<select
						value={filters.priority}
						onChange={(e) => onFilterChange("priority", e.target.value)}
						style={styles.select}
					>
						<option value="">Todas</option>
						<option value="low">Baja</option>
						<option value="medium">Media</option>
						<option value="high">Alta</option>
					</select>
				</div>

				{(filters.status || filters.priority || filters.search) && (
					<button
						onClick={() => {
							onFilterChange("status", "");
							onFilterChange("priority", "");
							onSearchChange("");
						}}
						style={styles.clearButton}
					>
						🔄 Limpiar
					</button>
				)}
			</div>
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
	searchContainer: {
		marginBottom: "1rem",
	},
	searchInput: {
		width: "100%",
		padding: "0.75rem",
		border: "1px solid #ddd",
		borderRadius: "4px",
		fontSize: "1rem",
		boxSizing: "border-box",
	},
	filtersContainer: {
		display: "flex",
		gap: "1rem",
		flexWrap: "wrap",
		alignItems: "flex-end",
	},
	filterGroup: {
		display: "flex",
		flexDirection: "column",
		flex: 1,
		minWidth: "150px",
	},
	label: {
		marginBottom: "0.5rem",
		fontWeight: "500",
		color: "#555",
		fontSize: "0.9rem",
	},
	select: {
		padding: "0.75rem",
		border: "1px solid #ddd",
		borderRadius: "4px",
		fontSize: "1rem",
		cursor: "pointer",
		backgroundColor: "white",
	},
	clearButton: {
		padding: "0.75rem 1.5rem",
		backgroundColor: "#6c757d",
		color: "white",
		border: "none",
		borderRadius: "4px",
		fontSize: "0.9rem",
		cursor: "pointer",
		fontWeight: "500",
	},
};

export default FilterBar;