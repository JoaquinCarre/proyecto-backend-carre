import { Router } from 'express';
/* import ContainerFileSystem from '../containers/ContainerFileSystem.js'; */
import {
    productDao as products,
    cartDao as cart
} from '../daos/indexDao.js'

/* const products = new ContainerFileSystem('./dataBase/products.json');
const cart = new ContainerFileSystem('./dataBase/cart.json');
 */
const router = Router()

//Cambiar valor booleano para habilitar o deshabilitar acceso como Admin
const Admin = false

router.get('/', async (req, res, next) => {
    const productsJSON = await products.getAll();
    const productsTemplate = productsJSON
    const cartJSON = await cart.getAll();
    let isCartJSON;
    if (!cartJSON.length) {
        isCartJSON = false
    } else {
        isCartJSON = true
    }
    try {
        const data = {
            isCart: isCartJSON,
            productsTemplate,
            isEmpty: !productsJSON.length,
            message: "No hay productos seleccionados",
            isAdmin: Admin
        }
        res.render('products', data)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    const oneProduct = await products.getByID(id);
    try {
        if (!oneProduct.length) {
            const data = {
                isEmpty: true,
                message: "El producto no existe",
            }
            res.status(404).render('products', data)
        } else {
            const productsTemplate = oneProduct
            const data = {
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