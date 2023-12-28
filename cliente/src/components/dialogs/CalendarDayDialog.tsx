import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "src/@/components/ui/dialog";
import { DialogProps } from "src/components/dialogs/DialogStack";
import { databaseGetDayCalendar } from "src/database/databaseCalendar";
import { useAuthenticatedUser } from "src/hooks/useAuthenticatedUser";
import { useQuery } from "react-query";
import { Skeleton } from "src/@/components/ui/skeleton";
import { DayInterface } from "src/interfaces/CalendarInterface";
import { CaloriesStats } from "src/components/CaloriesStats";
import { useMemo } from "react";
import { getFullDateName } from "src/utils/calendarUtils";

export type CalendarDayDialogProps = {
  day: number;
  month: number;
  year: number;
};

export const CalendarDayDialog = ({
  day,
  month,
  year,
  onClose,
  ...rest
}: DialogProps & CalendarDayDialogProps) => {
  const { user } = useAuthenticatedUser();

  const dayCalendarRes = useQuery<DayInterface>(
    ["dayCalendar", { userId: user._id, date: { day, month, year } }],
    async () =>
      databaseGetDayCalendar({
        userId: user._id,
        date: { day, month, year },
      })
  );

  const { data: dayCalendar } = dayCalendarRes;

  const totalMacros = useMemo(() => {
    if (!dayCalendar || !dayCalendar.foods)
      return {
        kcal: 0,
        proteins: 0,
        carbs: 0,
        fats: 0,
      };

    const { foods } = dayCalendar;

    return foods?.reduce(
      (acc, curr) => ({
        kcal: acc.kcal + (curr.food.macros?.kcal || 0),
        proteins: acc.proteins + (curr.food.macros?.proteins || 0),
        carbs: acc.carbs + (curr.food.macros?.carbs || 0),
        fats: acc.fats + (curr.food.macros?.fats || 0),
      }),
      { kcal: 0, proteins: 0, carbs: 0, fats: 0 }
    );
  }, [dayCalendar]);

  return (
    <Dialog defaultOpen {...rest} 
    >
      <DialogContent className="pb-6">
        <DialogHeader>
          <DialogTitle>
            {getFullDateName({day, month, year})} <p className="text-xs">{year}</p>
          </DialogTitle>
        </DialogHeader>

        <>
          <div className="flex flex-col w-full gap-1 overflow-auto h-[250px]">
            {dayCalendarRes.isLoading && (
              <>
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-[50px]" />
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <Skeleton className="h-3 w-[50px]" />
                      <Skeleton className="h-2 w-[60px]" />
                    </div>
                  </div>
                ))}
              </>
            )}

            {(!dayCalendar?.foods || dayCalendar?.foods.length === 0 ) && dayCalendarRes.isFetched && (
              <p className="text-center text-foreground/60 mt-5">
                No hay comidas registradas para este día
              </p>
            )}

            
            
            {dayCalendar?.foods.map((item, index) => (
              <div
                key={index}
                className="flex border border-secondary rounded-sm py-1 px-2  items-center">
                <img
                  src={item.food.image}
                  alt=""
                  className="w-7 h-7 rounded-full mr-2 object-cover"
                />
                <p className="flex-1">{item.food.name}</p>
                <div className="flex flex-col items-end">
                  <p className="text-sm mb-[-5px]">{item.quantity}</p>
                  <p className="text-xs text-foreground/60">
                    {item.food.macros?.kcal} kcal
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h3 className=" text-foreground/60 mb-[-12px]">Calorias totales</h3>
          <CaloriesStats className="mx-auto" macros={totalMacros} />
        </>
      </DialogContent>
    </Dialog>
  );
};
