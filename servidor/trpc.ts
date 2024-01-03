import { initTRPC } from "@trpc/server";
import { z } from "zod";
import * as trpcExpress from "@trpc/server/adapters/express";
import { Express } from "express";
import { UserModel } from "servidor/models/user";
import { deconstructToken } from "servidor/middleware/validateToken";

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context

export type Context = Awaited<ReturnType<typeof createContext>>;

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
export const t = initTRPC.context<Context>().create();
export const publicProcedure = t.procedure;
export const router = t.router;
export type AppRouter = typeof appRouter;

export const appRouter = router({
  // define your endpoints here
  getUser: publicProcedure
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

      /* const user = await UserModel.findByIdAndUpdate(
        userId,
        { objective: { kcal, proteins, carbs, fats } },
        { new: true },
      ); */

      // Update name
      const user = await UserModel.findByIdAndUpdate(
        userId,
        { objective: { kcal, proteins, carbs, fats } },
        { new: true }
      );

      return user?.objective;
    }),
});

export function useTRPC(app: Express) {
  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
}
