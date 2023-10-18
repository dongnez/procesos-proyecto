import mongo from "mongodb";

export function CAD(){
	this.usuario;

	this.buscarOCrearUsuario = function(email,callback){
		obtenerOCrear(this.usuarios,{email:email},callback)
	}

	this.obtenerOCrear = function(){
		//TODO
	}

	this.conectar = async function(callback){
		// Conecta con el servidor
		let cad = this;
		let client= new mongo("mongodb+srv://gnezdeveloper:<2MW4Irv2lYh0wnBQ>@cluster0.8ipdsqw.mongodb.net/?retryWrites=true&w=majority");
		await client.connect();

		console.log("Conectado a la base de datos")
		const database=client.db("sistema");


	}
}