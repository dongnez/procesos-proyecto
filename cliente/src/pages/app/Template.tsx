import { Drumstick } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TemplateInterface } from "src/interfaces/TemplateInterfaces";
import { useTemplateAtoms } from "src/context/templateAtoms";
import { Shaker } from "src/components/Shaker";
import { Settings } from "react-feather";
import { Button } from "src/@/components/ui/button";
import { FoodDialog } from "src/components/dialogs/FoodDialog";
import { useNavigate } from "src/hooks/useNavigate";
import { Loader } from "src/components/Loader";
import { databaseGetTemplateById } from "src/database/databaseTemplates";
import { useToast } from "src/@/components/ui/use-toast";

export const Template = () => {
  const { templateId } = useParams();
  const [templateAtom, _] = useTemplateAtoms(templateId || "");
  const [template, setTemplate] = useState<TemplateInterface | null>(templateAtom);
  const navigate = useNavigate();
  const {toast} = useToast();

  useEffect(() => {
    setTemplate(templateAtom);
  }, [templateAtom]);

  useEffect(() => {
    //get template
    if(template || !templateId) return;

    //Fetch from server
    databaseGetTemplateById(templateId).then(({data,error}) => {
      if(data){
        setTemplate(data);
        return
      }

      if(error){
        toast({
          title: "Error",
          description: error,
          variant:'destructive',
          duration: 5000,
        })
      }
    })  

  }, [templateId]);

  if (!template) return (<div className="h-full flex items-center justify-center"><Loader/></div>)

  return (
    <div className="w-full h-full bg-background">
      <section className="w-full h-full">
        <section className="flex items-center mb-4 sm:mb-10">
          <h2 className="text-3xl font-semibold flex-1">{template?.name}</h2>

          <button
            onClick={() => navigate("food")}
            className="px-4 py-2 border-2 border-card rounded-full mr-2 flex gap-2">
              <Drumstick className="" /> Comida
          </button>

          <Button variant={"outline"} size={"icon"} className="rounded-full">
            <Settings className="" size={24} />
          </Button>
        </section>

        <Shaker food={template.foods} />
      </section>

      <FoodDialog food={template.foods}/>
    </div>
  );
};
