import zod from "zod";

const userSchema = zod.object({
	name: zod.string(),
	username: zod.string(),
	email: zod.string().email(),
	password: zod.string(),
	confirmPassword: zod.string(),
});

const loginSchema = zod.object({
	email: zod.string().email().optional(),
	username: zod.string().optional(),
	password: zod.string(),
});

const postSchema = zod.object({
	title: zod.string(),
	content: zod.string(),
});

export { loginSchema, userSchema };
