import { databaseAgregarUsuario } from "src/database/databaseFunctions";
import { Button } from "src/@/components/ui/button";
import { Input } from "src/@/components/ui/input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOneTap } from "src/hooks/useOneTap";

type User = {
  nick: string;
};

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useOneTap(user);

  useEffect(() => {
    if (user?.nick) {
      navigate("/app");
      //LOGUEADO
    }
  }, [user]);

  return (
    <div className="h-full w-full pt-20 bg-background px-2 sm:px-0">
      <div className="w-full px-4 py-10 sm:w-fit sm:p-20  border-2 border-secondary rounded-xl mx-auto bg-card">
        <section className="flex flex-col m-auto items-center justify-center gap-4 w-[300px]">
          <h2 className="text-center text-4xl font-bold text-primary">
            Iniciar Sesión
          </h2>
          <p className="mb-4 text-sm text-card-foreground">
            Introduce tu nombre o un email para continuar
          </p>

          <div className="flex flex-col gap-4 w-full">
            <Input
              type="text"
              className="text-lg"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              type="password"
              className="text-lg"
              placeholder="********"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              size={"sm"}
              onClick={async () => {
                if (email === "")
                  return alert("No se puede agregar un usuario sin nick");

                setEmail("");

                databaseAgregarUsuario(email).then(() => {
                  setUser({ nick: email });
                });
              }}
              type="submit">
              Iniciar Sesión
            </Button>

            <div className="relative w-full h-[1px] bg-foreground/40 my-4">
              <p className="absolute bg-card w-fit top-[-13px] mx-auto px-2 right-0 left-0 text-center text-card-foreground/40">
                o continuar con
              </p>
            </div>

            <div className="px-6 sm:px-0 max-w-sm">
              <button
                onClick={() => {
                  window.location.href = "/auth/google";
                }}
                type="button"
                className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                <svg
                  className="mr-2 -ml-1 w-4 h-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512">
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                Iniciar con Google<div></div>
              </button>

              <p className="text-center w-full mt-5">
                <a href="/register" className="hover:underline text-primary ">
                  ¿Todavia no tienes una cuenta? 
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
