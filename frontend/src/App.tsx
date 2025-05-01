import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import CheckAuth from "./components/Auth/CheckAuth";
import { useAuth } from "./components/hooks/useAuth";
import AuthLayout from "./components/Layout/AuthLayout";
import Layout from "./components/Layout/Layout";
import api from "./lib/api";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostCreate from "./pages/PostCreate";
import PostDetail from "./pages/PostDetail";
import PostEdit from "./pages/PostEdit";
import PostList from "./pages/PostList";
import Register from "./pages/Register";

function App() {
	const {
		isAuthenticated,
		setUser,
		setIsAuthenticated,
		setIsLoading,
		isLoading,
	} = useAuth();

	useEffect(() => {
		const getSession = async () => {
			try {
				const res = await api.get("/auth/get-session");
				if (res.data.success) {
					setUser(res.data.user);
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
				}
			} catch (error: any) {
				console.log("Session Fetch Error:", error.message);
				setIsAuthenticated(false);
			} finally {
				setIsLoading(false);
			}
		};

		getSession();
	}, []);

	if (isLoading) {
		return (
			<div className="h-dvh w-full flex justify-center items-center">
				loading ...
			</div>
		);
	}

	return (
		<Routes>
			{/* Authentication Routes */}
			<Route path="/auth" element={<AuthLayout />}>
				<Route
					path="login"
					element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}
				/>
				<Route
					path="register"
					element={
						!isAuthenticated ? <Register /> : <Navigate to="/" replace />
					}
				/>
			</Route>

			{/* Protected Main App */}
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="posts" element={<PostList />} />
				<Route path="posts/:id" element={<PostDetail />} />

				{/* Protected Routes */}
				<Route
					path="posts/create"
					element={
						<CheckAuth>
							<PostCreate />
						</CheckAuth>
					}
				/>
				<Route
					path="posts/:id/edit"
					element={
						<CheckAuth>
							<PostEdit />
						</CheckAuth>
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;
