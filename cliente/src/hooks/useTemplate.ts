import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  TemplateInterfaceClient } from "src/interfaces/TemplateInterfaces";
import { useSelectedTemplateAtom,} from "src/context/templateAtoms";
import { databaseGetFoodsFromTemplate, databaseGetTemplateById } from "src/database/databaseTemplates";
import { useToast } from "src/@/components/ui/use-toast";

/**
 * Get template by ID or fetch it 
 * @param id? 
 * 
 */
export const useTemplate = () => {
  const { templateId } = useParams();


  const [templateAtom, setTemplateAtom] = useSelectedTemplateAtom();
  
  const [template, setTemplate] = useState<TemplateInterfaceClient | null>(templateAtom);
  

  const { toast } = useToast();


  useEffect(() => {

    if ( (templateAtom?._id === template?._id && template && template.foods) || !templateId) return;

    //Fetch from server
    databaseGetTemplateById(templateId).then(async ({ data, error }) => {
      if (data) {

        setTemplateAtom(templateAtom) // ? Data

        //Get foods from template
        const {data:foods} = await databaseGetFoodsFromTemplate(templateId);
        
        setTemplate({...data,foods:foods});
        //Save Template in jotai 
        setTemplateAtom((t)=>{
          if(!t) return null
          return({...t,foods:foods})
        })

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
