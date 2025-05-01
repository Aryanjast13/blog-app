import { useAuth } from "@/components/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import React, { useState } from "react";
import { Link } from "react-router";

const Login = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const { setIsAuthenticated, setUser } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await api.post("/auth/login", formData);
			setIsAuthenticated(res.data?.success);
			setUser(res.data?.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
    <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
      >
        <div className="p-8 pb-6 ">
          <div>
            <h1 className="mb-1 mt-4 text-xl font-semibold">
              Login to Continue
            </h1>
            <p className="text-sm mb-4">Welcome back! Login to continue</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="block text-sm">
                Username
              </Label>
              <Input
                autoComplete="on"
                value={formData?.username}
                onChange={handleChange}
                type="text"
                required
                name="username"
                id="username"
              />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-title text-sm">
                  Password
                </Label>
              </div>
              <Input
                autoComplete="on"
                value={formData?.password}
                onChange={handleChange}
                type="password"
                required
                name="password"
                id="password"
                className="input sz-md variant-mixed"
              />
            </div>

            <Button className="w-full cursor-pointer">Login</Button>
          </div>
        </div>

        <div className="bg-muted rounded-(--radius) border p-3">
          <p className="text-accent-foreground text-center text-sm">
            Don't have an account ?<Link to="/auth/register">Register</Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;
