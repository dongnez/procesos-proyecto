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

router.post("/getYearCalendar", async (req, res) => {
  const { userId, year } = req.body;

  try {
    const calendar = await CalendarModel.find({
      userId: userId,
      date: {
        $gte: new Date(year, 0, 1),
        $lt: new Date(year + 1, 0, 1),
      },
    })
      .populate("foods.food")
      .exec();

    res.json({
      message: "Calendario obtenido",
      calendar: calendar,
    });

  } catch (error) {
    console.log("Error en getYearCalendar", error);
    res.status(500).json({
      message: "Error al obtener calendario",
    });
  }
});

router.post("/getDayCalendar", async (req, res) => {
  const { userId, date } = req.body;

  const { year, month, day } = date;

  try {
    const calendar = await CalendarModel.findOne({
      userId: userId,
      date: new Date(year, month, day),
    })
      .populate("foods.food")
      .exec();

      console.log("Calendar Populated", calendar?.foods )


    res.json({
      message: "Calendario obtenido",
      dayCalendar: calendar,
    });
  } catch (error) {
    console.log("Error en getDayCalendar", error);
    res.status(500).json({
      message: "Error al obtener calendario",
    });
  }
});

export { router as calendarRoutes };
