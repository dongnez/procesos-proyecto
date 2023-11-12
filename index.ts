import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import "./servidor/clase/passport-setup.js";
import { initClases } from "./servidor/clase/clasesServer.js";
import { authRoutes } from "./servidor/routes/authRoutes.js";
import { templateRoutes } from "./servidor/routes/templateRoutes.js";
import { connectMongoDB } from "./servidor/db.js";
import { createUploadthingExpressHandler } from "uploadthing/express";
import { uploadRouter } from "./servidor/routes/uploadFiles.js";
import cors from "cors";
// const PORT =  parseInt(process.env.PORT as any) || 8080;

const port = process.env.PORT || 8080;

const app = express();

/* const URL = process.env.URL || "http://localhost:";
const __filename = fileURLToPath(import.meta.url);

*/

/*const __dirname = path.dirname(__filename);
console.log("Ruta raiz", __dirname); */

app.use(
  cors({
    credentials: false,
  })
);

app.use(express.static(__dirname + "/cliente/dist/"));
app.use(express.json());


initClases(app);

app.use("/auth", authRoutes);
app.use("/templates", templateRoutes);
app.use( //Upload files
  '/api/uploadthing',
  createUploadthingExpressHandler({
    router: uploadRouter,
  })
);

connectMongoDB();

//Ruta para cualquier otro GET que no sea las rutas definidas (APP)
app.use(function (request, response) {
  response.sendFile(path.join(__dirname, "/cliente/dist/index.html"));
});

app.listen(port, () => {
  console.log(`App está escuchando en el puerto ${port}`);
  console.log("Ctrl+C para salir");
});