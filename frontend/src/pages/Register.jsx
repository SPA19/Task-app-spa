import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { register } = useAuth();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (formData.password.length < 6) {
			setError("La contraseña debe tener al menos 6 caracteres");
			return;
		}

		setLoading(true);
		const result = await register(formData);
		setLoading(false);
		if (result.success) {
			navigate("/dashboard");
		} else {
			setError(result.error);
		}
	};

	return (
		<div style={styles.container}>
			<div style={styles.card}>
				<h2 style={styles.title}>Crear Cuenta</h2>
				{error && <div style={styles.error}>{error}</div>}

				<form
					onSubmit={handleSubmit}
					style={styles.form}
				>
					<div style={styles.formGroup}>
						<label style={styles.label}>Nombre</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							style={styles.input}
							placeholder="Tu nombre"
						/>
					</div>

					<div style={styles.formGroup}>
						<label style={styles.label}>Email</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							style={styles.input}
							placeholder="tu@email.com"
						/>
					</div>

					<div style={styles.formGroup}>
						<label style={styles.label}>Contraseña</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
							style={styles.input}
							placeholder="Mínimo 6 caracteres"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						style={styles.button}
					>
						{loading ? "Cargando..." : "Registrarse"}
					</button>
				</form>

				<p style={styles.footer}>
					¿Ya tienes cuenta?{" "}
					<Link
						to="/login"
						style={styles.link}
					>
						Inicia sesión
					</Link>
				</p>
			</div>
		</div>
	);
};

const styles = {
	container: {
		minHeight: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f5f5f5",
	},
	card: {
		backgroundColor: "white",
		padding: "2rem",
		borderRadius: "8px",
		boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
		width: "100%",
		maxWidth: "400px",
	},
	title: {
		textAlign: "center",
		marginBottom: "1.5rem",
		color: "#333",
	},
	error: {
		backgroundColor: "#fee",
		color: "#c33",
		padding: "0.75rem",
		borderRadius: "4px",
		marginBottom: "1rem",
		fontSize: "0.9rem",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
	},
	formGroup: {
		display: "flex",
		flexDirection: "column",
	},
	label: {
		marginBottom: "0.5rem",
		fontWeight: "500",
		color: "#555",
	},
	input: {
		padding: "0.75rem",
		border: "1px solid #ddd",
		borderRadius: "4px",
		fontSize: "1rem",
	},
	button: {
		padding: "0.75rem",
		backgroundColor: "#28a745",
		color: "white",
		border: "none",
		borderRadius: "4px",
		fontSize: "1rem",
		cursor: "pointer",
		fontWeight: "500",
		marginTop: "0.5rem",
	},
	footer: {
		textAlign: "center",
		marginTop: "1.5rem",
		color: "#666",
	},
	link: {
		color: "#007bff",
		textDecoration: "none",
	},
};

export default Register;