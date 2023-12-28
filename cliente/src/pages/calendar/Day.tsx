import dayjs from "dayjs";
import { useMemo } from "react";
import { cn } from "src/@/lib/utils";
// import { useNavigate } from "src/hooks/useNavigate";
import { useOpenDialog } from "src/hooks/useOpenDialog";
import { getCurrentDayNumber, getCurrentMonthNumber } from "src/utils/calendarUtils";

export const Day = ({ day,isOtherMonth }: { day: dayjs.Dayjs, isOtherMonth:boolean }) => {

  const isCurrentDay = useMemo(() => getCurrentDayNumber() === day.date() && getCurrentMonthNumber() === day.month(), [day])

  const {openDialog} = useOpenDialog()
  // const navigate = useNavigate()

  return (
    <div className={`
	border-t border-l border-background p-2 sm:p-4 
  hover:bg-card/80 hover:drop-shadow-md duration-300
	${isOtherMonth ? 'bg-card/60':'bg-card'}
  `}
    onClick={()=>{
      openDialog({id:"calendar_day", params:{day:day.date(),month:day.month(),year:day.year()}})
      // navigate(`${day.date()}-${day.month()}-${day.year()}`, { replace: true }) 
    }}
  >
      <p className={cn("border w-7 h-7 sm:w-8 sm:h-8 p-1 rounded-full flex items-center justify-center text-sm sm:text-base",
      isCurrentDay && "bg-primary text-primary-foreground")}>

        {day.format("DD")}
      </p>
    </div>
  );
};
