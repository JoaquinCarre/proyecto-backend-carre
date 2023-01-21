import { Router } from 'express';
import passport from 'passport';
import upload from '../../middlewares/multer.js';

const router = Router();

router.post('/sign-in', passport.authenticate('sign-in'), (req, res) => {
  try {
    const { user } = req
    if (!req.isAuthenticated()) {
      res.status(401).json({ message: 'Email o Contraseña son inválidas' });
      return
    }
    req.session.username = user.email;
    req.session.admin = true;
    res.status(200).json({ message: `Bienvenido ${user.email}.` })
  }
  catch (err) {
    console.log('Failed to sign in', err);
  }
});

router.post('/sign-out', (req, res, next) => {
  const { user } = req
  req.logout((error) => {
    if (error) {
      return next(error)
    }
    req.session.destroy(error => {
      if (!error) {
        res.status(202).end();
      } else {
        res.status(500).json('Ha ocurrido un error.', error);
      }
    });
    res.json({ message: `Hasta luego ${user.email}.` })
  })
})

router.post('/sign-up', upload, passport.authenticate('sign-up'), (req, res) => {
  const { user } = req;
  res.json({ message: `Usuario ${user.email} se registró.` });
})

export default router;