import axios from "axios";
import { TemplateInterface, TemplateInterfaceClient } from "src/interfaces/TemplateInterfaces";
import { FoodInterface } from "src/interfaces/FoodInterfaces";
import { WEB_URL } from "src/constants/config";
import { socket } from "src/utils/socket";

const TEMPLATES_URL = `${WEB_URL}/templates/`;

export async function databaseGetUserTemplates(userId:string){
	let error = null;
	const {data} = await axios.post(`${TEMPLATES_URL}getTemplates`, {userId})
	.catch((error_) => {
		console.log("Error en databaseGetUserTemplates",error_);
		error = error_.response.data.message || "Error en databaseGetUserTemplates";
		return {data:[]}
	})


	return {data:data.templates,error}
}

export async function databaseCreateTemplate(payload: {template:TemplateInterface,userId:string}){
	let error = null;
	await axios.post(`${TEMPLATES_URL}createTemplate`, payload,)
	.catch((error) => {
		console.log("Error en databaseCreateTemplate",error);
		error = error.response.data.message || "Error en databaseCreateTemplate";
		return {data:[]}
	});

	return {data:null,error}
}

export async function databaseAddFoodToTemplate(payload: {templateId:string,food:FoodInterface}){
	let error = null;
	const {data} = await axios.post(`${TEMPLATES_URL}addFood`, payload,)
	.catch((error) => {
		console.log("Error en databaseAddFood",error);
		error = error.response.data.message || "Error en databaseAddFood";
		return {data:null}
	});

	const food:FoodInterface | null = data?.food || null;

	if(food){
		socket.emit("addFood", {food:food});
	}


	return {data:food,error}
}

export async function databaseGetFoodById(templateId:string,foodId:string):Promise<{data:FoodInterface|null,error:string|null}>{
	let error = null;
	const {data} = await axios.post(`${TEMPLATES_URL}getFoodById`, {templateId,foodId})
	.catch((error_) => {
		console.log("Error en databaseGetFoodById PENE",error_);
		error = error_.response.data.message || "Error en databaseGetFoodById";
		return {data:null}
	})

	return {data:data?.food || null,error}
}

export async function databaseGetTemplateById(templateId:string):Promise<{data:TemplateInterfaceClient|null,error:string|null}>{
	let error = null;
	const {data} = await axios.post(`${TEMPLATES_URL}getTemplateById`, {templateId})
	.catch((error_) => {
		console.log("Error en databaseGetTemplateById",error_);
		error = error_.response.data.message || "Error en databaseGetTemplateById";
		return {data:null}
	})

	return {data:data.template,error}
}

export async function databaseGetFoodsFromTemplate(templateId:string):Promise<{data:Array<FoodInterface>,error:string|null}>{
	let error = null;
	const {data} = await axios.get(`${TEMPLATES_URL}getFoods/${templateId}`) 
	.catch((error_) => {
		console.log("Error en databaseGetFoodsFromTemplate",error_);
		error = error_.response.data.message || "Error en databaseGetFoodsFromTemplate";
		return {data: []}
	})

	return {data: data?.foods || [], error}
}