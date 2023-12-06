import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  TemplateInterfaceClient } from "src/interfaces/TemplateInterfaces";
import { useTemplateAtoms,} from "src/context/templateAtoms";
import { databaseGetFoodsFromTemplate, databaseGetTemplateById } from "src/database/databaseTemplates";
import { useToast } from "src/@/components/ui/use-toast";

/**
 * Get template by ID or fetch it 
 * @param id? 
 * 
 */
export const useTemplate = (id?:string) => {
  const { templateId } = useParams();

  const templateIdSelected = templateId || id

  const [templateAtom, setTemplateAtom] = useTemplateAtoms(templateIdSelected || "");
  
  const [template, setTemplate] = useState<TemplateInterfaceClient | null>(templateAtom);
  

  const { toast } = useToast();

/*   useEffect(() => {
    setTemplate(templateAtom);
  }, [templateAtom]); */

  useEffect(() => {
    //get template
    if (templateAtom || template || !templateId) return;

    //Fetch from server
    databaseGetTemplateById(templateId).then(async ({ data, error }) => {
      if (data) {

        setTemplateAtom(templateAtom) // ? Data

        //Get foods from template
        const {data:foods} = await databaseGetFoodsFromTemplate(templateId);

        data.foods = foods || [];

        setTemplate(data);

        return;
      }

      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
          duration: 5000,
        });
      }
    });

  }, [templateId]);

  return {template,setTemplate}
};
