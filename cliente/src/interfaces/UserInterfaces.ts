import { FoodInterfaceSchema } from 'src/interfaces/FoodInterfaces'
import {z} from 'zod'

export const UserInterfaceSchema = z.object({
	_id: z.string(),
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(6),
	photoURL: z.string().optional(),
	templates: z.array(z.string()).optional(),
	provider: z.enum(["google", "github"]).optional(),
	emailVerificated: z.boolean().optional(),
	objective: z.object({
		kcal: z.number(),
		proteins: z.number(),
		carbs: z.number(),
		fats: z.number(),
	}).optional(),
	recentFoods: z.array(FoodInterfaceSchema).optional(),
})
export type UserInterface = z.infer<typeof UserInterfaceSchema>
