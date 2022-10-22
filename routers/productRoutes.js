const { Router } = require('express')
const Contenedor = require('../contenedorClass')

const products = new Contenedor('./dataBase/products.json');

const router = Router()

const Admin = true

router.get('/', async (req, res) => {
    const productsJSON = await products.getAll();
    const productsTemplate = productsJSON
    try {
        const data = {
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

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
    const product = req.body
    try {
        const data = await products.addProduct(product)
        res.status(data.status).render('products', data)
    } catch (error) {
        next(error)
    }
})



module.exports = router