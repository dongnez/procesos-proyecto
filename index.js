import express from "express";
import path from 'path';
import { fileURLToPath } from "url";
import { Sistema } from "./servidor/modelo.js";

const app = express();

//const modelo = require("./servidor/modelo.js");
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'http://localhost:'

console.log("URL", URL, "PORT", PORT);

const __filename = fileURLToPath(import.meta.url)

//Obtenemos path raiz del proyecto
const __dirname = path.dirname(__filename) 
console.log("Ruta raiz", __dirname)

app.use(express.static(__dirname + "/cliente/dist/"));

app.get("/", function (request, response) {
  response.sendFile(
    path.join(__dirname, "/cliente/dist/index.html")
  )
});


//Simulacion Base de datos
const sistema = new Sistema();

app.get("/agregarUsuario/:nick",function(request,response){
  let nick=request.params.nick; 

  //Check if nick is already in use
  if (sistema.obtenerUsuarios()[nick]){
    console.log("Usuario ya existe", nick);
    //error response
    response.send({error: "Usuario ya existe"});
    return;
  }

  let res = sistema.agregarUsuario(nick);
  console.log("Agregando usuario", nick,res);
  response.send(res);
});

app.get("/obtenerUsuarios",function(request,response){
  let res = sistema.obtenerUsuarios();
  console.log("Obteniendo usuarios",res);
  response.send(res);
});

app.get("/eliminarUsuario/:nick",function(request,response){
  let nick=request.params.nick; 
  let res = sistema.deleteUsuario(nick);
  console.log("Eliminando usuario", nick,res);
  response.send(res);
});

app.get("/usuarioActivo/:nick",function(request,response){
  let nick=request.params.nick; 
  let res = sistema.usuarioActivo(nick);
  console.log("Usuario activo", nick,res);
  response.send(res);
}
);

app.listen(PORT, () => {
  console.log(`App está escuchando en el puerto ${URL}${PORT}`);
  console.log("Ctrl+C para salir");
});
