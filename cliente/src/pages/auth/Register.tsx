import { Button } from "src/@/components/ui/button";
import { Input } from "src/@/components/ui/input";
import { useState } from "react";
import { useOneTap } from "src/hooks/useOneTap";
import { UserInterface } from "src/interfaces/UserInterfaces";
import { useAuth } from "src/context/AuthProvider";
import { GoogleAuthButton } from "src/pages/auth/GoogleAuthButton";

export const Register = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState<UserInterface>({
    _id: "",
    email: "",
    name: "",
    password: "",
  });

  const { register } = useAuth();
  useOneTap();

  return (
    <div className="h-full w-full pt-20 bg-background px-2 sm:px-0">
      <div className="w-full px-4 py-10 sm:w-fit sm:p-20  border-2 border-secondary rounded-xl mx-auto bg-card">
        <section className="flex flex-col m-auto items-center justify-center gap-4 w-[300px]">
          <h2 className="text-center text-4xl font-bold text-primary">
            Registrarse
          </h2>
          <p className="mb-4 text-sm text-card-foreground">
            Introduce todos los datos para continuar
          </p>

          <div className="flex flex-col gap-4 w-full">
            <Input
              type="text"
              className="text-lg"
              placeholder="Nombre"
              value={user.name}
              onChange={(e) => {
                setUser((user) => ({ ...user, name: e.target.value }));
              }}
            />
            <Input
              type="email"
              className="text-lg"
              placeholder="Email"
              value={user.email}
              onChange={(e) => {
                setUser((user) => ({ ...user, email: e.target.value }));
              }}
            />
            <Input
              type="password"
              className="text-lg"
              placeholder="Contraseña"
              value={user.password}
              onChange={(e) => {
                setUser((user) => ({ ...user, password: e.target.value }));
              }}
            />
            <Button
              size={"sm"}
              onClick={async () => {
                setError("");
                await register(user).catch((error) => {
                  console.log(error);
                  error.message && setError(error.message || "");
                });
              }}
              type="submit">
              Registrarse
            </Button>

            {error && (
              <p className="text-center text-red-500 text-sm">{error}</p>
            )}

            <div className="relative w-full h-[1px] bg-foreground/40 my-4">
              <p className="absolute bg-card w-fit top-[-13px] mx-auto px-2 right-0 left-0 text-center text-card-foreground/40">
                o continuar con
              </p>
            </div>

            <div className="px-6 sm:px-0 max-w-sm">
              <GoogleAuthButton />
              <p className="text-center w-full mt-5">
                <a href="/login" className="hover:underline text-primary ">
                  ¿Ya tienes una cuenta?
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
