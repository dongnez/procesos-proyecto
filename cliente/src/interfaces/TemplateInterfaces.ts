import { z } from "zod";
import { FoodInterfaceSchema } from "src/interfaces/FoodInterfaces";

export const TemplateInterfaceSchema = z.object({
  _id: z.string(),
  visibility: z.enum(["public", "private"]),
  name: z.string(),
  description: z.string().max(40).optional(),
  users: z.array(
    z.object({
      userId: z.string(),
      role: z.string(),
    })
  ),
  foods: z.array(FoodInterfaceSchema),
});

export type TemplateInterface = z.infer<typeof TemplateInterfaceSchema>;