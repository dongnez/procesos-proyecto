import { TemplateModel } from "servidor/models/template";
import { UserModel } from "servidor/models/user";
import { Router } from "express";
import { ZodError } from "zod";
import { FoodModel } from "servidor/models/food";
import { deconstructToken } from "servidor/middleware/validateToken";
const router = Router();

router.post("/createTemplate", async (req, res) => {
  const { template, userId } = req.body;

  try {
    delete template._id;

    // Generate a random invite code
    template.inviteCode = Math.random().toString(36).substring(2, 8);

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

router.get("/invite/:templateId/:inviteCode", async (req, res) => {
  const { templateId, inviteCode } = req.params;

  const { token } = req.cookies;
  const { id } = deconstructToken(token);

  const user = await UserModel.findById(id);

  if (!user) return res.status(400).json({ message: "User not found" });

  //redirect to login
  if (!token) return res.redirect("/login");

  try {
    //Find template by id & check if invite code is correct then add user to template & add template to user
    await TemplateModel.findById(templateId).then(async (template) => {
      if(!template) return res.status(400).json({ message: "Template not found" });

      console.log(template,template.id,template["inviteCode"]);
      if (template?.inviteCode === inviteCode) {
        template.users.push({ userRef: user._id, role: "viewer" });
        template.save();

        // Add the new template ID to the user's templates array
        await UserModel.findByIdAndUpdate(
          user._id,
          { $addToSet: { templates: template._id } },
          { new: true }
        )

        res.redirect("/app/templates/"+templateId); 
        return res.status(200).json({
          message: "Template joined successfully",
        });
      }
    });

    res.redirect("/app/home/"); 
    return res.status(400).json({
      message: "Invite code incorrect",
    });
  } catch (error) {
    console.log("Error en getTemplates", error);
    res.status(500).json({
      message: "Error en getTemplates",
    });
  }
});

router.post("/newCode", async (req, res) => {

  const { templateId } = req.body;

  // Generate a random invite code
  const newInviteCode = Math.random().toString(36).substring(2, 8);

  TemplateModel.findByIdAndUpdate(
    templateId,
    { inviteCode: newInviteCode },
    { new: true }
  ).catch((error) => {
    console.log("Error en TEMPLATE", error);
    return res.status(500).json({
      message: "Error en newCode",
    });

  });

  return res.status(200).json({
    message: "New invite code generated",
    code:newInviteCode,
  });


})



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

router.get("/getFoods/:templateId", async (req, res) => {
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
  const { foodId } = req.body;

  try {
    const food = await FoodModel.findById(foodId);

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
