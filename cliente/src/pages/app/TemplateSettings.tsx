import { SimpleSelect } from "src/components/SimpleSelect";
import { useTemplate } from "src/hooks/useTemplate";
import { Loader } from "src/components/Loader";
import { UserIcon } from "src/components/UserIcon";
import { Eye, UserPlus } from "lucide-react";
import { Button } from "src/@/components/ui/button";

export const TemplateSettings = () => {
  // Limitar el acceso a esta ruta solo a los usuarios que tengan el rol de admin
  //Change visibility of template
  //Change template name
  //Change template description
  //Add or remove template users
  //Remove template foods

  const { template } = useTemplate();

  if (!template) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="p-3 rounded-md bg-card/90 h-fit max-w-[500px] mx-auto">
        <h1 className="text-xl">{template.name}</h1>

        <h3 className="text-lg">Ajustes</h3>
        <hr className="mb-2" />

        <section className="flex gap-2 items-center">
          <Eye />
          <p className="flex-1">Visibilidad</p>
          <SimpleSelect
            defaultValue={"public"}
            list={[
              { name: "Público", value: "public" },
              { name: "Privado", value: "private" },
            ]}
          />
        </section>

        <div className="flex items-center mt-4 mb-1">
          <h3 className="text-lg font-medium  flex-1">{template.users.length} Miembros  </h3>
          <Button className="rounded-full w-7 h-7" size={"icon"} >
            <UserPlus size={16} className="pl-[1px]" />
          </Button>
        </div>
        <hr />

        {template.users.map((user, index) => {
          return (
            <div
              key={index}
              className="flex gap-5 p-3 hover:bg-muted duration-200 items-center">
              <UserIcon
                image={user.userRef?.photoURL}
                fallback={user.userRef?.name}
                size={30}
              />
              <p className="text-lg flex-1">{user.userRef?.name}</p>
              {user.role === "owner" && <p className="text-xs primary text-blue-500">propietario</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
