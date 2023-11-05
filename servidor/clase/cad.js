import { MongoClient } from "mongodb";

export function CAD() {
  this.usuario;

  this.buscarOCrearUsuario = function (user, callback) {
    obtenerOCrear(this.usuarios, user, callback);
  };

  function obtenerOCrear(coleccion, criterio, callback) {
    coleccion
      .findOneAndUpdate(
        criterio,
        { $set: criterio },
        { upsert: true, returnDocument: "after" },
        function (err, doc) {
          if (err) {
            if (err instanceof MongoServerError && err.code === 11000) {
              console.log(
                "Duplicado detectado, manejando el error de duplicado",
                doc
              );
            } else {
              console.log("Elemento actualizado CRITERIO ", criterio, doc);
              callback(doc);
            }
          }
        }
      )
      .then((res) => {
        callback(res);
      })
      .catch((error) => {
        console.log("Error al buscar o crear", error);
      });
  }

  this.conectar = async function (callback) {
    // Conecta con el servidor
    let cad = this;
    let client = new MongoClient(process.env.MONGODB_URI || "");
    await client.connect();

    const database = client.db("sistema");
    cad.usuarios = database.collection("usuarios");

    console.log("Conectado a mongodb");

    // callback(database)
  };
}
