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
  getSemanalStats: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        month: z.number(),
        year: z.number(),
        week: z.array(z.number()),
      })
    ).query(async (opts) => {
      const { userId, week,month,year } = opts.input;

      //Get days of the week of that yearn & month from user
      const days = await CalendarModel.find({
        userId: userId,
        date: {
          $gte: new Date(year,month,week[0]),
          $lte: new Date(year,month,week[6]),
        },
      }).populate("foods.food"); 

      //Return days of the week or null with an array
      const weekDays = week.map((dayNum) => {
        const dayFinal = days.find((day) => day.date.getDate() === dayNum);
        if (dayFinal) {
          return dayFinal;
        } else {
          return null;
        }
      })

      return weekDays;
    })
      
});
