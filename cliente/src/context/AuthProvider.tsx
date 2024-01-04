import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { trpcClient } from "src/api/trpc";
import { databaseAuthLogOut, databaseAuthLogin, databaseAuthRegister } from "src/database/databaseAuth";
import { UserInterface } from "src/interfaces/UserInterfaces";

type AuthContextType = {
  user: UserInterface | null;
  setUser: (user:UserInterface | null) => void;
  register: (user: UserInterface) => any;
  login: (user:{email:string,password:string}) => Promise<any>;
  logout: () => void;
  saveUser: (user:UserInterface) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  register: () => {},
  login: async () => {},
  logout: () => {},
  saveUser: ()=>{},
  setUser: ()=>{},
  loading: true,
});

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token")

    if (token) {
      trpcClient.user.getUserByToken.query({token:token}).then((data)=>{
        
        if(!data){
          setLoading(false);
          return;
        }

        setUser(data);
        setLoading(false);

      }).catch(()=>{
        setLoading(false);
      })
      
    }

  }, []);

  const saveUser = (user: UserInterface) => {
    setUser(user);
  }

  async function register(user: UserInterface) {
    return await databaseAuthRegister(user).then(()=>{
      window.location.href = "/login";
    })
  }

  async function login(user:{email:string,password:string}) {
      const {data,error} = await databaseAuthLogin(user);

      if(data){
        saveUser(data);
        window.location.href = "/app";
        return
      }

      return error;
  }

  function logout() {

    databaseAuthLogOut()
    Cookies.remove("user");
    setUser(null);
    // window.location.href = "/login";
  }

  return (
    <AuthContext.Provider value={{ saveUser,user,setUser, register, login, logout, loading}}>
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
