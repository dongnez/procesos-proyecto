import { Button } from "src/@/components/ui/button";
import { Input } from "src/@/components/ui/input";
import { useState } from "react";
import { useOneTap } from "src/hooks/useOneTap";
import { useAuth } from "src/context/AuthProvider";
import { GoogleAuthButton } from "src/pages/auth/GoogleAuthButton";
import { useToast } from "src/@/components/ui/use-toast";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useAuth();
  const [error,setError] = useState("");
  const [showEmailSend, setShowEmailSend] = useState(false);

  const {toast} = useToast();

  useOneTap();

  return (
    <div className="h-full w-full pt-4 sm:pt-20 bg-background px-2 sm:px-0">
      <div className="w-full px-4 py-10 sm:w-fit sm:p-20  border-2 border-secondary rounded-xl mx-auto bg-card">
        <section className="flex flex-col m-auto items-center justify-center gap-4 w-[300px]">
          <h2 className="text-center text-4xl font-bold text-primary">
            Iniciar Sesión
          </h2>
          <p className="mb-4 text-sm text-card-foreground">
            Introduce tu nombre o un email para continuar
          </p>

          <div className={` p-2 rounded-md border border-red-500 w-full ${showEmailSend ? "block" : "hidden"}`}>
            <p  className="text-center text-lg">Email no verificado</p>

            <Button size={'sm'} variant={'destructive'} onClick={async ()=>{
                
              toast({
                title: "Email enviado",
                description: "Revisa tu bandeja de entrada",
                duration: 2500,
              })
              setShowEmailSend(false);

            }}
             className="mt-2 w-full text-center text-sm">Reenviar correo verificación</Button>

          </div>

          <form className="flex flex-col gap-4 w-full"
          onSubmit={async (e) => {
                e.preventDefault();
                setError("");
                if (email === "" || password === "")
                  return toast({
                    title: "Rellena todos los campos",
                    variant: "destructive"
                    });


                const error = await login({email, password}).catch((e)=>{
                  console.log("L Error",e);
                  return e
                })

                if(error?.errorCode === 2){
                  setShowEmailSend(true);
                  return
                }

                error?.message && setError(error.message);

              }}>
            <Input
              type="email"
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
              type="submit">
              Iniciar Sesión
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
                <a href="/register" className="hover:underline text-primary ">
                  ¿Todavia no tienes una cuenta? 
                </a>
              </p>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
