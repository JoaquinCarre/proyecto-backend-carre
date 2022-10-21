const fs = require('fs')
const { Router } = require('express')
const router = Router()

router.get('/', async (req, res) => {
    const products = await fs.promises.readFile ('./public/product.json', 'utf-8')
    const productsJSON = await JSON.parse (products)
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