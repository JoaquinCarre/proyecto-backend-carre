import { Router } from 'express';
import passport from 'passport';
import upload from '../../middlewares/multer.js';
import { sendMail } from '../../utils/emailUtils.js';
import { logger } from "../../logs/logger.js";

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
    logger.error(`No ha sido posible loguearse:
    ${err.message}`);
  }
});

router.post('/sign-out', (req, res, next) => {
  const { user } = req
  req.logout((err) => {
    if (err) {
      logger.error(`No ha sido posible desloguearse de la cuenta:
      ${err.message}`);
      return next(err)
    }
    req.session.destroy(error => {
      if (!err) {
        res.status(202).end();
      } else {
        res.status(500).json('Ha ocurrido un error.', err);
      }
    });
    res.json({ message: `Hasta luego ${user.email}.` })
  })
})

router.post('/sign-up', upload, passport.authenticate('sign-up'), (req, res) => {
  try {
    const { user } = req;
    const bodyHTML = `Se registró un nuevo usuario con los siguientes datos:
    <ul>
    <li>Usuario: ${user.email}</li>
    <li>Nombre: ${user.name}</li>
    <li>Edad: ${user.age}</li>
    <li>Dirección: ${user.address}</li>
    <li>Teléfono: ${user.phone}</li>
    <li>Hora de registro: ${user.timestamp}</li>
    </ul>`;
    sendMail(`Usuario ${user.email} se registró.`, bodyHTML, 'joa.carre21@gmail.com');
    res.json({ message: `Usuario ${user.email} se registró.` });
  } catch (err) {
    logger.error(`No es posible registrarse:
    ${err.message}`);
  }
})

export default router;