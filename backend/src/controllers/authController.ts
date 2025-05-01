import bcrypt from "bcryptjs";
import { Request, RequestHandler, Response } from "express";
import {
	access_tokenOptions,
	generate_access_token,
} from "../jwt/generateJwt.js";
import UserModel from "../models/userModel.js";
import { loginSchema, userSchema } from "../validation/validation.js";

interface CustomRequest extends Request {
	user?: {
		id: string;
		email: string;
		username: string;
	};
}

export const register: RequestHandler = async (req: Request, res: Response) => {
	try {
		const { name, username, email, password  } = req.body;

		if (!userSchema.safeParse(req.body).success) {
			res.status(400).json({ success: false, message: "Invalid request body" });
			return;
		}

		const existingUser = await UserModel.getByEmailOrUsername(username, email);

		if (existingUser?.username === username) {
			res
				.status(400)
				.json({ success: false, message: "username already exists" });
			return;
		}

		if (existingUser?.email === email) {
			res.status(400).json({ success: false, message: "email already exists" });
			return;
		}

		// hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		await UserModel.createUser({
			name,
			username,
			email,
			password: hashedPassword,
		});

		res
			.status(201)
			.json({ success: true, message: "User registered successfully" });
	} catch (error) {
		res.status(500).json({ success: false, message: "Error registering user" });
	}
};

export const login: RequestHandler = async (req: Request, res: Response) => {
	try {
		const { email, username, password } = req.body;

		if (!email && !username) {
			res
				.status(400)
				.json({ success: false, message: "Email or username is required" });
			return;
		}

		if (!password) {
			res.status(400).json({ success: false, message: "Password is required" });
			return;
		}

		if (!loginSchema.safeParse(req.body).success) {
			res.status(400).json({ success: false, message: "Invalid request body" });
			return;
		}

		const existingUser = await UserModel.getByEmailOrUsername(username, email);

		if (!existingUser) {
			res.status(404).json({ success: false, message: "User not found" });
			return;
		}

		// Check password
		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordCorrect) {
			res.status(401).json({ success: false, message: "Invalid credentials" });
			return;
		}

		const user = {
			id: existingUser.id,
			name: existingUser.name,
			username: existingUser.username,
		};

		// Generate JWT token
		const access_token = generate_access_token(user);

		res
			.status(200)
			.cookie("access_token", access_token, access_tokenOptions)
			.json({
				success: true,
				data: user,
				message: "Login successful",
			});
	} catch (error) {
		res.status(500).json({ success: false, message: "Error logging in user" });
	}
};

export const logout: RequestHandler = async (req: Request, res: Response) => {
	res
		.status(200)
		.clearCookie("access_token")
		.json({ success: true, message: "Logout successful" });
};

export const profile: RequestHandler = async (
	req: CustomRequest,
	res: Response
) => {
	try {
		const user = req?.user;

		if (!user) {
			res.status(400).json({ message: "User not found", success: false });
			return;
		}

		// fetch user
		const getUser = await UserModel.getUserByUsername(user?.username);
		const profile = {
			name: getUser?.name,
			username: getUser?.username,
			email: getUser?.email,
			created_at: getUser?.created_at,
		};
		res.status(201).json({ data: profile, success: true });
	} catch (error) {
		res.status(500).json({ success: false, message: "Error logging in user" });
	}
};

export const getSessionHandler: RequestHandler = (
	req: CustomRequest,
	res: Response
) => {
	const user = req.user;
	res.status(200).json({ success: true, message: "Authenticated user", user });
};
