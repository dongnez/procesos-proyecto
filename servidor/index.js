import express from "express";
import path from 'path';
import { fileURLToPath } from "url";

const app = express();

//const modelo = require("./servidor/modelo.js");
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'http://localhost:'

const __filename = fileURLToPath(import.meta.url)

//Obtenemos path raiz del proyecto
const __dirname = path.dirname(path.dirname(__filename)) 
console.log("Ruta raiz", __dirname)

app.use(express.static(__dirname + "/cliente/dist/"));

app.get("/", function (request, response) {
  response.sendFile(
    path.join(__dirname, "/cliente/dist/index.html")
  )
});

app.listen(PORT, () => {
  console.log(`App está escuchando en el puerto ${URL}${PORT}`);
  console.log("Ctrl+C para salir");
});
