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


  return (
    <Dialog defaultOpen {...rest} onOpenChange={()=>{}} >
      <DialogContent className="min-h-[300px]">
        <DialogHeader>
          <DialogTitle>
            {day} {month} {year}
          </DialogTitle>
        </DialogHeader>

        {dayCalendarRes.isLoading && (
          <>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </>
        )}

        <>
          <div className="flex flex-col w-full">
            {dayCalendar?.foods.map((item, index) => (
              <div key={index} className="flex gap-2">
                <p className="flex-1">{item.food.name}</p>
				<p>{item.quantity}</p>
              </div>
            ))}
          </div>
        </>
      </DialogContent>
    </Dialog>
  );
};
