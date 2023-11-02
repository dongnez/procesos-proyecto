import bycrypt from "bcrypt";
import { UserModel } from "../../servidor/models/user";
import { Router } from "express";
const router = Router();
import { createAccesstoken } from "../libs/createAccessToken";
import { enviarEmail } from "servidor/clase/email";

// Define rutas y controladores para la autenticación
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await UserModel.findOne({ email });

    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado" });

    if( userFound.emailVerificated || userFound.emailVerificated === false){
      return res.status(401).json({ message: "Email no verificado" });
    }

    // Check password is the same
    const isPasswordMatch = await bycrypt.compare(password, userFound.password);
    if (!isPasswordMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccesstoken({ id: userFound._id });

    res.cookie("jwt", token);
    res.json({
      _id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      photoURL: userFound.photoURL,
      templates: userFound.templates,
    });
  } catch (error) {
    console.log("Login", error);
    res.send(error);
  }
});

router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const passwordHash = await bycrypt.hash(password, 10);

    const newUser = new UserModel({
      email,
      password: passwordHash,
      name,
    });

    const userSaved = await newUser.save();

    await enviarEmail(
       userSaved.email,
       userSaved._id,
      "Verifica tu correo",
    ).then(()=>{
      console.log("Email enviado");
    })

    const token = await createAccesstoken({ id: userSaved._id });

    res.cookie("jwt", token);
    res.json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log("Register", error);
    res.send(error);
  }
});

router.get("/confirmarUsuario/:email/:key",()=>{
  //TODO
})

router.post("/logout", (req, res) => {
  // Tu lógica de logout
  res.cookie("jwt", "", { expires: new Date(0) });
  res.send("LOGOUT");
});

router.post("/google", async (req, res) => {
  const { email, name, photoURL, provider } = req.body;

  try {
    // Busca un usuario por su dirección de correo electrónico
    let userFound = await UserModel.findOne({ email });

    if (!userFound) {
      // Si el usuario no existe, créalo
      const newUser = new UserModel({
        email,
        name,
        photoURL,
        provider,
      });

      userFound = await newUser.save();
    }

    // Devuelve el usuario encontrado (ya sea el existente o el recién creado)
    res.json({
      message: "User created or found successfully",
      user: userFound,
    });
  } catch (error) {
    console.log("Google", error);
    res.send(error);
  }
});

export const authRoutes = router;
