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

const dayNamesES = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
]

const monthNamesES = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
]

export const getMonthName = (monthNumber: number) => {
    return monthNamesES[monthNumber]
}

export const getFullDateName = (date:{
    year:number
    month:number
    day:number
}) => {
    const { year, month, day } = date
    const dateObject = new Date(year, month, day)
    const dayName = dayNamesES[dateObject.getDay()]
    const monthName = monthNamesES[month]
    return `${dayName}, ${day} ${monthName}`
}

export const getCurrentYear = () => {
    return dayjs().year()
}

export const nextMonth = (currentMonth: number,currentYear:number) => {
    // get next month & year number
    let nextMonthNumber = currentMonth + 1
    let nextYear = currentYear



    // if next month is january, set next year to current year + 1 & next month to 0
    if (nextMonthNumber === 12) {
        nextYear = nextYear + 1
        nextMonthNumber = 0 
    }

    return { nextMonthNumber, nextYear }
}

export const prevMonth = (currentMonth: number,currentYear:number) => {

    // get previous month & year number
    let prevMonthNumber = currentMonth - 1

    console.log("C",prevMonthNumber)

    let prevYear = currentYear

    // if previous month is december, set previous year to current year - 1 & previous month to 11
    if (prevMonthNumber === -1) {
        prevYear = prevYear - 1
        prevMonthNumber = 11 
    }

    return { prevMonthNumber, prevYear }
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