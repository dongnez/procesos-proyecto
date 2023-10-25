import axios from "axios";
import { API_URL } from "src/constants/config";

const TEMPLATES_URL = `${API_URL}templates/`;

export async function databaseGetTemplates(templateId:string,userId:string){
	return axios.post(`${TEMPLATES_URL}getAll`, {templateId,userId} )

}