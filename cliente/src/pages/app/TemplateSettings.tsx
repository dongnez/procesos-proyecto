import { SimpleSelect } from "src/components/SimpleSelect";
import { useTemplate } from "src/hooks/useTemplate";
import { Loader } from "src/components/Loader";
import { AvatarIcon } from "src/components/AvatarIcon";

export const TemplateSettings = () => {
  // Limitar el acceso a esta ruta solo a los usuarios que tengan el rol de admin
  //Change visibility of template
  //Change template name
  //Change template description
  //Add or remove template users
  //Remove template foods

  const { template } = useTemplate();

  if (!template) {
    <div className="h-full flex items-center justify-center">
      <Loader />
    </div>;
  }

  return (
    <div className="h-full">
      <div className="p-3 rounded-md bg-card/90 h-fit max-w-[500px] mx-auto">
        <h1 className="text-xl">{template?.name}</h1>

        <h3 className="text-lg">{template?.users.length} Usuarios</h3>
        <hr/>

        {template?.users.map((user,index)=>{

          return (
            <div key={index} className="flex gap-2">
              <AvatarIcon image={user.photoURL} fallback={user.name} />
              <p>{user.name}</p>
            </div>
          )
        })}
        {/* Usuarios */}


        <h3 className="text-lg">Ajustes</h3>
        <hr/>

        <section className="flex gap-2 items-center">
          <p>Visibilidad</p>
          <SimpleSelect
            defaultValue={"public"}
            list={[
              { name: "Público", value: "public" },
              { name: "Privado", value: "private" },
            ]}
          />
        </section>
      </div>
    </div>
  );
};
