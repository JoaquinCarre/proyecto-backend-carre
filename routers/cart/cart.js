import { Router } from 'express';
import CartController from '../../controller/cartController.js';
import UserController from '../../controller/userController.js';
import { sendMessage } from '../../utils/WhatsAppUtils.js';
import { sendMail } from '../../utils/emailUtils.js'
import { logger } from '../../logs/logger.js';

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
        logger.info('Se creó un nuevo carrito');
        res.status(200).json(newCart._id.toString());
    } catch (err) {
        logger.error(`${err.message}`);
        next(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { params: { id } } = req;
        const cart = await CartController.getByid(id);
        res.json(cart);
    } catch (err) {
        logger.error(`${err.message}`);
        next(err);
    }
})

router.post('/:id', async (req, res, next) => {
    try {
        let product = req.body;
        let cartId = req.params.id;
        const addProduct = await CartController.uploadById(cartId, product);
        logger.info('Se añadió un nuevo producto al carrito');
        res.status(200).json(addProduct);
    } catch (err) {
        logger.error(`${err.message}`);
        next(err);
    }
})

router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const product = req.body;
    const updateCart = await CartController.uploadQuantity(id, product);
    res.status(200).json(updateCart);
})

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedCart = await CartController.deleteCartById(id)
        res.status(200).json(deletedCart);
    } catch (err) {
        logger.error(`${err.message}`);
        next(err);
    }
})

router.delete('/:id/:product_id', async (req, res, next) => {
    try {
        const { id, product_id } = req.params;
        const deletedItemCart = await CartController.deleteItemById(id, product_id);
        logger.info('Se eliminió un producto');
        res.status(200).json(deletedItemCart);
    } catch (err) {
        logger.error(`${err.message}`);
        next(err);
    }
})

router.post('/:id/:user_id', async (req, res, next) => {
    try {
        const { id, user_id } = req.params;
        const user = await UserController.getByid(user_id)
        const message = `El usuario ${user.email} (id: ${user_id}) ha realizado la compra de su carrito (id: ${id})`;
        await sendMail(`Usuario ${user.email} realizó una compra`, message, 'joa.carre21@gmail.com');
        await sendMessage(message);
        logger.info('La compra ya ha sido comunicada al proveedor');
        res.status(200).json(message);
    } catch (err) {
        logger.error(`${err.message}`);
        next(err);
    }
})

export default router;