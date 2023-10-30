import { Button } from "src/@/components/ui/button";
import { Input } from "src/@/components/ui/input";
import { useState } from "react";
import { useOneTap } from "src/hooks/useOneTap";
import { useAuth } from "src/context/AuthProvider";
import { GoogleAuthButton } from "src/pages/auth/GoogleAuthButton";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useAuth();

  useOneTap();

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
              placeholder="Contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button
              size={"sm"}
              onClick={async () => {
                if (email === "" || password === "")
                  return alert("Rellena todos los campos");


                const error = await login({email, password});
                if(error) alert(error)

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
              <GoogleAuthButton />

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
