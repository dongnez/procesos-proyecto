import { SimpleSelect } from "src/components/SimpleSelect";

export const TemplateSettings = () => {
  // Limitar el acceso a esta ruta solo a los usuarios que tengan el rol de admin
  //Change visibility of template
  //Change template name
  //Change template description
  //Add or remove template users
  //Remove template foods

  return (
    <div className="h-full">
      <div className="p-3 rounded-md bg-card/90 h-fit max-w-[500px] mx-auto">
        <h1 className="text-xl">Nombre template</h1>

        <h3 className="text-lg">1 Usuarios</h3>
        {/* Usuarios */}

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
