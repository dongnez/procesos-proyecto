import bycrypt from 'bcrypt';
import { UserModel } from '../../servidor/models/user';
import {Router} from 'express'
const router = Router();
import { createAccesstoken } from '../libs/createAccessToken';

// Define rutas y controladores para la autenticación
router.post('/login', async (req, res) => {
  const {email,password} = req.body;

  try {
  
    const userFound = await UserModel.findOne({email});

    if(!userFound) return res.status(400).json({message:"Usuario no encontrado"})

    // Check password is the same
    const isPasswordMatch = await bycrypt.compare(password,userFound.password)
    if(!isPasswordMatch) return res.status(400).json({message:"Contraseña incorrecta"})
  
    const token = await createAccesstoken({id:userFound._id})

    res.cookie('jwt',token)
		res.json({
      _id:userFound._id,
      name:userFound.name,
      email:userFound.email,
      templates:userFound.templates,
		})
    
  } catch (error) {
    console.log("Login",error);
    res.send(error)
  }
});

router.post('/register', async (req, res) => {
  
  const {email,password,name} = req.body;

  try {
  
    const passwordHash = await bycrypt.hash(password,10);

    const newUser = new UserModel({
      email,
      password: passwordHash,
      name
    })
  
    const userSaved = await newUser.save();

    const token = await createAccesstoken({id:userSaved._id})

    res.cookie('jwt',token)
		res.json({
		  'message': 'User created successfully',
		})
  
    
  } catch (error) {
    console.log("Register",error);
    res.send(error)
  }

});

router.post('/logout', (req, res) => {
  // Tu lógica de logout
  res.cookie('jwt'  , '', { expires: new Date(0) });
  res.send("LOGOUT"); 
})

export const authRoutes = router;