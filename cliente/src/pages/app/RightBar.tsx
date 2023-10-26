import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "src/@/components/ui/accordion";
import { TemplateListItem } from "src/components/TemplateListItem";
import { HTMLAttributes, useEffect, useState } from "react";
import { cn } from "src/@/lib/utils";
import { UserIcon } from "src/components/UserIcon";
import { CreateTemplate } from "src/components/dialogs/CreateTemplate";
import { databaseGetUserTemplates } from "src/database/databaseTemplates";
import { useAuth } from "src/context/AuthProvider";

export const RightBar = ({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => {
  // const [templates, setTemplates] = useTemplateAtoms()
  const [templates, setTemplates] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    databaseGetUserTemplates(user!._id).then(({ data, error }) => {
      if (!error && data) setTemplates(data);
    });
  }, []);

  return (
    <section
      {...rest}
      className={cn(
        "hidden sm:block bg-card h-full w-[300px] py-3 px-4 rounded-l-3xl",
        className
      )}>
      <div className="flex items-center gap-2">
        <UserIcon
          className="hover:drop-shadow-lg duration-200"
          image="https://github.com/shadcn.png"
          fallback="userName"
          size={45}
        />

        {/* Name */}
        <p className="font-medium flex-1">Dark Gollem</p>

        {/* Notifications */}
      </div>

      <div className="relative">
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-full bg-white/40 rounded-lg p-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="cursor-default hover:no-underline">
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex justify-between">
                <CreateTemplate />
              </div>
              <p className="hover:underline">Mis Plantillas</p>
            </AccordionTrigger>
            <AccordionContent>
              {templates.map((template, index) => (
                <TemplateListItem key={index} template={template} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};
