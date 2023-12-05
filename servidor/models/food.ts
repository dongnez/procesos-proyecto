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
		required:true,
		minlength:3,
		maxlength:40
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
				min:0,
				max:10000
			},
			proteins:{
				type:Number,
				required:true,
				min:0,
				max:999
			},
			carbs:{
				type:Number,
				required:true,
				min:0,
				max:999
			},
			fats:{
				type:Number,
				required:true,
				min:0,
				max:999
			},
		},
		required:true
	}


},{collection: 'foods'})

export const FoodModel = model('Food', FoodScheme)