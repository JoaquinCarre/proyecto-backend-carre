import { Router } from 'express';

const router = Router();

function auth (req, res, next) {
  try {
    const { isAuth } = req.session;
    if (isAuth) {
      next();
    } else {
      console.log("🚫 Acceso denegado 🚫");
      res.status(401).send('Error de autenticación');
    }
  }
  catch (e) {
    throw new Error(e);
  }
}

// Corrobora si hay sesión activa
router.get('/login', auth, (req, res) => {
  try {
    console.log('obteniendo login')
    res.status(200).json({ username: req.session.username });
  }
  catch (e) {
    throw new Error(e);
  }
});

// Crea una nueva sesión
router.post('/login', (req, res) => {
  try {
    const { username } = req.body;
    req.session.username = username;
    req.session.isAuth = true;
    console.log('username', username)
    res.status(200).json({ username });
  }
  catch (e) {
    throw new Error(e);
  }
});

// Destruye sesióna ctual
router.delete('/logout', auth, (req, res) => {
  try {
    req.session.destroy(error => {
      if (!error) {
        res.status(202).end();
      } else {
        res.status(500).json('Ha ocurrido un error.')
      }
    });
  }
  catch (e) {
    throw new Error(e);
  }
})

export { router, auth };