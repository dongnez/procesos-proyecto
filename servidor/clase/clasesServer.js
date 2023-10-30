import passport from "passport";
import session from "express-session";
import { Sistema } from "./modelo.js";
import axios from "axios";

export function initClases(app) {
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

  //sistema
  const sistema = new Sistema();

  app.get(
    "/googleStartAuth",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/fallo" }),
    async function (req, res) {
      
      const email = req.user.emails[0].value;
      const name = req.user.displayName;
      const photoURL = req.user.photos[0].value;

      const response = await axios.post(process.env.APP_URL+'/auth/google', {
        email,
        name,
        photoURL,
        provider: 'google',
      },{headers: {
        'Content-Type': 'application/json'
      }});

      // console.log("RESPONSE",response)
      if(response.data.error){
        res.status(500).json({ error: "Error in Google authentication" });
      }

      if(response.data.user){
        console.log("Google USR",response.data.user)
        res.cookie("user", JSON.stringify(response.data.user));
        res.redirect("/app");
      }
    }
  );

  app.get("/good", function (request, response) {
    console.log("Autenticado con exito", request.user);

    const email = request.user.emails[0].value;
    const name = request.user.displayName;
    const photoURL = request.user.photos[0].value;

    sistema.buscarOCrearUsuario(
      {
        email: email,
        name: name,
        photo: photoURL,
        provider: "google",
      },
      function (user) {
        console.log("Usuario GOOGLE AUTH...", user);
        response.cookie("user", JSON.stringify(user));
        response.redirect("/app");
      }
    );
  });

  app.get("/fallo", function (request, response) {
    response.errored("Fallo al autenticar");
  });

  app.get("/agregarUsuario/:nick", async function (request, response) {
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

  app.post("/enviarJwt", function (request, response) {
    let jwt = request.body.jwt;
    let user = JSON.parse(atob(jwt.split(".")[1]));

    console.log("Usuario JWT...", user);

    const email = user.email;
    const name = user.name;
    const photoURL = user.picture;

    sistema.buscarOCrearUsuario(
      {
        email: email,
        name: name,
        photo: photoURL,
        provider: "google",
      },
      function (user) {
        console.log("Usuario GOOGLE AUTH...", user);
        response.cookie("user", JSON.stringify(user));
        response.redirect("/app");
      }
    );
  });
}
