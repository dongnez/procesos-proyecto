import {z} from 'zod'

export const FoodInterfaceSchema = z.object({
	_id: z.string(),
	name: z.string(),
	image: z.string(),
	description: z.string().optional(),
	macros: z.object({
		kcal: z.number().min(0).max(10000),
		proteins: z.number().min(0).max(999),
		carbs: z.number().min(0).max(999),
		fats: z.number().min(0).max(999),
	}).optional(),
});

export type FoodInterface = z.infer<typeof FoodInterfaceSchema>;