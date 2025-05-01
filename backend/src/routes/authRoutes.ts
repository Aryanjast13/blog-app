import express, { Router } from "express";
import {
	getSessionHandler,
	login,
	logout,
	profile,
	register,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const authRoutes: Router = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/profile", authMiddleware, profile);
authRoutes.get("/get-session", authMiddleware, getSessionHandler);

export default authRoutes;
