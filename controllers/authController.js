import { logger } from "../logs/logger";

export function auth(req, res, next) {
  try {
    const { admin } = req.session;
    if (admin) {
      next();
    } else {
      res.status(401).send("Error de autenticación");
    }
  } catch (e) {
    throw new Error(e);
  }
}

export const verifyAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "Sin autorización: zona privada" });
  }
};

export async function signIn(req, res, next) {
  try {
    const { user } = req;
    if (!req.isAuthenticated()) {
      res.status(401).json({ message: "Email o Contraseña son inválidas" });
      return;
    }
    req.session.username = user.email;
    req.session.admin = true;
    res.status(200).json({ message: `Bienvenido ${user.email}.` });
  } catch (err) {
    logger.error(`No ha sido posible loguearse:
      ${err.message}`);
    next(err);
  }
}

export async function signOut(req, res, next) {
  const { user } = req;
  req.logout((err) => {
    if (err) {
      logger.error(`No ha sido posible desloguearse de la cuenta:
        ${err.message}`);
      return next(err);
    }
    req.session.destroy((err) => {
      if (!err) {
        res.status(202).end();
      } else {
        res.status(500).json("Ha ocurrido un error.", err);
      }
    });
    res.json({ message: `Hasta luego ${user.email}.` });
  });
}

export async function signUp(req, res) {
  try {
    const { user } = req;
    res.json({ message: `Usuario ${user.email} se registró.` });
  } catch (err) {
    logger.error(`No es posible registrarse:
    ${err.message}`);
  }
}
