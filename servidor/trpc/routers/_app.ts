import { router,createContext } from 'servidor/trpc/trpc';
import {createExpressMiddleware} from "@trpc/server/adapters/express";
import { Express } from "express";
import { userRouter, } from "servidor/trpc/routers/user";
 
 
export const appRouter = router({
	// define your endpoints here
	user: userRouter,
});

export type AppRouter = typeof appRouter;

export function useTRPC(app: Express) {
  app.use(
    "/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
}