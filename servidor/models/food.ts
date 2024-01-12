import {Schema, model,} from "mongoose";
import { FoodInterface,} from "cliente/src/interfaces/FoodInterfaces";

const FoodScheme = new Schema<FoodInterface>({
	name:{
		type:String,
		required:true,
		minlength:3,
		maxlength:40
	},
	templateId:{
		type: String,
		ref: 'Template',
		required:true
	},
	description:{
		type:String,
		required:false,
		default:''
	},
	image:{
		type:String,
		required:true,
	},
	timeType:{
		type:String,
		required:true,
		// enum: FoodTimeSchema,
		default:'all'
	},
	macros:{
		type:{
			kcal:{
				type:Number,
				required:true,
				default:0,
				min:0,
				max:10000
			},
			proteins:{
				type:Number,
				default:0,
				required:true,
				min:0,
				max:999
			},
			carbs:{
				type:Number,
				default:0,
				required:true,
				min:0,
				max:999
			},
			fats:{
				type:Number,
				default:0,
				required:true,
				min:0,
				max:999
			},
		},
		_id:false,
		required:true
	}


},{collection: 'foods'})

export const FoodModel = model('Food', FoodScheme)