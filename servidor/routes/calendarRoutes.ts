import { Router } from "express";
import { CalendarModel } from "servidor/models/calendar";

const router = Router();

router.post("/addFood", async (req, res) => {
  const { foodId, date, userId } = req.body;

  try {
    await CalendarModel.findOneAndUpdate(
      {
        userId: userId,
        "years.year": date.year,
        "years.months.month": date.month,
        "years.months.days.day": date.day,
      },
      {
        $push: {
          "years.$.months.$.days.$.foods": {
            food: foodId,
            quantity: 1,
          },
        },
      }
    )

    res.json({
      message: "Comida añadida al calendario",
    });
	 
	
  } catch (error) {

    res.status(500).json({
      message: "Error al añadir comida al template",
    });
  }
});

export { router as calendarRoutes };
