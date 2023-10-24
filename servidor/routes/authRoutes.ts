import bycrypt from 'bcrypt';
import { UserModel } from '../../servidor/models/user';
import {Router} from 'express'
const router = Router();

// Define rutas y controladores para la autenticación
router.post('/login', (req, res) => {
  // Tu lógica de autenticación
    res.send("LOGIN");
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
  
    res.json({
      id: userSaved._id,
      name: userSaved.name,
      email: userSaved.email
    });
    
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