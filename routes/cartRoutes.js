import { Router } from 'express';
import {
    productDao as products,
    cartDao as cart
} from '../daos/indexDao.js'

const router = Router()

router.post('/', async (req, res, next) => {
    const cartID = await cart.createCart()
    try {
        const data = {
            isEmpty: true,
            message: `Nuevo carrito creado con el ID: ${cartID}`
        }
        res.status(200).render('cart', data)
    } catch (error) {
        next(error)
    }

})

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    const data = await cart.deleteCart(id)
    res.status(data.status).render('cart', data)
})

router.get('/:id/productos', async (req, res, next) => {
    try {
        const { id } = req.params
        const cartByID = await cart.getByID(id);
        console.log('cartbyid', cartByID)
        if (!cartByID.length) {
            const data = {
                isEmpty: true,
                message: `Carrito inexistente con el ID: ${id}`
            }
            res.status(500).render('cart', data)
        } else {
            const cartTemplate = cartByID[0].products
            const data = {
                cartTemplate,
                isEmpty: !cartTemplate.length,
                message: `No hay productos seleccionados`
            }
            res.status(200).render('cart', data)
        }
    } catch (error) {
        next(error)
    }
})

router.post('/:id/productos', async (req, res, next) => {
    try {
        const idProduct = req.body.id;
        console.log('idProduct', idProduct)
        const product = await products.getByID(idProduct)
        console.log('esteproductoagrego: ', product)
        const { id } = req.params;
        const data = await cart.addProductCart(id, product[0]);
        res.status(data.status).render('cart', data)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id/productos/:id_prod', async (req, res, next) => {
    try {
        const idProduct = req.params.id_prod;
        const { id } = req.params;
        console.log('se envia data con id carrito: ', id)
        console.log('se envia data con id producto: ', idProduct)
        const data = await cart.deleteProductByID(id, idProduct);
        res.status(data.status).render('cart', data)
    } catch (error) {
        next(error)
    }
})

export default router