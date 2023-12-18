import axios from "axios";
import { WEB_URL } from "src/constants/config";

const CALENDAR_URL = `${WEB_URL}/calendar/`;

export const databaseAddFood = async (payload: {
	userId: string;
	foodId: string;
	date: { year: number; month: number; day: number };
}) => {

	const { data } = await axios.post(`${CALENDAR_URL}addFood`, payload).catch((error) => {
		throw error;
	})

  return { data , error:null};

};
