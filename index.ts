import "dotenv/config";
import express from "express";
import path from "path";

import "./servidor/clase/passport-setup.js";
import { initClases } from "./servidor/clase/clasesServer.js";
import { connectMongoDB } from "./servidor/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import { createServer } from "http";
import { connectSockets } from "servidor/sockets.js";
import { useRouter } from "servidor/routes/routes.ts";
import { APP_URL, PORT } from "servidor/config.js";
import { useTRPC } from "servidor/trpc/routers/_app.js";

const port = PORT

const app = express();

app.use(
  cors({
    origin: [APP_URL,"http://localhost:5173"], // or specify your frontend URL
    credentials:true,
  })
);


app.use(express.json());
app.use(cookieParser())


// Inicia codigo de clase
initClases(app);

// Define rutas y controladores para la autenticación
useRouter(app);

//TRPC
useTRPC(app);

// Conecta con la base de datos
connectMongoDB();
app.use(express.static(__dirname + "/cliente/dist/"));

//Ruta para cualquier otro GET que no sea las rutas definidas (APP)
app.use(function (request, response) {
  response.sendFile(path.join(__dirname, "/cliente/dist/index.html"));
});


const server = createServer(app); 

//SOCKETS
connectSockets(server);

server.listen(port, () => {
  console.log(`App está escuchando en el puerto ${port}`);
  console.log("Ctrl+C para salir");
});