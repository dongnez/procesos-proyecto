import {
  databaseAgregarUsuario,
  databaseEliminarUsuario,
} from "src/database/databaseFunctions";
import { Button } from "src/@/components/ui/button";
import { Input } from "src/@/components/ui/input";
import { NavBar } from "src/modules/header/NavBar";
import { useEffect, useState } from "react";
import { X } from "react-feather";
import { useNavigate } from "react-router-dom";

type User = {
  nick: string;
};

export const BaseInicial = () => {
  const [nick, setNick] = useState("");
  const [user, setUser] = useState<User | null>(null);
  

  const navigate = useNavigate();
  
  useEffect(() => {

    if(user?.nick){
      navigate("/app");
      //LOGUEADO
    }

  }, [user]);

  return (
    <div className="h-full w-full">
      <NavBar />
      <div className="p-3 flex flex-col items-center justify-center border-2 border-secondary rounded-md mx-5 ">
        <section>
          <h2 className="text-gray-500 text-xl font-bold">Iniciar Sesión</h2>
          <div className="flex flex-col gap-2 w-fit">
            <Input
              type="text"
              placeholder="Nick"
              value={nick}
              onChange={(e) => {
                setNick(e.target.value);
              }}
            />
            <Button
              onClick={async () => {
                if (nick === "")
                  return alert("No se puede agregar un usuario sin nick");

                setNick("");

                //TODO REMOVE
                setUser({ nick });

                databaseAgregarUsuario(nick).then(() => {
                  setUser({ nick });
                });
              }}
              type="submit">
              Add
            </Button>
          </div>
        </section>

      </div>
    </div>
  );
};
