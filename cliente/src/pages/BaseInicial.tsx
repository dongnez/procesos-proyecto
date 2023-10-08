import {
  databaseAgregarUsuario,
  databaseEliminarUsuario,
  databaseObtenerUsuarios,
} from "src/database/databaseFunctions";
import { Button } from "src/@/components/ui/button";
import { Input } from "src/@/components/ui/input";
import { NavBar } from "src/modules/header/NavBar";
import { useEffect, useState } from "react";
import { X } from "react-feather";

type User = {
	nick: string;
}

export const BaseInicial = () => {
  const [nick, setNick] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
	//TODO CAMBIAR POR SOCKET
	setInterval(() => {
		databaseObtenerUsuarios().then((users) => {
			if(!users || users.length === 0 ) return;
			const finalUsers = Object.values(users) as User[];
			setUsers(finalUsers);
		});
	}, 1000);
  },[])

  return (
    <div className="h-full w-full">
      <NavBar />
      <div className="p-3 flex flex-col items-center justify-center border-2 border-secondary rounded-md mx-5 ">
        <section>
          <h2 className="text-gray-500 text-xl font-bold">Add user</h2>
          <div className="flex gap-2 w-fit">
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

                databaseAgregarUsuario(nick).then(() => {});
              }}
              type="submit">
              Add
            </Button>
          </div>
        </section>

        <section className="max-w-4xl w-full">
          <div className="flex mt-5 items-center">
            <h2 className=" flex-1  text-gray-500 text-xl font-bold">Users</h2>
            <p>{users.length}</p>
          </div>

          {users.map((user, index) => (
            <div
              key={index}
              className={`${index % 2 === 0 ? "bg-secondary" : ""}
			  p-3 flex items-center`}>
              <p className="text-primary  font-semibold text-lg flex-1">
                {user.nick}
              </p>
              <Button
                variant="destructive"
                size="icon"
                className="max-w-[30px] max-h-[30px]"
                onClick={() => {
                  databaseEliminarUsuario(user.nick);
                }}>
                <X size={22} />
              </Button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
