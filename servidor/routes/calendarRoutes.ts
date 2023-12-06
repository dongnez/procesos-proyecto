import { Router } from "express";

const router = Router();

router.post("/addFood", async (req, res) => {
  const { templateId, food, date } = req.body;

  try {
	 
	
  } catch (error) {

    res.status(500).json({
      message: "Error al añadir comida al template",
    });
  }
});

export { router as calendarRoutes };
