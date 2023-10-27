import { TemplateModel } from 'servidor/models/template';
import { UserModel } from 'servidor/models/user';
import { FoodInterfaceSchema, FoodInterface } from 'cliente/src/interfaces/FoodInterfaces';

import {Router} from 'express'

import { ZodError } from 'zod';
const router = Router();

router.post('/createTemplate', async (req, res) => {
	const {template, userId} = req.body;

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

		if(!userFound) return res.status(400).json({message:"Usuario no encontrado"})
	
		res.status(200).json({
			message: 'Template creado correctamente',
		});
		
	} catch (error) {
		console.log("Error en createTemplate",error);	
		res.status(500).json({
			message: 'Error en createTemplate',
		});
	}
});

router.post('/getTemplates', async (req, res) => {
	const {userId} = req.body;

	console.log("getTemplates",userId);

	try {
		const userFound = await UserModel.findById(userId).populate('templates');

		if(!userFound) return res.status(400).json({message:"Usuario no encontrado"})

		res.status(200).json({
			message: 'Templates obtenidos correctamente',
			templates: userFound.templates
		});
		
	} catch (error) {
		console.log("Error en getTemplates",error);	
		res.status(500).json({
			message: 'Error en getTemplates',
		});
	}

});

router.post('/deleteTemplate', async (req, res) => {
	const {templateId} = req.body;

	try {
		const templateFound = await TemplateModel.findByIdAndDelete(templateId);

		if(!templateFound) return res.status(400).json({message:"Template no encontrado"})

		res.status(200).json({
			message: 'Template eliminado correctamente',
		});
		
	} catch (error) {
		console.log("Error en deleteTemplate",error);	
		res.status(500).json({
			message: 'Error en deleteTemplate',
		});
	}
})

//get Template by id
router.post('/getTemplateById', async (req, res) => {
	const {templateId} = req.body;

	try {
		
		const template = await  TemplateModel.findById(templateId).exec();

		if(!template) return res.status(400).json({message:"Template no encontrado"})

		res.status(200).json({
			message: 'Template obtenido correctamente',
			template
		});

	}catch(error){
		console.log("Error en getTemplateById",error);
		return res.status(500).json({
			message: 'Error en getTemplateById',
		});
	}
})
	

router.post('/addFood', async (req, res) => {
	const {templateId, food} = req.body;
	
	//validte food
	
	try {
		//generate food id
		food._id = new Date().getTime().toString();
		const foodParse = FoodInterfaceSchema.parse(food)

		await TemplateModel.findByIdAndUpdate(
			templateId,
			{ $push: { foods: food } },
			{ new: true }
		);

		return res.status(200).json({
			message: 'Comida añadida correctamente',
			food: foodParse
		});

	}catch(error){
		if(error instanceof ZodError){
			return res.status(400).json({
				message: 'Error comida no válida',
				errors:error.issues
			});
		}

		res.status(500).json({
			message: 'Error al añadir comida al template',
		});	
	}
})


router.post('/getFoodById', async (req, res) => {
	const {templateId, foodId} = req.body;

	try {
		const template = await TemplateModel.findById(templateId);
		if (!template) {
			return res.status(404).json({
				message: 'Template not found'
			});
		}

		const food: FoodInterface | undefined = template.foods.find((f: FoodInterface) => f._id === foodId);

		if (!food) {
			return res.status(404).json({
				message: 'Food not found in template'
			});
		}

		return res.status(200).json({
			message: 'Food found in template',
			food
		});

	} catch (error) {
		return res.status(500).json({
			message: 'Error finding food in template',
			error
		});
	}
})

export {router as templateRoutes}