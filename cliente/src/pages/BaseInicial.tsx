import { databaseAgregarUsuario } from "src/database/databaseFunctions";
import { Button } from "src/@/components/ui/button";
import { Input } from "src/@/components/ui/input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOneTap } from "src/hooks/useOneTap"

type User = {
  nick: string;
};

export const BaseInicial = () => {
  const [nick, setNick] = useState("");
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
    <div className="h-full w-full pt-20 bg-background">
      <div className="w-fit p-20  border-2 border-secondary rounded-xl mx-auto bg-card">
        <section className="flex flex-col items-center justify-center gap-4 w-[300px]">
          <h2 className="text-center text-4xl font-bold text-primary">
            Iniciar Sesión
          </h2>
          <p className="mb-4 text-sm text-card-foreground">
            Introduce tu nombre o un email para continuar
          </p>

          <div className="flex flex-col gap-4 w-full">
            <Input
              type="text"
              placeholder="Nick"
              value={nick}
              onChange={(e) => {
                setNick(e.target.value);
              }}
            />
            <Button
              size={"sm"}
              onClick={async () => {
                if (nick === "")
                  return alert("No se puede agregar un usuario sin nick");

                setNick("");

                databaseAgregarUsuario(nick).then(() => {
                  setUser({ nick });
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
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
