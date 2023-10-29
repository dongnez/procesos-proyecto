import {connect} from "mongoose";

export const connectMongoDB = async () => {
	
	try {
		await connect(process.env.MONGODB_URI || "")	
		console.log("Conectado a MongoDB (Mongoose)");
	} catch (error) {
		console.log(error);	
	}
}