import { Check, Upload, X } from "lucide-react";
import { useState } from "react";
import { Button } from "src/@/components/ui/button";
import { trpcClient } from "src/api/trpc";
import { UserIcon } from "src/components/UserIcon";
import { useAuthenticatedUser } from "src/hooks/useAuthenticatedUser";

export const Settings = () => {
  const { user,setUser } = useAuthenticatedUser();


  const [objective, setObjective] = useState(
    user.objective || {
      kcal: 1,
      proteins: 1,
      carbs: 1,
      fats: 1,
    }
  );

  const objectiveChanged =
    objective !== user.objective || user.objective === undefined;

  return (
    <div className="p-2 overflow-y-auto bg-card rounded-sm max-w-[850px] mx-auto">
      <h2 className="text-2xl">Tu perfil de usuario</h2>
      <p className="text-foreground/80 text-sm">
        Actualiza tu perfil y tus preferencias
      </p>
      <hr className="my-4" />

      <section className="flex items-center">
        <div className="flex flex-col items-center">
          <UserIcon
            onClick={() => {}}
            className="hover:drop-shadow-lg duration-200"
            image={user?.photoURL || ""}
            size={65}
          />
          <p className="text-sm">Foto de perfil</p>
        </div>

        <div className="flex-1" />
        <input type="file" id="photoIn" className="hidden" />
        <label
          htmlFor="photoIn"
          className="cursor-pointer py-2 px-3 bg-primary rounded-full flex items-center gap-2 text-primary-foreground">
          <Upload size={20} />
          Sube una foto
        </label>
      </section>
      <hr className="my-4" />
      <section>
        <div className="flex flex-col gap-1 ">
          <p className="text-foreground/90">Nombre</p>
          <p className="text-xl">{user.name}</p>
        </div>
      </section>
      <hr className="my-4" />
      <section>
        <div className="flex flex-col gap-1 ">
          <p className="text-foreground/90">Email</p>
          <p className="text-xl">{user.email}</p>
        </div>
      </section>

      <hr className="my-4 mb-10" />

      <h2 className="text-2xl">Metas y Objetivos</h2>
      <p className="text-foreground/80 text-sm">
        Marca y manten un seguimiento de tus metas
      </p>

      <hr className="my-4" />
      <h3 className="text-xl">Objetivo diario</h3>
      <section className="flex flex-col gap-2">
        <div className="flex items-center">
          <p className="flex-1">Calorias</p>
          <input
            type="number"
            className="w-20 p-2 bg-primary rounded-md text-primary-foreground"
            value={objective.kcal}
            min={1}
            onChange={(e) =>
              setObjective({ ...objective, kcal: parseInt(e.target.value) })
            }
          />
        </div>

        <div className="flex items-center">
          <p className="flex-1">Proteinas</p>
          <input
            type="number"
            min={1}
            className="w-20 p-2 border border-proteins bg-transparent rounded-md text-foreground"
            value={objective.proteins}
            onChange={(e) =>
              setObjective({ ...objective, proteins: parseInt(e.target.value) })
            }
          />
        </div>
        <div className="flex items-center">
          <p className="flex-1">Carbohidratos</p>
          <input
            type="number"
            min={1}
            className="w-20 p-2 bg-transparent border border-carbs rounded-md text-foreground"
            value={objective.carbs}
            onChange={(e) =>
              setObjective({ ...objective, carbs: parseInt(e.target.value) })
            }
          />
        </div>
        <div className="flex items-center">
          <p className="flex-1">Grasas</p>

          <input
            type="number"
            className="w-20 p-2 bg-transparent border border-fats rounded-md text-foreground"
            min={1}
            value={objective.fats}
            onChange={(e) =>
              setObjective({ ...objective, fats: parseInt(e.target.value) })
            }
          />
        </div>

        {objectiveChanged && (
          <div className="flex gap-2 items-center justify-start">
            <Button
              size={"icon"}
              variant={"destructive"}
              className="h-6 bg-red-300 hover:bg-red-400 text-foreground">
              <X size={20} className="cursor-pointer" onClick={() => {
                setObjective(user.objective || {
                  kcal: 0,
                  proteins: 0,
                  carbs: 0,
                  fats: 0,
                });
              }} />
            </Button>

            <Button
              size={"icon"}
              variant={"link"}
              className="h-6 bg-green-300 hover:bg-green-400 text-foreground">
              <Check
                size={20}
                className="cursor-pointer"
                onClick={async () => {
                  const newObjective = await trpcClient.updateUserObjective.mutate({
                    userId: user._id,
                    kcal: objective.kcal,
                    proteins: objective.proteins,
                    carbs: objective.carbs,
                    fats: objective.fats,
                  })

                  if(newObjective){
                    setObjective(newObjective);
                    setUser({...user,objective:newObjective});
                  }

                }}
              />
            </Button>
          </div>
        )}
      </section>

      <br className="mb-5" />
    </div>
  );
};
