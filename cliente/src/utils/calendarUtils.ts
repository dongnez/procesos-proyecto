import dayjs from 'dayjs'
import 'dayjs/locale/es'

export const getCurrentMonthNumber = () => {
	const month = dayjs().month()
	return month
}

export const getCurrentDayNumber = () => {
	const day = dayjs().date()
	return day
}

/*
* Returns Matrix of days of the month with the days of the previous and next month
* @param monthNumber: number
* @returns month [][]
*/
export function getMonth(month:number = Number(dayjs().month()) ){
    
    const year = dayjs().year();
    const firstDayMonth = dayjs(new Date(year,Number(month),1)).day();
    let currentMonthCount = 0 - firstDayMonth;
    let arrayNumber = 5;

    if(currentMonthCount <= -5) arrayNumber = 6;

    const daysMatrix = new Array(arrayNumber).fill([]).map(()=>{
        return new Array(7).fill({}).map(()=>{
            currentMonthCount++;
            return dayjs(new Date(year,Number(month),currentMonthCount)).locale('es')
        });
    });

    
    return daysMatrix;
}