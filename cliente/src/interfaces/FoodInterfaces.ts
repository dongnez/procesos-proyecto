import {z} from 'zod'

export const FoodTimeSchema = z.enum(['all','breakfast', 'lunch', 'dinner', 'snack'] as const).default('all');

export const FoodInterfaceSchema = z.object({
	_id: z.string(),
	templateId: z.string(),
	name: z.string(),
	image: z.string(),
	timeType: FoodTimeSchema,
	description: z.string().optional(),
	macros: z.object({
		kcal: z.number().min(0).max(10000),
		proteins: z.number().min(0).max(999),
		carbs: z.number().min(0).max(999),
		fats: z.number().min(0).max(999),
	}).optional(),
});

export type FoodInterface = z.infer<typeof FoodInterfaceSchema>;
export type FoodTimeType = z.infer<typeof FoodTimeSchema>;