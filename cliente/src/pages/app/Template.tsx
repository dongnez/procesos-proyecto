import { Drumstick } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TemplateInterface } from "src/interfaces/TemplateInterfaces";
import { useTemplateAtoms } from "src/context/templateAtoms";
import { FoodInterface } from "src/interfaces/FoodInterfaces";
import { Shaker } from "src/components/Shaker";
import { Settings } from "react-feather";
import { Button } from "src/@/components/ui/button";
import { FoodDialog } from "src/components/dialogs/FoodDialog";
import { useNavigate } from "src/hooks/useNavigate";

export const Template = () => {
  const { templateId } = useParams();
  const [template, setTemplate] = useState<TemplateInterface | null>(null);
  const [templateAtom, _] = useTemplateAtoms(templateId || "");
  const navigate = useNavigate();

  useEffect(() => {
    //Si no esta en cache, lo pido al servidor
    if (templateAtom) {
      setTemplate(templateAtom);
      return;
    }

    //Fetch from server
  }, [templateAtom]);

  const food: FoodInterface = {
    id: "1",
    name: "Pizza",
    image: "https://images.pexels.com/photos/5903101/pexels-photo-5903101.jpeg",
  };

  if (!template) return <div>Loading...</div>;

  return (
    <div className="w-full h-full bg-background">
      <section className="w-full h-full">
        <section className="flex items-center mb-4 sm:mb-10">
          <h2 className="text-3xl font-semibold flex-1">{template?.name}</h2>

          <button
            onClick={() => navigate("food")}
            className="px-5 py-2 border-2 border-card rounded-full mr-2 flex gap-2">
            <Drumstick className="" /> Añadir Comida
          </button>

          <Button variant={"outline"} size={"icon"} className="rounded-full">
            <Settings className="" size={24} />
          </Button>
        </section>

        <Shaker food={food} />
      </section>

      <FoodDialog />
    </div>
  );
};
