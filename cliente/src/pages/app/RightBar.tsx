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
import { useAtom } from "jotai";
import { openRightSideBarAtom } from "src/context/openLayoutsAtoms";
import { useDeviceSm } from "src/hooks/useDevice";
import { LogOut } from "lucide-react";
import { useOpenDialog } from "src/hooks/useOpenDialog";

export const RightBar = ({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => {
  // const [templates, setTemplates] = useTemplateAtoms()
  const [templates, setTemplates] = useState([]);
  const { user, logout } = useAuth()
  const {openDialog} = useOpenDialog()

  useEffect(() => {
    databaseGetUserTemplates(user!._id).then(({ data, error }) => {
      if (!error && data) setTemplates(data);

      console.log("Templates", data)
    });
  }, []);

  const [open,_] = useAtom(openRightSideBarAtom)

  //Detect is sm
  const isSm = useDeviceSm()
  
  return (
    <section
      {...rest}
      className={cn(
        " bg-card h-full w-[300px] py-3 px-4 rounded-l-3xl duration-300 top-0 right-0 z-20 flex flex-col",
        " absolute sm:relative  ",
        isSm && (open ? `opacity-100`:`opacity-0`),
        className
      )}
      style={{
        // position: isSm ? "absolute" : "",
        transform: `translateX(${isSm ? (open ? 0 : 300) : 0}px)`,
      }}>
      <div className="flex items-center gap-2">
        <UserIcon
          onClick={()=>{openDialog({id:"profile",params:{}})}}
          className="hover:drop-shadow-lg duration-200"
          image={user?.photoURL || ""}
          size={45}
        />

        {/* Name */}
        <p className="font-medium flex-1">{user!.name}</p>

        {/* Notifications */}
      </div>

      <div className="relative mt-4 flex-1 flex flex-col">
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-full bg-muted rounded-lg p-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="cursor-default hover:no-underline">
              <div onClick={(e) => e.stopPropagation()} className="flex">
                <CreateTemplate />
              </div>
              <p className="hover:underline">Mis Plantillas</p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1">
                {templates.map((template, index) => (
                  <TemplateListItem key={index} template={template} />
                ))}

                {templates.length === 0 && (
                  <p className="text-center">No hay plantillas</p>
                )}

              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex-1 "></div>
      
        <div className="flex justify-end">
          <LogOut className=" text-end cursor-pointer hover:bg-muted/80 p-2 rounded-full duration-200" size={35} 
          onClick={()=>{
            logout()
          }}/>
        </div>

      </div>
    </section>
  );
};
