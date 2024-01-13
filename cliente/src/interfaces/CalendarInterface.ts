import {z} from 'zod'
import { FoodInterfaceSchema } from "src/interfaces/FoodInterfaces";

export const FoodDayInterfaceSchema = z.object({
		food: FoodInterfaceSchema,
		quantity: z.number(),
})

export const DayInterfaceSchema = z.object({
	_id: z.string(),
	date: z.date(),
	foods: z.array(FoodDayInterfaceSchema),
	userId: z.string(),
});

export type DayInterface = z.infer<typeof DayInterfaceSchema>;
export type FoodDayInterface = z.infer<typeof FoodDayInterfaceSchema>;