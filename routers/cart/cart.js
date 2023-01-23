import { Router } from 'express'
import CartController from '../../controller/cartController.js'

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const { query = {} } = req;
        const cart = await CartController.get(query);
        res.json(cart);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newCart = await CartController.create({
            timestamp: Date.now(),
            products: []
        });
        console.log('Se crea nuevo carrito');
        res.status(200).json(newCart._id.toString());
    } catch (error) {
        next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { params: { id } } = req;
        const cart = await CartController.getByid(id);
        res.json(cart);
    } catch (error) {
        next(error);
    }
})

router.post('/:id', async (req, res, next) => {
    try {
        let product = req.body;
        let cartId = req.params.id;
        const addProduct = await CartController.uploadById(cartId, product);
        console.log('Se añadió un nuevo producto');
        res.status(200).json(addProduct);
    } catch (error) {
        next(error);
    }
})

//FALTA MODIFICAR

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedCart = await CartController.deleteCartById(id)
        res.json(deletedCart);
    } catch (error) {
        next(error);
    }
})

router.delete('/:id/:product_id', async (req, res, next) => {
    try {
        const { id, product_id } = req.params;
        const deletedItemCart = await CartController.deleteItemById (id, product_id);
        console.log('Se eliminió un producto');
        res.status(200).json(deletedItemCart);
    } catch (error) {
        next(error);
    }
})

export default router;