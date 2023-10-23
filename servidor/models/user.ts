import {Schema,model} from "mongoose";

const UserSchema = new Schema({
	email:{
		type: String,
		unique: true,
		required: [true, 'El correo es necesario'],
	},
	password:{
		type: String,
		unique: true,
		select: false,
	},
	fullname:{
		type: String,
		unique: false,
		required: [true, 'El nombre es necesario'],
		minLenght: [3, 'El nombre es muy corto'],
		maxLenght: [40, 'El nombre es muy largo'],
	}
})

export const UserModel = model('User', UserSchema)