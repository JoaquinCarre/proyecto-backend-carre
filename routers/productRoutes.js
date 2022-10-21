const { Router } = require('express')
const Contenedor = require('../contenedorClass')

const products = new Contenedor('./dataBase/products.json');

const router = Router()

router.get('/', async (req, res) => {
    const productsJSON = await products.getAll();
    try {
        const data = {
            productsJSON,
            isEmpty: !productsJSON.length,
            isAdmin: true
        }
        res.render('products', data)
    } catch (error) {
        next(error)
    }
    
})

module.exports = router