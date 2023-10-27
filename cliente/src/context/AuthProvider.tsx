import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { databaseAuthLogin, databaseAuthRegister } from "src/database/databaseAuth";
import { UserInterface } from "src/interfaces/UserInterfaces";

type AuthContextType = {
  user: UserInterface | null;
  register: (user: UserInterface) => void;
  login: (user:{email:string,password:string}) => any;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  register: () => {},
  login: () => {},
  logout: () => {},
  loading: true,
});

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userCache = Cookies.get("user");
    if (userCache) {
      setUser(JSON.parse(userCache));
    }
    setLoading(false);
  }, []);

  const saveUserCache = (user: UserInterface) => {
    Cookies.set("user", JSON.stringify(user),{
      expires: 7,
    });
  }

  function register(user: UserInterface) {
    databaseAuthRegister(user).then(() => {
      setUser(user);
      saveUserCache(user);
      window.location.href = "/app";
    })
  }

  async function login(user:{email:string,password:string}) {
      const {data,error} = await databaseAuthLogin(user);

      if(data){
        setUser(data);
        saveUserCache(data);
        window.location.href = "/app";
        return
      }

      return error;
  }

  function logout() {

  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if(loading) return <div>LOADING</div>;

  if (!user) {
    window.location.href = "/login";
    return <></>;
  }

  return <>{children}</>;
}
