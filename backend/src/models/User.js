import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "El nombre es requerido"],
			trim: true,
		},
		email: {
			type: String,
			required: [true, "El email es requerido"],
			unique: true,
			lowercase: true,
			trim: true,
			match: [/^\S+@\S+\.\S+$/, "Por favor ingresa un email válido"],
		},
		password: {
			type: String,
			required: [true, "La contraseña es requerida"],
			minlength: 6,
		},
	},
	{
		timestamps: true,
	}
);

// Hash password antes de guardar
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		next(error);
	}
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;