import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "src/@/components/ui/accordion";
import { TemplateListItem } from "src/components/TemplateListItem";
import { HTMLAttributes, useEffect, useMemo, useState } from "react";
import { cn } from "src/@/lib/utils";
import { UserIcon } from "src/components/UserIcon";
import { CreateTemplate } from "src/components/dialogs/CreateTemplate";
import { databaseGetUserTemplates } from "src/database/databaseTemplates";
import { useAuth } from "src/context/AuthProvider";
import { useAtom } from "jotai";
import { openRightSideBarAtom } from "src/context/openLayoutsAtoms";
import { useDeviceSm } from "src/hooks/useDevice";
import { LogOut, Moon, Sun } from "lucide-react";
import { useOpenDialog } from "src/hooks/useOpenDialog";
import { Button } from "src/@/components/ui/button";
import { useTheme } from "src/context/ThemeProvider";
import { databaseGetDayCalendar } from "src/database/databaseCalendar";
import { Progress } from "src/@/components/ui/progress";
import { useTodayCalories } from "src/components/dialogs/CalendarDayDialog";

export const RightBar = ({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) => {
  // const [templates, setTemplates] = useTemplateAtoms()
  const { user, logout } = useAuth();
  const [templates, setTemplates] = useState([]);
  const {todayCalories,countMacrosFromDayCalendar} = useTodayCalories()

  const objective = useMemo(() => {
    return (
      user?.objective || {
        kcal: 1,
        proteins: 1,
        carbs: 1,
        fats: 1,
      }
    );
  }, [user?.objective]);


  const { openDialog } = useOpenDialog();

  useEffect(() => {
    databaseGetUserTemplates(user!._id).then(({ data, error }) => {
      if (!error && data) setTemplates(data);
    });
    databaseGetDayCalendar({
      userId: user!._id,
      date: {
        day: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      },
    }).then((data) => {
      if (!data) return;
      countMacrosFromDayCalendar(data.foods);
    });
  }, []);

  const [open, _] = useAtom(openRightSideBarAtom);

  //Detect is sm
  const isSm = useDeviceSm();
  const { setTheme, theme } = useTheme();

  return (
    <section
      {...rest}
      className={cn(
        " bg-card h-full w-[300px] py-3 px-4 rounded-l-3xl duration-300 top-0 right-0 z-20 flex flex-col",
        " absolute sm:relative  ",
        isSm && (open ? `opacity-100` : `opacity-0`),
        className
      )}
      style={{
        // position: isSm ? "absolute" : "",
        transform: `translateX(${isSm ? (open ? 0 : 300) : 0}px)`,
      }}>
      <div className="flex items-center gap-2">
        <UserIcon
          onClick={() => {
            openDialog({ id: "profile", params: {userId:user!._id} });
          }}
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
          className="w-full bg-muted rounded-lg p-1   ">
          <AccordionItem value="item-1">
            <AccordionTrigger className="cursor-default hover:no-underline">
              <div onClick={(e) => e.stopPropagation()} className="flex">
                <CreateTemplate />
              </div>
              <p className="hover:underline">Mis Plantillas</p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-1 max-h-[120px] sm:max-h-[300px] overflow-auto">
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

        <div className="mt-5 sm:mt-10">
          <p className="font-medium">Tu progreso de hoy</p>

          <div className="mt-4">
            <div className="flex items-baseline">
              <p className="text-4xl">{todayCalories.kcal}</p>
              <p className="text-sm">/{objective?.kcal || 0}</p>
              <div className="flex-1" />
              <p>Kcal</p>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <div>
                <p className="flex items-baseline">
                  <p className="flex-1">Proteinas</p>
                  <p className="text-xs">
                    {todayCalories.proteins}/{objective.proteins} g
                  </p>
                </p>
                <Progress
                  className="mt-1"
                  value={(todayCalories.proteins / objective.proteins) * 100}
                  color="bg-proteins"
                />
              </div>

              <div>
                <p className="flex items-baseline">
                  <p className="flex-1">Carbohidratos</p>
                  <p className="text-xs">
                    {todayCalories.carbs}/{objective.carbs} g
                  </p>
                </p>
                <Progress
                  className="mt-1"
                  value={(todayCalories.carbs / objective.carbs) * 100}
                  color="bg-carbs"
                />
              </div>

              <div>
                <p className="flex items-baseline">
                  <p className="flex-1">Grasas</p>
                  <p className="text-xs">
                    {todayCalories.fats}/{objective.fats} g
                  </p>
                </p>
                <Progress
                  className="mt-1 duration-300"
                  value={(todayCalories.fats / objective.fats) * 100}
                  color="bg-fats"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 "></div>

        <div className="flex items-center">
          <Button
            className="rounded-full "
            size={"icon"}
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
            variant={"ghost"}>
            {theme === "dark" ? (
              <Moon size={25} />
            ) : (
              <Sun className="text-yellow-500" size={25} />
            )}
          </Button>

          <div className="flex-1" />

          <LogOut
            className=" text-end cursor-pointer hover:bg-muted/80 p-2 rounded-full duration-200"
            size={38}
            onClick={() => {
              logout();
            }}
          />
        </div>
      </div>
    </section>
  );
};
