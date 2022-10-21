const { Router } = require('express')
const router = Router()

router.get('/', async (req, res) => {
    res.send('Carrito de Compras')
})

module.exports = router