import api from "@/lib/api";
import React, { useState } from "react";
import AuthContext from "./authContext";

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [user, setUser] = useState(false);

	const handleLogout = async () => {
		try {
			await api.post("/auth/logout");
		} catch (error) {
			console.log(error);
		} finally {
			setUser(false);
			setIsAuthenticated(false);
			setIsLoading(false);
		}
	};
	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				user,
				setUser,
				handleLogout,
				isLoading,
				setIsLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
