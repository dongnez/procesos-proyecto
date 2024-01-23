import { useAtomValue } from "jotai";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
} from "recharts";
import { HTMLAttributes, useEffect, useState } from "react";
import {
  selectedMonthAtom,
  selectedYearAtom,
} from "src/pages/calendar/Calendar";
import { dayNamesES, getWeekDays } from "src/utils/calendarUtils";
import { useDeviceSm } from "src/hooks/useDevice";
import { trpcClient } from "src/api/trpc";
import { useAuthenticatedUser } from "src/hooks/useAuthenticatedUser";
import { calculateDayMacros } from "src/utils/calendarUtils";

export const SemanalStats = ({ ...rest }: HTMLAttributes<HTMLDivElement>) => {
  const { user } = useAuthenticatedUser();
  const selectedMonth = useAtomValue(selectedMonthAtom);
  const selectedYear = useAtomValue(selectedYearAtom);
  const isSm = useDeviceSm();

  const [weekData, setWeekData] = useState(
    Array<{
      name: string;
      kcal: number;
    }>()
  );

  useEffect(() => {
    const today = new Date().getDate();
    //Get week
    const week = getWeekDays(selectedMonth, today, selectedYear);

    trpcClient.calendar.getSemanalStats
      .query({
        userId: user._id,
        week: week,
        year: selectedYear,
        month: selectedMonth,
      })
      .then((res) => {
        const weekD: any = [];
        res.map((day: any, index) => {
         const name = dayNamesES[index];
          if (!day) {
            weekD.push({
              name: name,
              kcal: 0,
            });
            return;
          }

          const { kcal } = calculateDayMacros(day.foods);

          weekD.push({
            name: name,
            kcal: kcal,
          });
        });

        setWeekData(weekD);
      });
  }, [selectedMonth, selectedYear]);

  return (
    <div {...rest}>
      <AreaChart
        width={isSm ? 340 : 730}
        height={isSm ? 220 : 250}
        data={weekData}
		margin={{left:isSm ? 20:35, right: isSm ? 20: 35}}	
		>

        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ae2db7" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ae2db7" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis axisLine={false} interval={0} dataKey="name" tickLine={false}  tickFormatter={(name)=> isSm ? name.slice(0,3) : name}/>
        {/* <YAxis axisLine={false} tick={false} tickLine={false}/> */}
        <CartesianGrid strokeDasharray="3 3"  vertical={false}/>
        <Tooltip labelClassName="text-primary "/>
        <Area
          type="monotone"
		  name="Kcal"
          dataKey="kcal"
          stroke="#ae2db7"
          fillOpacity={1}
          fill="url(#colorPv)"
		  dot={{stroke:"#ae2db7", strokeWidth:2, fill:"white"}} 
        />
      </AreaChart>
    </div>
  );
};
