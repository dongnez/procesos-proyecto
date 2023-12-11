import axios from "axios";
import { WEB_URL } from "src/constants/config";
import { FoodInterface } from "src/interfaces/FoodInterfaces";

const CALENDAR_URL = `${WEB_URL}/calendar/`;

export const databaseAddFood = async (payload: {
	userId: string;
	food: FoodInterface;
	date: { year: number; month: number; day: number };
}) => {

	const { data } = await axios.post(`${CALENDAR_URL}addFood`, payload).catch((error) => {
		console.log("Error en databaseAddFood", error);
		return { data: null, error};
	})

  return { data , error:null};

};
