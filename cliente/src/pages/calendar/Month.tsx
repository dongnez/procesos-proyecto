import { Fragment, useMemo } from "react";
import { Day } from "src/pages/calendar/Day";
import { getMonth } from "src/utils/calendarUtils";

export const Month = ({ selectedMonth }: { selectedMonth: number }) => {
  const month = useMemo(() => {
    return getMonth(selectedMonth);
  }, [selectedMonth]);

  return (
    <div className="h-full grid grid-cols-7 grid-rows-6 flex-1 rounded-lg">
      {month.map((row, cIndex) => (
        <Fragment key={cIndex}>
          {row.map((day, rIndex) => (
            <Day
              key={rIndex}
              day={day}
              isOtherMonth={day.month() !== selectedMonth}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
};
