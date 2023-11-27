import { useState } from "react"
import { Month } from "src/pages/calendar/Month";
import { getCurrentMonthNumber } from "src/utils/calendarUtils";

export const Calendar = () => {

  
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthNumber());
  
  return (
	  <div className="h-full py-2 overflow-auto">
      <section className="max-w-[750px] max-h-[350px] sm:max-h-[600px] h-full mx-auto">
        <header>s</header>
        <Month selectedMonth={selectedMonth} />
      </section>
      
    </div>
  )
}
