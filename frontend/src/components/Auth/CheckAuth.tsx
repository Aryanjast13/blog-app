import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

const CheckAuth = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	if (!isAuthenticated) {
		return <Navigate to="/auth/login" state={{ from: location }} replace />;
	}

	return <>{children}</>;
};

export default CheckAuth;
