import {Schema,} from "mongoose";
import { FoodInterface } from "cliente/src/interfaces/FoodInterfaces";

const FoodScheme = new Schema<FoodInterface>({
	name:{
		type:String,
		required:true,
		minlength:3,
		maxlength:40
	},


},{collection: 'foods'})

// export const FoodModel = model('Food', FoodScheme)