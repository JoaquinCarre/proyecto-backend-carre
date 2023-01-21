import { Router } from 'express';
import users from './users/users.js';
import auth from './users/auth.js';
import ProductController from '../controller/productController.js'

const router = Router();

router.use('/users', users);
router.use('/auth', auth);

router.get('/', async (req, res, next) => {
    try {
        const { query = {} } = req
        const products = await ProductController.get(query);
        const data = {
            isEmpty: !products.length
        };
        res.render('index', data);
        //ver como adherir data con .then luego de que carguen los productos, para que no aparezca el cartel que no hay productos
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { body } = req
        const product = await ProductController.create(body)
        res.json(product)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { params: { id } } = req
        const product = await ProductController.getByid(id)
        if (!product) {
            return res.status(404).end()
        }
        res.json(product)
    } catch (error) {
        next(error)
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
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const { params: { id } } = req
        const { deletedCount } = await ProductController.deleteById(id)
        if (!deletedCount) {
            return res.status(404).end()
        }
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

export default router;