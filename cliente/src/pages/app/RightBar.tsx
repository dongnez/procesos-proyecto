import { TemplateInterface } from "src/interfaces/TemplateInterfaces";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "src/@/components/ui/accordion";
import { TemplateListItem } from "src/components/TemplateListItem";
import { HTMLAttributes } from "react";
import { cn } from "src/@/lib/utils";
import { UserIcon } from "src/components/UserIcon";

export const RightBar = ({className,...rest}:HTMLAttributes<HTMLDivElement>) => {

  // TODO: get templates from api
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
    <section {...rest} className={cn("hidden sm:block bg-card h-full w-[300px] py-3 px-4 rounded-l-3xl",className)}>

      <div className="flex items-center gap-2">
        <UserIcon className="hover:drop-shadow-lg duration-200" image="https://github.com/shadcn.png" fallback="userName" size={45} />
        
        {/* Name */}
        <p className="font-medium flex-1">Dark Gollem</p>

        {/* Notifications */}

      </div>

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
