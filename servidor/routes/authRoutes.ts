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

    if (
      userFound.emailVerificated === undefined ||
      userFound.emailVerificated === false
    ) {
      return res
        .status(401)
        .json({ message: "Email no verificado", errorCode: 2 });
    }

    // Check password is the same
    const isPasswordMatch = await bycrypt.compare(password, userFound.password);
    if (!isPasswordMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccesstoken({ id: userFound._id });

    //Auto save token in cookie
    res.cookie("token", token)
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

// router.post("/")

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

    if (!userSaved) {
      return res.status(400).json({ message: "Error al crear el usuario" });
    }

    if (process.env.NODE_ENV !== 'test') {
      await enviarEmail(
        userSaved.email,
        userSaved._id,
        "Verifica tu correo"
      ).then(() => {
        console.log("Email enviado");
      });
    }

    const token = await createAccesstoken({ id: userSaved._id });

    res.cookie("token", token);
    res.json({
      message: "User created successfully",
      userId: userSaved._id,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(401).json({ message: "Ese correo ya esta registrado." });
      return;
    }

    console.log("Register", error);
    res.status(401).json({ message: "Error al crear el usuario" });
  }
});

router.post("/enviarEmail/", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Faltan datos" });
  }
});

router.get("/confirmarUsuario/:email/:key", async (req, res) => {
  //Get email and key
  const { email, key } = req.params;
  try {
    
    console.log("Confirmar usuario", email, key);

    //Find user by email and key
    const user = await UserModel.findOne({ email });

    if(!user) return res.status(400).json({message:"Usuario no encontrado"})

    if(user.email !== email) return res.status(400).json({message:"Email no coincide"})

    await UserModel.findByIdAndUpdate(key, {
      emailVerificated: true,
    });

    // res.cookie("user", JSON.stringify(user));
    res.redirect('/login')
  } catch (error) {
    console.log("Confirmar usuario", error);
    res.send(error);
    res.redirect("/login");
  }
});

router.post("/logout", (req, res) => {
  // Tu lógica de logout
  res.cookie("token", "", { expires: new Date(0) });
  return res.status(200).json({ message: "Logout successfully" });
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
    const token = await createAccesstoken({ id: userFound._id });
    res.cookie("token", token)
    res.json({
      message: "User created or found successfully",
      user: userFound,
    });
  } catch (error) {
    console.log("Google ERROR", error);
    res.send(error);
  }
});

// Remove user account
router.post("/removeAccount", async (req: any, res) => {
  const { id } = req.body;

  console.log("REMOVE ACCOUNT HERE", id);

  if (!id) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  try {
    const userFound = await UserModel.findByIdAndDelete(id);

    if (!userFound) return res.status(400).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Delete", error);
    res.send(error);
  }
});

export const authRoutes = router;
