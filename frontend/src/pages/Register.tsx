import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router"; 

const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			alert("Passwords do not match.");
			return;
		}

		try {
			const res = await api.post("/auth/register", formData);
		
			if (res.data?.success) {
				navigate("/auth/login");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<section className="flex h-dvh bg-zinc-50 px-4 dark:bg-transparent">
			<form
				onSubmit={handleSubmit}
				className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
			>
				<div className="p-8 pb-6">
					<div>
						<h1 className="text-title mb-1 mt-4 text-xl font-semibold">
							Create a New Account
						</h1>
						<p className="text-sm mb-2">
							Welcome! Create an account to get started
						</p>
					</div>

					<div className="space-y-5">
						<div className="space-y-2">
							<Label htmlFor="name" className="block text-sm">
								Name
							</Label>
							<Input
								onChange={handleChange}
								value={formData.name}
								type="text"
								required
								name="name"
								id="name"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="username" className="block text-sm">
								Username
							</Label>
							<Input
								onChange={handleChange}
								value={formData.username}
								type="text"
								required
								name="username"
								id="username"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email" className="block text-sm">
								Email
							</Label>
							<Input
								onChange={handleChange}
								value={formData.email}
								type="email"
								required
								name="email"
								id="email"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password" className="text-title text-sm">
								Password
							</Label>
							<Input
								onChange={handleChange}
								value={formData.password}
								type="password"
								required
								name="password"
								id="password"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="confirmPassword" className="text-title text-sm">
								Confirm Password
							</Label>
							<Input
								onChange={handleChange}
								value={formData.confirmPassword}
								type="password"
								required
								name="confirmPassword"
								id="confirmPassword"
							/>
						</div>

						<Button type="submit" className="w-full">
							Register
						</Button>
					</div>
				</div>

				<div className="bg-muted rounded-[var(--radius)] border p-3">
					<p className="text-accent-foreground text-center text-sm">
						Have an account?{" "}
						<Link to="/auth/login" className="text-primary underline">
							Login
						</Link>
					</p>
				</div>
			</form>
		</section>
	);
};

export default Register;
