import { createContext } from "react";

export interface AuthContextType {
	user: any;
	isAuthenticated: boolean;
	setIsAuthenticated: (value: boolean) => void;
	setUser: (value: boolean) => void;
	handleLogout: () => void;
	isLoading: boolean;
	setIsLoading: (value: boolean) => void;
}
const authContext = createContext<AuthContextType | null>(null);

export default authContext;
