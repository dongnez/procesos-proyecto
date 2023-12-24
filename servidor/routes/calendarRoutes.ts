import { Router } from "express";
import { CalendarModel } from "servidor/models/calendar";

const router = Router();

router.post("/addFood", async (req, res) => {
  const { foodId, date, userId } = req.body;

  const { year, month, day } = date;

  try {
    await CalendarModel.findOneAndUpdate(
      {
        userId: userId,
        date: new Date(year, month, day),
      },
      {
        $push: {
          foods: {
            food: foodId,
            quantity: 1,
          },
        },
      },
      { upsert: true }
    );

    res.json({
      message: "Comida añadida al calendario",
    });
  } catch (error) {
    console.log("Error en addFood", error);
    res.status(500).json({
      message: "Error al añadir comida al template",
    });
  }
});

export { router as calendarRoutes };
