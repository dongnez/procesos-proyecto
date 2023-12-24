import {z} from 'zod'
import { FoodInterfaceSchema } from "src/interfaces/FoodInterfaces";


export const DayInterfaceSchema = z.object({
	_id: z.string(),
	date: z.date(),
	foods:  z.array(z.object({
		food: FoodInterfaceSchema,
		quantity: z.number(),
	})),
	
	userId: z.string(),
});

export type DayInterface = z.infer<typeof DayInterfaceSchema>;