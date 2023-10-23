import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import { Sistema } from "./servidor/modelo.js";
import passport from "passport";
import "./servidor/passport-setup.js";

const app = express();

const PORT = process.env.PORT || 3000;
const URL = process.env.URL || "http://localhost:";
const __filename = fileURLToPath(import.meta.url);

//sistema
const sistema = new Sistema();

//Obtenemos path raiz del proyecto
const __dirname = path.dirname(__filename);

console.log("Ruta raiz", __dirname);

//ROOT
app.use(express.static(__dirname + "/cliente/dist/"));


// app.get("/app", function (request, response) {
//   response.sendFile(path.join(__dirname, "/cliente/dist/index.html"));
// });

//PASSPORT SETUP
app.use(
  session({
    secret: "procesos-secret",
    resave: false,
    saveUninitialized: false,
    name: "Sistema",
    store: new session.MemoryStore(),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/google",passport.authenticate('google', { scope: ['profile','email'] }));

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/fallo" }),
  function (req, res) {
    res.redirect("/good");
  }
);

app.get("/good", function (request, response) {
  /*   let nick=request.user.emails[0].value;
  if (nick){
  sistema.agregarUsuario(nick);
  }
  //console.log(request.user.emails[0].value);
  response.cookie('nick',nick);
  response.redirect('/'); */


  let email = request.user.emails[0].value;
  sistema.buscarOCrearUsuario(email, function (obj) {
    console.log("Usuario creado...");
    response.cookie("nick", obj.email);
    response.redirect("/app");
  });
});

app.get("/fallo", function (request, response) {
  response.errored("Fallo al autenticar");
});




app.get("/agregarUsuario/:nick",async function (request, response) {
  let nick = request.params.nick;

  //Check if nick is already in use
  if (sistema.obtenerUsuarios()[nick]) {
    console.log("Usuario ya existe", nick);
      response.cookie("nick", nick);
      response.send(res);
    
    return;
  }

  let res = await sistema.agregarUsuario(nick);

  console.log("Agregando usuario", nick);
  response.cookie("nick", nick);
  response.send(res);
});

app.get("/obtenerUsuarios", function (request, response) {
  let res = sistema.obtenerUsuarios();
  console.log("Obteniendo usuarios", res);
  response.send(res);
});

app.get("/eliminarUsuario/:nick", function (request, response) {
  let nick = request.params.nick;
  let res = sistema.deleteUsuario(nick);
  console.log("Eliminando usuario", nick, res);
  response.send(res);
});

app.get("/usuarioActivo/:nick", function (request, response) {
  let nick = request.params.nick;
  let res = sistema.usuarioActivo(nick);
  console.log("Usuario activo", nick, res);
  response.send(res);
});

app.listen(PORT, () => {
  console.log(`App está escuchando en el puerto ${URL}${PORT}`);
  console.log("Ctrl+C para salir");
});


// Ruta para cualquier otro GET que no sea las rutas definidas (APP)
app.get("*", function (request, response) {
  response.sendFile(path.join(__dirname, "/cliente/dist/index.html"));
});
