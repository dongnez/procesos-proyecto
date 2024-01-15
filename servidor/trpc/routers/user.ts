import { deconstructToken } from "servidor/middleware/validateToken";
import { TemplateModel } from "servidor/models/template";
import { UserModel } from "servidor/models/user";
import { router, publicProcedure } from "servidor/trpc/trpc";
import { z } from "zod";

export const userRouter = router({
  getUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async (opts) => {
      const { userId } = opts.input;
      const user: any = await UserModel.findById(userId);
      console.log(user);
      return user;
    }),
  getUserByToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async (opts) => {
      const { id: userId } = deconstructToken(opts.input.token);

      const user: any = await UserModel.findById(userId);
      return user;
    }),
  updateUserObjective: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        kcal: z.number(),
        proteins: z.number(),
        carbs: z.number(),
        fats: z.number(),
      })
    )
    .mutation(async (opts) => {
      const { userId, kcal, proteins, carbs, fats } = opts.input;

      const user = await UserModel.findByIdAndUpdate(
        userId,
        { objective: { kcal, proteins, carbs, fats } },
        { new: true }
      );

      return user?.objective;
    }),
  leaveGroup: publicProcedure
    .input(z.object({ userId: z.string(), templateId: z.string() }))
    .mutation(async (opts) => {
      const { userId, templateId } = opts.input;

      //remove template from user
      await UserModel.findByIdAndUpdate(userId, {
        $pull: { templates: templateId },
      });

      //remove user from template
      await TemplateModel.findByIdAndUpdate(templateId, {
        $pull: { users: { userRef: userId } },
      });
      
    }),
});
