import { TemplateInterface } from "src/interfaces/TemplateInterfaces";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "src/@/components/ui/accordion";
import { TemplateListItem } from "src/components/TemplateListItem";

export const Sidebar = () => {
  const templates: TemplateInterface[] = [
    {
      id: "tempalte12312",
      visibility: "public",
      users: [],
      name: "Pizza",
      food: [
        {
          id: "1Pizza",
          name: "Pizza",
          image: "",
        },
      ],
    },
  ];

  

  return (
    <section className="bg-card h-full w-[200px] p-2">
      <p>List</p>

      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full ">
        <AccordionItem value="item-1">
          <AccordionTrigger>Mis Plantillas</AccordionTrigger>
          <AccordionContent>
            {templates.map((template, index) => (
              <TemplateListItem key={index} template={template} />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
