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
import { DayInterface,FoodDayInterface } from "src/interfaces/CalendarInterface";
import { CaloriesStats } from "src/components/CaloriesStats";
import { useEffect, useState } from "react";
import { getFullDateName } from "src/utils/calendarUtils";
import { atom, useAtom } from "jotai";
import { ChevronsLeft, ChevronsRight, X } from "lucide-react";
import { Button } from "src/@/components/ui/button";
import { trpcClient } from "src/api/trpc";

export type CalendarDayDialogProps = {
  day: number;
  month: number;
  year: number;
};

export const todayCaloriesAtom = atom({
  kcal: 0,
  proteins: 0,
  carbs: 0,
  fats: 0,
});

export const useTodayCalories = () => {
  const [todayCalories, setTodayCalories] = useAtom(todayCaloriesAtom);

  const addMacros = (macros: {
    kcal: number;
    proteins: number;
    carbs: number;
    fats: number;
  }) => {
    setTodayCalories((prev) => ({
      kcal: prev.kcal + macros.kcal,
      proteins: prev.proteins + macros.proteins,
      carbs: prev.carbs + macros.carbs,
      fats: prev.fats + macros.fats,
    }));
  };

  const countMacrosFromDayCalendar = (foods: Array<FoodDayInterface>) => {
    const calories = foods?.reduce(
      (acc, curr) => ({
        kcal: acc.kcal + (curr.food.macros?.kcal || 0) * curr.quantity,
        proteins: acc.proteins + (curr.food.macros?.proteins || 0) * curr.quantity,
        carbs: acc.carbs + (curr.food.macros?.carbs || 0) * curr.quantity,
        fats: acc.fats + (curr.food.macros?.fats || 0) * curr.quantity,
      }),
      { kcal: 0, proteins: 0, carbs: 0, fats: 0 }
    );

      setTodayCalories(calories);

  };

  return {
    todayCalories,
    addMacros,
    countMacrosFromDayCalendar,
    setTodayCalories,
  };
};

export const CalendarDayDialog = ({
  day,
  month,
  year,
  onClose,
  ...rest
}: DialogProps & CalendarDayDialogProps) => {
  const { user } = useAuthenticatedUser();

  const dayCalendarRes = useQuery<DayInterface | null>(
    ["dayCalendar", { userId: user._id, date: { day, month, year } }],
    async () =>
      databaseGetDayCalendar({
        userId: user._id,
        date: { day, month, year },
      })
  );

  const { data: dayCalendar } = dayCalendarRes;
  const {todayCalories:totalMacros,countMacrosFromDayCalendar} = useTodayCalories();

  const [dayCalendarFoods, setDayCalendarFoods] = useState(
    dayCalendar?.foods || []
  );

  useEffect(() => {
    setDayCalendarFoods(dayCalendar?.foods || []);
  }, [dayCalendar?.foods]);

  useEffect(() => {
    countMacrosFromDayCalendar(dayCalendarFoods)
  }, [dayCalendarFoods]);


  return (
    <Dialog defaultOpen {...rest}>
      <DialogContent className="pb-6">
        <DialogHeader>
          <DialogTitle>
            {getFullDateName({ day, month, year })}{" "}
            <p className="text-xs">{year}</p>
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

            {(!dayCalendarFoods || dayCalendarFoods.length === 0) &&
              dayCalendarRes.isFetched && (
                <p className="text-center text-foreground/60 mt-5">
                  No hay comidas registradas para este día
                </p>
              )}

            {dayCalendarFoods.map((item, index) => (
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
                  <div className="flex gap-3 justify-center items-center">
                    <Button className="p-0 h-3 w-3 rounded-full "
                    onClick={()=>{
                      if(item.quantity <= 1) return;

                      trpcClient.calendar.updateQuantityFood.mutate({
                        date: { day, month, year },
                        foodId: item.food._id,
                        userId: user._id,
                        newQuantity: item.quantity-1
                      }).then(()=>{
                        setDayCalendarFoods((prev) =>
                          prev.map((food) => {
                            if (food.food._id === item.food._id) {
                              return { ...food, quantity: food.quantity - 1 };
                            }
                            return food;
                          })
                        );
                      })
                    }}>
                      <ChevronsLeft size={10} />
                    </Button>
                    <p className="text-sm">{item.quantity}</p>
                    <Button className="p-0 h-3 w-3 rounded-full" 
                    onClick={()=>{
                      trpcClient.calendar.updateQuantityFood.mutate({
                        date: { day, month, year },
                        foodId: item.food._id,
                        userId: user._id,
                        newQuantity: item.quantity+1
                      }).then(()=>{
                        setDayCalendarFoods((prev) =>
                          prev.map((food) => {
                            if (food.food._id === item.food._id) {
                              return { ...food, quantity: food.quantity + 1 };
                            }
                            return food;
                          })
                        );
                      })
                    }}>
                      <ChevronsRight size={10} />
                    </Button>
                  </div>

                  <p className="text-xs text-foreground/60">
                    {item.food.macros?.kcal} kcal
                  </p>
                </div>
                <Button
                  className="p-0 h-5 w-5 rounded-full ml-4 hover:bg-destructive transition-colors"
                  variant={"outline"}
                  onClick={async () => {
                    await trpcClient.calendar.removeFood
                      .mutate({
                        date: { day, month, year },
                        foodId: item.food._id,
                        userId: user._id,
                      })
                      .then(() => {
                        setDayCalendarFoods((prev) =>
                          prev.filter((food) => food.food._id !== item.food._id)
                        );
                      });
                  }}>
                  <X size={15} />
                </Button>
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
