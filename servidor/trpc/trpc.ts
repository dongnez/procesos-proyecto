import { initTRPC } from "@trpc/server";
import {CreateExpressContextOptions} from "@trpc/server/adapters/express";
import { authRequired } from "servidor/middleware/validateToken";


export const createContext = ({
  req,
  res,
}: CreateExpressContextOptions) => ({
  req,
  res,
}); // no context

export type Context = Awaited<ReturnType<typeof createContext>>;

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
export const t = initTRPC.context<Context>().create();
export const isAuth = t.middleware(({ctx,next})=>{
  return authRequired(ctx.req,ctx.res,next)
});
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuth);
export const router = t.router;

