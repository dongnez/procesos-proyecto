import axios from "axios";
import { trpcClient } from "src/api/trpc";
import { WEB_URL } from "src/constants/config";
import { DayInterface } from "src/interfaces/CalendarInterface";

const CALENDAR_URL = `${WEB_URL}/calendar/`;

export const databaseAddFood = async (payload: {
	userId: string;
	foodId: string;
	date: { year: number; month: number; day: number };
}) => {

	const { data } = await axios.post(`${CALENDAR_URL}addFood`, payload).catch((error) => {
		throw error;
	}).then((res) => {
		// add food to recent 
		trpcClient.user.addRecentFood.mutate({...payload});

		return res.data;
	})

  return { data , error:null};
};

export const databaseGetDayCalendar = async (payload: {
	userId: string;
	date: { year: number; month: number; day: number };
}):Promise<DayInterface | null> => {

	const { data } = await axios.post(`${CALENDAR_URL}getDayCalendar`, payload).catch((error) => {
		throw error;
	})

  return  data?.dayCalendar || null;
}

export const databaseGetYearCalendar = async (payload: {
	userId: string;
	year: number;
}) => {

	const { data } = await axios.post(`${CALENDAR_URL}getYearCalendar`, payload).catch((error) => {
		throw error;
	})

  return { data , error:null};
}