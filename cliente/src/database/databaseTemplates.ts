import axios from "axios";
import { TemplateInterface } from "src/interfaces/TemplateInterfaces";
import { API_URL } from "src/constants/config";

const TEMPLATES_URL = `${API_URL}templates/`;

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
