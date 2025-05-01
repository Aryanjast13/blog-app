import authContext from "@/context/authContext";
import { useContext } from "react";

export const useAuth = () => {
	const context = useContext(authContext);
	if (!context) {
		throw new Error("useAuth must be used inside AuthContextProvider");
	}
	return context;
};
