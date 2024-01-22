import { atom, useAtom } from "jotai";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "src/@/components/ui/button";
import { useOpenDialog } from "src/hooks/useOpenDialog";
import { PageWraper } from "src/pages/app/PageWraper";
import { Month } from "src/pages/calendar/Month";
import { SemanalStats } from "src/pages/calendar/SemanalStats";
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

  const { dateId } = useParams();
    const {openDialog} = useOpenDialog()

  useEffect(() => {
    //Detect path with cal
    if(!dateId) return

    const names = ["day","month","year"]
    const { day, month, year } = dateId.split("-").reduce((acc, cur, i) => ({ ...acc, [names[i]]: cur }), {day:null,month:null,year:null})
      
    if(!day || !month || !year) return

    openDialog({id:"calendar_day", params:{day:day,month,year}})
  },[dateId]);

  return (
    <PageWraper className="h-full overflow-auto">
      <div className="h-[350px] sm:min-h-[600px] sm:max-h-[700px]">

      <section className="max-w-[750px] h-full mx-auto flex flex-col">
        <header className="bg-card rounded-sm mb-1 p-2 flex items-center  gap-2">
          <Button
            className="border border-foreground mr-3"
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

          <p className="flex text-lg flex-1 justify-end sm:justify-start">
            {getMonthName(selectedMonth)} {selectedYear}
          </p>
        </header>
        <Month selectedMonth={selectedMonth} />
      </section>
      </div>
      
      <div className="max-w-[750px] mx-auto">
        <h2 className="text-lg my-1 font-semibold text-primary/60">Estadística semanal</h2>
        <SemanalStats  className="flex items-center justify-center overflow-hidden"/>
      </div>
    </PageWraper>
  );
};
