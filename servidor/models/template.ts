import {Schema,model} from "mongoose";
import { TemplateInterface } from "cliente/src/interfaces/TemplateInterfaces";

const TemplateSchema = new Schema<TemplateInterface>({
	name:{
		type:String,
		required:true
	},
	visibility:{
		type:String,
		required:true
	},
	food:{
		type:[],
		required:true
	},
	users:{
		type:[{userId:Schema.Types.ObjectId,role:String}],
		required:true
	}

	

},{collection: 'templates'})

export const TemplateModel = model('Template', TemplateSchema)