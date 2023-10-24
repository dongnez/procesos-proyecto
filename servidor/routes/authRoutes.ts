import {Router} from 'express'
const router = Router();

// Define rutas y controladores para la autenticación
router.post('/login', (req, res) => {
  // Tu lógica de autenticación
    res.send("LOGIN");
});

router.post('/register', (req, res) => {
  // Tu lógica de registro

  console.log(req.body);
  res.send('registrando')

});

export const authRoutes = router;