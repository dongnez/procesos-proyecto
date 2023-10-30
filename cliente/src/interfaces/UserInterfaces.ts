import {z} from 'zod'

export const UserInterfaceSchema = z.object({
	_id: z.string(),
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(6),
	photoURL: z.string().optional(),
	templates: z.array(z.string()).optional(),
	provider: z.enum(["google", "github"]).optional(),
})
export type UserInterface = z.infer<typeof UserInterfaceSchema>
