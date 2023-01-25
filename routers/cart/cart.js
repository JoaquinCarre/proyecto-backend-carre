import { Router } from 'express';
import CartController from '../../controller/cartController.js';
import UserController from '../../controller/userController.js';
import { sendMessage } from '../../utils/WhatsAppUtils.js';
import { sendMail } from '../../utils/emailUtils.js'

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
        console.log('deletedCart', deletedCart)
        res.status(200).json(deletedCart);
    } catch (error) {
        next(error);
    }
})

router.delete('/:id/:product_id', async (req, res, next) => {
    try {
        const { id, product_id } = req.params;
        const deletedItemCart = await CartController.deleteItemById(id, product_id);
        console.log('Se eliminió un producto');
        res.status(200).json(deletedItemCart);
    } catch (error) {
        next(error);
    }
})

router.post('/:id/:user_id', async (req, res, next) => {
    try {
        console.log('Ingresando envio Mensaje de compra');
        const { id, user_id } = req.params;
        const user = await UserController.getByid(user_id)
        const message = `El usuario ${user.email} (id: ${user_id}) ha realizado la compra de su carrito (id: ${id})`;
        console.log('Mensaje enviado: ', message);
        await sendMail(`Usuario ${user.email} realizó una compra`, message, 'joa.carre21@gmail.com');
        await sendMessage(message);
        console.log('Enviando Mensaje de compra');
        res.status(200).json(message);
    } catch (error) {
        next(error);
    }
})

export default router;