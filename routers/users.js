import { Router } from 'express'
import UserController from '../controllers/users.js'

const router = Router()

const verifyAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).json({ message: 'Unauthorized to zone private.' })
  }
}

router.get('/me', verifyAuth, async (req, res, next) => {
  try {
    const user = await UserController.getByid(req.user._id)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { body } = req
    const user = await UserController.create(body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const { query = {} } = req
    const users = await UserController.get(query)
    res.json(users)
  } catch (error) {
    next(error)
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
  } catch (error) {
    next(error)
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
  } catch (error) {
    next(error)
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
  } catch (error) {
    next(error)
  }
})

export default router