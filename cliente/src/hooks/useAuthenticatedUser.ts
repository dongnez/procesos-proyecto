import { useAuth } from "src/context/AuthProvider";

export function useAuthenticatedUser() {
	const { user } = useAuth();
  
	if (user === null) {
	  throw new Error('User must be authenticated to access this resource');
	}
  
	return {user};
  }