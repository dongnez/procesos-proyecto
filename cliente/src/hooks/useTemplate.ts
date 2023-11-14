import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  TemplateInterfaceClient } from "src/interfaces/TemplateInterfaces";
import { useTemplateAtoms,} from "src/context/templateAtoms";
import { databaseGetTemplateById } from "src/database/databaseTemplates";
import { useToast } from "src/@/components/ui/use-toast";

/**
 * Get template by ID or fetch it 
 * @param id? 
 * 
 */
export const useTemplate = (id?:string) => {
  const { templateId } = useParams();

  const templateIdSelected = templateId || id

  const [templateAtom, _] = useTemplateAtoms(templateIdSelected || "");
  
  const [template, setTemplate] = useState<TemplateInterfaceClient | null>(templateAtom);
  

  const { toast } = useToast();

  useEffect(() => {
    setTemplate(templateAtom);
  }, [templateAtom]);

  useEffect(() => {
    //get template
    if (template || !templateId) return;

    //Fetch from server
    databaseGetTemplateById(templateId).then(({ data, error }) => {
      if (data) {

        setTemplate(data);
        console.log("T",data)

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
