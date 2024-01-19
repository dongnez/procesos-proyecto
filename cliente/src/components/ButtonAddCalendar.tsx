import { ToastAction } from "@radix-ui/react-toast";
import { CalendarPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonProps } from "src/@/components/ui/button";
import { useToast } from "src/@/components/ui/use-toast";
import { useTodayCalories } from "src/components/dialogs/CalendarDayDialog";
import { databaseAddFood } from "src/database/databaseCalendar";
import { useAuthenticatedUser } from "src/hooks/useAuthenticatedUser";
import { FoodInterface } from "src/interfaces/FoodInterfaces";

export const ButtonAddCalendar = ({
  selectedFood,
  iconSize = 24,
  ...rest
}: ButtonProps & {
  selectedFood: FoodInterface;
  iconSize?: number;
}) => {
  const { user } = useAuthenticatedUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addMacros } = useTodayCalories();

  return (
    
      <Button
        variant={"secondary"}
        size={"icon"}
        className={"rounded-full"}
        onClick={async (e) => {
          e.stopPropagation();

          const today = new Date();
          const day = today.getDate();
          const month = today.getMonth();
          const year = today.getFullYear();

          await databaseAddFood({
            date: {
              day,
              month,
              year,
            },
            foodId: selectedFood._id,
            userId: user!._id,
          })
            .then(() => {
              if (selectedFood.macros) addMacros(selectedFood.macros);
              toast({
                title: "Comida añadida al calendario",
                duration: 3000,
                action: (
                  <ToastAction
                    className="group"
                    altText="Ver en Calendario"
                    onClick={() => {
                      navigate(`/app/calendar/${day}-${month}-${year}`);
                    }}>
                    <p className="group-hover:text-black text-xs rounded-md border border-secondary p-1">Ver en Calendario</p>
                  </ToastAction>
                ),
              });
            })
            .catch(() => {
              toast({
                title: "Error al añadir comida al calendario",
                description: `No se ha podido añadir ${selectedFood.name} al calendario`,
                variant: "destructive",
                duration: 2500,
              });
            });
        }}
		{...rest}>
        <CalendarPlus size={iconSize} />
      </Button>
  );
};
