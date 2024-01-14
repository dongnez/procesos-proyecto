import { CalendarModel } from "servidor/models/calendar";
import { router, publicProcedure } from "servidor/trpc/trpc";
import { z } from "zod";

export const calendarRouter = router({
  updateQuantityFood: publicProcedure
    .input(
      z.object({
        foodId: z.string(),
        newQuantity: z.number(),
        userId: z.string(),
        date: z.object({
          year: z.number(),
          month: z.number(),
          day: z.number(),
        }),
      })
    )
    .mutation(async (opts) => {
      const { newQuantity, foodId, userId, date } = opts.input;

      const { year, month, day } = date;

      await CalendarModel.findOneAndUpdate(
        {
          userId: userId,
          date: new Date(year, month, day),
        },
        {
          $set: {
            foods: {
              food: foodId,
              quantity: newQuantity,
            },
          },
        },
      );

      return newQuantity;
    }),
  removeFood: publicProcedure
    .input(
      z.object({
        foodId: z.string(),
        userId: z.string(),
        date: z.object({
          year: z.number(),
          month: z.number(),
          day: z.number(),
        }),
      })
    )
    .mutation(async (opts) => {
      const { foodId, userId, date } = opts.input;

      const { year, month, day } = date;

      await CalendarModel.findOneAndUpdate(
        {
          userId: userId,
          date: new Date(year, month, day),
        },
        {
          $pull: {
            foods: {
              food: foodId,
            },
          },
        }
      );

      return true;
    }),
});
