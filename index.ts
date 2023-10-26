import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "./servidor/clase/passport-setup.js";
import { initClases } from "./servidor/clase/clasesServer.js";
import {authRoutes} from "./servidor/routes/authRoutes.js"
import { templateRoutes } from "./servidor/routes/templateRoutes.js";
import { connectMongoDB } from "./servidor/db.js";
import cors from "cors";
const PORT = process.env.PORT || 3000;

const URL = process.env.URL || "http://localhost:";
const __filename = fileURLToPath(import.meta.url);


const app = express();

app.use(
  cors({
    credentials: false,
  })
);


//Obtenemos path raiz del proyecto
const __dirname = path.dirname(__filename);

console.log("Ruta raiz", __dirname);

//ROOT
app.use(express.static(__dirname + "/cliente/dist/"));
app.use(express.json());

//MONGO
connectMongoDB();

//Clase
initClases(app);

//RUTAS
app.use('/auth', authRoutes);
app.use("/templates", templateRoutes)

app.listen(PORT, () => {
  console.log(`App está escuchando en el puerto ${URL}${PORT}`);
  console.log("Ctrl+C para salir");
});


//Ruta para cualquier otro GET que no sea las rutas definidas (APP)
app.get("*", function (request, response) {
  response.sendFile(path.join(__dirname, "/cliente/dist/index.html"));
});
