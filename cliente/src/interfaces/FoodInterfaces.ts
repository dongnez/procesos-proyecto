import {z} from 'zod'

export const FoodInterfaceSchema = z.object({
	_id: z.string(),
	name: z.string(),
	image: z.string(),
	macros: z.object({
		kcal: z.number(),
		protein: z.number(),
		carbs: z.number(),
		fats: z.number(),
	}).optional(),
});

export type FoodInterface = z.infer<typeof FoodInterfaceSchema>;