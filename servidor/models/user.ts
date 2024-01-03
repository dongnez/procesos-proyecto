import {Schema,model} from "mongoose";
import { UserInterface } from "cliente/src/interfaces/UserInterfaces";

const UserSchema = new Schema<UserInterface>({
	email:{
		type: String,
		unique: true,
		required: [true, 'El correo es necesario'],
	},
	password:{
		type: String,
		// unique: true,
		// select: false,
	},
	emailVerificated:{
		type: Boolean,
		unique: false,
		required: false,
	},
	provider:{
		type: String,
		unique: false,
		required: false,
	},
	photoURL:{
		type: String,
		unique: false,
		required: false,
	},
	name:{
		type: String,
		unique: false,
		required: [true, 'El nombre es necesario'],
		minLenght: [3, 'El nombre es muy corto'],
		maxLenght: [40, 'El nombre es muy largo'],
	},
	templates: [{
		type: Schema.Types.ObjectId,
		ref: 'Template'
	}]

},{collection: 'usuarios'})

export const UserModel = model('User', UserSchema)