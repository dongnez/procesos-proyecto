import dayjs from "dayjs";

export const Day = ({ day,isOtherMonth }: { day: dayjs.Dayjs, isOtherMonth:boolean }) => {

  function getCurrentDayStyle() {
     // 
  }

  return (
    <div className={`
	border-t border-l border-background p-2 sm:p-4 
  hover:bg-card/80 hover:drop-shadow-md duration-300
	${isOtherMonth ? 'bg-card/60':'bg-card'}`}>
      <p className="border w-8 h-8 p-1 rounded-full flex items-center justify-center">
        {day.format("DD")}
      </p>
    </div>
  );
};
