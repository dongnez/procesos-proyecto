import {connect} from "mongoose";

export const connectMongoDB = async () => {
	
	try {
		await connect("mongodb+srv://gnez:gnez@cluster0.43kwtts.mongodb.net/sistema?retryWrites=true&w=majority")	
		console.log("Conectado a MongoDB (Mongoose)");
	} catch (error) {
		console.log(error);	
	}
}