import { Router } from 'express';
import {
    productDao as products,
    cartDao as cart
} from '../daos/indexDao.js'

const router = Router()

//Cambiar valor booleano para habilitar o deshabilitar acceso como Admin
const Admin = false

router.get('/', async (req, res, next) => {
    const productsJSON = await products.getAll();
    const cartJSON = await cart.getAll();
    let isCartJSON;
    if (!cartJSON.length) {
        isCartJSON = false;
    } else {
        isCartJSON = true;
    }
    const getIdCart = await cart.getId(cartJSON);
    const productsTemplate = productsJSON.map((prod) => ({ ...prod, isCart: isCartJSON, idCart: getIdCart }));
    console.log('productos Templates: ', productsTemplate);
    try {
        const data = {
            isCart: isCartJSON,
            idCart: getIdCart,
            productsTemplate,
            isEmpty: !productsJSON.length,
            message: "No hay productos seleccionados",
            isAdmin: Admin
        }
        res.render('products', data);
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    const oneProduct = await products.getByID(id);
    const cartJSON = await cart.getAll();
    let isCartJSON;
    if (!cartJSON.length) {
        isCartJSON = false;
    } else {
        isCartJSON = true;
    }
    const getIdCart = await cart.getId(cartJSON);
    try {
        if (!oneProduct.length) {
            const data = {
                isCart: isCartJSON,
                idCart: getIdCart,
                isEmpty: true,
                message: "El producto no existe",
            }
            res.status(404).render('products', data)
        } else {
            let productsTemplate = oneProduct
            productsTemplate = productsTemplate.map((prod) => ({ ...prod, isCart: isCartJSON, idCart: getIdCart }));
            const data = {
                isCart: isCartJSON,
                idCart: getIdCart,
                productsTemplate,
                isEmpty: false,
                isAdmin: Admin
            }
            res.status(200).render('products', data)
        }
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    const product = req.body
    try {
        const data = await products.addProduct(product)
        res.status(data.status).render('products', data)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const product = req.body
    try {
        const data = await products.updateProduct(id, product)
        res.status(data.status).render('products', data)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const data = await products.deleteProduct(id)
        res.status(data.status).render('products', data)
    } catch (error) {
        next(error)
    }
})

export default router