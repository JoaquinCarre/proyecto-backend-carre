import { Router } from 'express';
import users from './users/users.js';
import auth from './users/auth.js';
import cart from './cart/cart.js';
import ProductController from '../controller/productController.js';
import { logger } from "../logs/logger.js";

const router = Router();

router.use('/users', users);
router.use('/auth', auth);
router.use('/cart', cart);

router.get('/', async (req, res, next) => {
    try {
        const { query = {} } = req
        const products = await ProductController.get(query);
        const data = {
            isEmpty: !products.length
        };
        res.render('index', data);
    } catch (err) {
        logger.error(`${err.message}`);
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { body } = req
        const product = await ProductController.create(body)
        res.json(product)
    } catch (err) {
        logger.error(`${err.message}`);
        next(err)
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { params: { id } } = req
        const product = await ProductController.getByid(id)
        if (!product) {
            return res.status(404).end()
        }
        res.json(product)
    } catch (err) {
        logger.error(`${err.message}`);
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const { params: { id }, body } = req
        const { modifiedCount, matchedCount } = await ProductController.uploadById(id, body)
        if (!modifiedCount || !matchedCount) {
            return res.status(404).end()
        }
        res.status(204).end()
    } catch (err) {
        logger.error(`${err.message}`);
        next(err)
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { params: { id } } = req
        const { deletedCount } = await ProductController.deleteById(id)
        if (!deletedCount) {
            return res.status(404).end()
        }
        res.status(204).end()
    } catch (err) {
        logger.error(`${err.message}`);
        next(err)
    }
});

router.get("*", (req, res, next) => {
    try {
        logger.warn(`Acceso a ruta inexistente ${req.originalUrl} con el método ${req.method}`);
        res.redirect("/");
    } catch (err) {
        logger.error(`${err.message}`);
        next(err);
    }
});

export default router;