import { z } from "zod";
import { FoodInterfaceSchema } from "src/interfaces/FoodInterfaces";
import { UserInterface } from "src/interfaces/UserInterfaces";

export const TemplateInterfaceSchema = z.object({
  _id: z.string(),
  visibility: z.enum(["public", "private"]),
  name: z.string(),
  description: z.string().max(40).optional(),
  users: z.array(
    z.object({
      userRef: z.string(),
      role: z.string(),
    })
  ),
  foods: z.array(FoodInterfaceSchema),
});

export type TemplateInterface = z.infer<typeof TemplateInterfaceSchema>;

export type TemplateInterfaceClient = Omit<TemplateInterface, "users"> & {
  users: Array< {userRef:UserInterface, role: string }>;
};