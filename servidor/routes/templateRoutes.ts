import { TemplateModel } from "servidor/models/template";
import { UserModel } from "servidor/models/user";
import {
  FoodInterfaceSchema,
  FoodInterface,
} from "cliente/src/interfaces/FoodInterfaces";
import { Router } from "express";
import { ZodError } from "zod";
import { FoodModel } from "servidor/models/food";
const router = Router();

router.post("/createTemplate", async (req, res) => {
  const { template, userId } = req.body;

  try {
    delete template._id;
    const newTemplate = new TemplateModel(template);

    // Add the new template to the database
    await newTemplate.save();

    // Add the new template ID to the user's templates array
    const userFound = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { templates: newTemplate._id } },
      { new: true }
    );

    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    res.status(200).json({
      message: "Template creado correctamente",
    });
  } catch (error) {
    console.log("Error en createTemplate", error);
    res.status(500).json({
      message: "Error en createTemplate",
    });
  }
});

router.post("/getTemplates", async (req, res) => {
  const { userId } = req.body;

  try {
    const userFound = await UserModel.findById(userId).populate({
      path: "templates",
      populate: [
        {
          path: "users.userRef", // Poblamos la referencia al modelo Usuario dentro de cada template
        },
      ],
    });

    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    res.status(200).json({
      message: "Templates obtenidos correctamente",
      templates: userFound.templates,
    });
  } catch (error) {
    console.log("Error en getTemplates", error);
    res.status(500).json({
      message: "Error en getTemplates",
    });
  }
});

router.get("/invite/:groupId/:inviteCode", async (req, res) => {
  const { groupId, inviteCode } = req.params;

  //get user id from user
  /*     if(req.headers?.cookie)
      req.headers.cookie.split(";").forEach((cookie) => {
          const [key, value] = cookie.split("=");
          if (key.trim() === "user") {
              const user = JSON.parse(decodeURIComponent(value));
              console.log("User",user)
          }
      }); */

  return res.status(200).json({
    message: "Invite code found",
    inviteCode,
  });

  try {
    const template = await TemplateModel.findByIdAndUpdate(
      groupId,
      { inviteCode },
      { new: true }
    ); // TemplateModel

    if (!template) {
      return res.status(404).json({
        message: "Template not found",
      });
    }

    return res.status(200).json({
      message: "Template found",
      template,
    });
  } catch (error) {
    console.log("Error en getTemplates", error);
    res.status(500).json({
      message: "Error en getTemplates",
    });
  }
});

router.post("/deleteTemplate", async (req, res) => {
  const { templateId } = req.body;

  try {
    const templateFound = await TemplateModel.findByIdAndDelete(templateId);

    if (!templateFound)
      return res.status(400).json({ message: "Template no encontrado" });

    res.status(200).json({
      message: "Template eliminado correctamente",
    });
  } catch (error) {
    console.log("Error en deleteTemplate", error);
    res.status(500).json({
      message: "Error en deleteTemplate",
    });
  }
});

//get Template by id
router.post("/getTemplateById", async (req, res) => {
  const { templateId } = req.body;

  try {
    const template = await TemplateModel.findById(templateId)
      .populate([
        {
          path: "users.userRef", // Poblamos la referencia al modelo Usuario
        },
      ])
      .exec();

    if (!template)
      return res.status(400).json({ message: "Template no encontrado" });

    res.status(200).json({
      message: "Template obtenido correctamente",
      template,
    });
  } catch (error) {
    console.log("Error en getTemplateById", error);
    return res.status(500).json({
      message: "Error en getTemplateById",
    });
  }
});

router.post("/addFood", async (req, res) => {
  const { food } = req.body;

  try {
    //Add food to Foods collection
    const newFood = new FoodModel(food);
    await newFood.save();

    await TemplateModel.findByIdAndUpdate(
      food.templateId,
      { $push: { foods: newFood._id } },
      { new: true }
    ).catch((error) => {
      console.log("Error en TEMPLATE", error);
    });

    return res.status(200).json({
      message: "Comida añadida correctamente",
      food: newFood,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Error comida no válida",
        errors: error.issues,
      });
    }

    res.status(500).json({
      message: "Error al añadir comida al template",
    });
  }
});

router.get("getFoods/:templateId", async (req, res) => {
  const { templateId } = req.params;

  try {
    const foods = await FoodModel.find({ templateId: templateId });

    if (!foods)
      return res.status(400).json({ message: "Alimentos no encontrados" });

    res.status(200).json({
      message: "Alimentos obtenidos correctamente",
      foods: foods,
    });
  } catch (error) {
    console.log("Error en getFoods", error);
    res.status(500).json({
      message: "Error en getFoods",
    });
  }
});

router.post("/getFoodById", async (req, res) => {
  const { templateId, foodId } = req.body;

  try {
    const template = await TemplateModel.findById(templateId);
    if (!template) {
      return res.status(404).json({
        message: "Template not found",
      });
    }

    const food: FoodInterface | undefined = template.foods.find(
      (f: FoodInterface) => f._id === foodId
    );

    if (!food) {
      return res.status(404).json({
        message: "Food not found in template",
      });
    }

    return res.status(200).json({
      message: "Food found in template",
      food,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error finding food in template",
      error,
    });
  }
});

router.get("/invite/:inviteCode", async (req, res) => {
  const { inviteCode } = req.params;

  res.status(200).json({
    message: "Invite code found",
    inviteCode,
  });
});

export { router as templateRoutes };
