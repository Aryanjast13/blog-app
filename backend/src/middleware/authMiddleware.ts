import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../models/userModel.js";

export interface CustomRequest extends Request {
	user?: {
		id: string;
		email: string;
		username: string;
	};
}

const authMiddleware = async (
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.cookies.access_token;

	if (!token) {
		res
			.status(401)
			.json({ success: false, message: "Unauthenticated: No token provided" });
		return;
	}

	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		) as JwtPayload;

		if (!decoded.user) {
			res
				.status(401)
				.json({ success: false, message: "Unauthenticated: Invalid token" });
			return;
		}

		const user = await UserModel.getUserByUsername(decoded.user.username);

		if (!user) {
			res
				.status(401)
				.json({ success: false, message: "Unauthenticated: User not found" });
			return;
		}

		req.user = decoded.user;

		next();
	} catch (error: any) {
		res.status(401).json({
			success: false,
			message: "Unauthenticated: Token verification failed",
		});
	}
};

export default authMiddleware;
