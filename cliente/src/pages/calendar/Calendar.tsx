import { atom, useAtom } from "jotai";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "src/@/components/ui/button";
import { Month } from "src/pages/calendar/Month";
import {
  getCurrentMonthNumber,
  getCurrentYear,
  getMonthName,
  nextMonth,
  prevMonth,
} from "src/utils/calendarUtils";

export const selectedMonthAtom = atom(getCurrentMonthNumber());
export const selectedYearAtom = atom(getCurrentYear());

export const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useAtom(selectedMonthAtom);
  const [selectedYear, setSelectedYear] = useAtom(selectedYearAtom);

  return (
    <div className="h-full py-2 overflow-auto">
      <section className="max-w-[750px] max-h-[350px] sm:max-h-[600px] h-full mx-auto">
        <header className="bg-card rounded-sm mb-1 p-2 flex items-center  gap-2">
          <Button
            className="border border-foreground"
            variant={"ghost"}
            onClick={() => {
              setSelectedMonth(getCurrentMonthNumber());
              setSelectedYear(getCurrentYear());
            }}>
            Hoy
          </Button>

          <Button
            className="border border-foreground rounded-full w-fit h-fit p-2"
            size={"icon"}
            variant={"ghost"}
            onClick={() => {
              const { prevMonthNumber, prevYear } = prevMonth(
                selectedMonth,
                selectedYear
              );
              setSelectedMonth(prevMonthNumber);
              setSelectedYear(prevYear);
            }}>
            <ChevronLeft size={16} />
          </Button>
          <Button
            className="border border-foreground rounded-full w-fit h-fit p-2"
            size={"icon"}
            variant={"ghost"}
            onClick={() => {
              const { nextMonthNumber, nextYear } = nextMonth(
                selectedMonth,
                selectedYear
              );
              setSelectedMonth(nextMonthNumber);
              setSelectedYear(nextYear);
            }}>
            <ChevronRight size={16} />
          </Button>

          <p className="text-lg">
            {getMonthName(selectedMonth)} {selectedYear}
          </p>
        </header>
        <Month selectedMonth={selectedMonth} />
      </section>
    </div>
  );
};
