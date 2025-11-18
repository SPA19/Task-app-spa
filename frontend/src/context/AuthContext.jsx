import { createContext, useContext, useState, useEffect } from "react";
import {
	getCurrentUser,
	login as loginAPI,
	register as registerAPI,
} from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		checkAuth();
	}, []);

	const checkAuth = async () => {
		try {
			const token = localStorage.getItem("token");
			if (token) {
				const response = await getCurrentUser();
				setUser(response.data.user);
			}
		} catch (error) {
			localStorage.removeItem("token");
		} finally {
			setLoading(false);
		}
	};

	const login = async (credentials) => {
		try {
			const response = await loginAPI(credentials);
			localStorage.setItem("token", response.data.token);
			setUser(response.data.user);
			return { success: true };
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.message || "Error al iniciar sesión",
			};
		}
	};

	const register = async (userData) => {
		try {
			const response = await registerAPI(userData);
			localStorage.setItem("token", response.data.token);
			setUser(response.data.user);
			return { success: true };
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.message || "Error al registrar",
			};
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				login,
				register,
				logout,
				isAuthenticated: !!user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};