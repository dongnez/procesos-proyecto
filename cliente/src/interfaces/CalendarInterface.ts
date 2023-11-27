import {z} from 'zod'


export const DayInterfaceSchema = z.object({
	_id: z.string(),
	day: z.number(),
	month: z.number(),
});

export type DayInterface = z.infer<typeof DayInterfaceSchema>;