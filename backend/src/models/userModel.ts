import db from "../db/db.js";

export interface User {
	id?: number;
	name: string;
	username: string;
	email: string;
	password: string;
	created_at?: Date;
}

const UserModel = {
	async createUser(user: User): Promise<number> {
		const [result] = await db.query(
			"INSERT INTO Users (name, username, email, password) VALUES (?, ?, ?, ?)",
			[user.name, user.username, user.email, user.password]
		);
		return (result as any).insertId;
	},

	async getUserByEmail(email: string): Promise<User | null> {
		const [rows] = await db.query("SELECT * FROM Users WHERE email = ?", [
			email,
		]);
		const result = rows as User[];
		return result[0] || null;
	},

	async getUserByUsername(username: string): Promise<User | null> {
		const [rows] = await db.query("SELECT * FROM Users WHERE username = ?", [
			username,
		]);
		const result = rows as User[];
		return result[0] || null;
	},

	async getByEmailOrUsername(
		username: string,
		email: string
	): Promise<User | null> {
		const [rows] = await db.query(
			"SELECT * FROM Users WHERE email = ? OR username = ? LIMIT 1",
			[email, username]
		);
		const result = rows as User[];
		return result[0] || null;
	},
};

export default UserModel;
