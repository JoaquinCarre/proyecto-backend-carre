import { Router } from 'express'
const router = Router()

router.get('/', async (req, res, next) => {
    try {
        res.render('index')
    } catch (error) {
        next(error)
    }
})

export default router