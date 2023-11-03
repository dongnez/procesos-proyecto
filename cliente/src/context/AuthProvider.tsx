import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { databaseAuthLogin, databaseAuthRegister } from "src/database/databaseAuth";
import { UserInterface } from "src/interfaces/UserInterfaces";

type AuthContextType = {
  user: UserInterface | null;
  register: (user: UserInterface) => any;
  login: (user:{email:string,password:string}) => any;
  logout: () => void;
  saveUser: (user:UserInterface) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  register: () => {},
  login: () => {},
  logout: () => {},
  saveUser: ()=>{},
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

  const saveUser = (user: UserInterface) => {
    setUser(user);
    Cookies.set("user", JSON.stringify(user),{
      expires: 7,
    });
  }

  async function register(user: UserInterface) {
    return await databaseAuthRegister(user).then(()=>{
      window.location.href = "/login";
    })
  }

  async function login(user:{email:string,password:string}) {
      const {data,error} = await databaseAuthLogin(user);

      if(data){
        // setUser(data);
        saveUser(data);
        window.location.href = "/app";
        return
      }

      return error;
  }

  function logout() {
    Cookies.remove("user");
    setUser(null);
    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider value={{ saveUser,user, register, login, logout, loading}}>
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
