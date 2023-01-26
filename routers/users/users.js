import { Router } from 'express';
import UserController from '../../controller/userController.js';
import { logger } from "../../logs/logger.js";

const router = Router()

function auth (req, res, next) {
  try {
    const { admin } = req.session;
    if (admin) {
      next();
    } else {
      res.status(401).send('Error de autenticación');
    }
  }
  catch (e) {
    throw new Error(e);
  }
}

const verifyAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    const { user } = req.body;
    next()
  } else {
    res.status(401).json({ message: 'Unauthorized to zone private.' })
  }
}

router.get('/me', auth, verifyAuth, async (req, res, next) => {
  try {
    const user = await UserController.getByid(req.user._id)
    res.json(user)
  } catch (err) {
    logger.error(`${err.message}`);
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const user = await UserController.create(body)
    res.json(user)
  } catch (err) {
    logger.error(`${err.message}`);
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const { query = {} } = req
    const users = await UserController.get(query)
    res.json(users)
  } catch (err) {
    logger.error(`${err.message}`);
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { params: { id } } = req
    const user = await UserController.getByid(id)
    if (!user) {
      return res.status(404).end()
    }
    res.json(user)
  } catch (err) {
    logger.error(`${err.message}`);
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { params: { id }, body } = req
    const { modifiedCount, matchedCount } = await UserController.uploadById(id, body)
    if (!modifiedCount || !matchedCount) {
      return res.status(404).end()
    }
    res.status(204).end()
  } catch (err) {
    logger.error(`${err.message}`);
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { params: { id } } = req
    const { deletedCount } = await UserController.deleteById(id)
    if (!deletedCount) {
      return res.status(404).end()
    }
    res.status(204).end()
  } catch (err) {
    logger.error(`${err.message}`);
    next(err)
  }err
})

export default router