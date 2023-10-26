import { TemplateModel } from 'servidor/models/template';
import { UserModel } from 'servidor/models/user';
import {Router} from 'express'
const router = Router();

router.post('/createTemplate', async (req, res) => {
	const {template, userId} = req.body;

	try {
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

export {router as templateRoutes}