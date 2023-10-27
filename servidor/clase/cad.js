import {MongoClient} from "mongodb";

export function CAD(){
	this.usuario;

	this.buscarOCrearUsuario = function(email,callback){
		obtenerOCrear(this.usuarios,{email:email},callback)
	}

	function obtenerOCrear(coleccion,criterio,callback)
    {
		

        coleccion.findOneAndUpdate(criterio, {$set: criterio}, {upsert: true,returnDocument:"after",projection:{email:1}}, function(err,doc) {
           if (err) { throw err; }
           else { 
                console.log("Elemento actualizado"); 
                console.log(doc.value.email);
                callback({email:doc.value.email});
            }
         }).then(()=>{
			callback({email:criterio.email});
		 })
    }


	this.conectar = async function(callback){
		// Conecta con el servidor
		let cad = this;
		let client = new MongoClient(process.env.MONGODB_URI || "");
		await client.connect();

		
		const database=client.db("sistema");
        cad.usuarios=database.collection("usuarios");
		
		console.log("Conectado a mongodb")

		// callback(database)

	}
}