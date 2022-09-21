const { Router } = require('express')
const productos = require('./productos')

const router = Router()

router.use('/productos', productos) //secciones dentro del indice /api

module.exports = router