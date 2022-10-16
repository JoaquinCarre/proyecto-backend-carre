const { Router } = require('express')
const fs = require('fs')
/* const productos = require('./productos')

const router = Router()

router.use('/productos', productos) //secciones dentro del indice /api

module.exports = router */

const router = Router()

let productos

async function readFile() {
    try {
        const readFile = await fs.promises.readFile('./productos.txt', "utf-8")
        const readFileJSON = await JSON.parse(readFile)
        return await readFileJSON
    }
    catch (err) {
        console.log('error de lectura: ', err)
    }
}

router.get('/', async (req, res) => {
    if (!productos) {
        productos = await readFile()
    }
    try {
        const data = {
            productos,
            isEmpty: !productos.length
        };
        res.render('index', data);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res) => {
    if (!productos) {
        productos = await readFile()
    }
    //agregar valor input como en clase 11
    const product = req.body
    const { title, price, thumbnail } = product
    if (title && price && thumbnail) {
        const id = productos.length + 1
        const newProduct = { ...product, id }
        productos.push(newProduct)
        res.json(await productos)
    } else {
        res.status(500).json('No es posible subir el producto, faltan datos')
    }
})

router.get('/:id', async (req, res) => {
    if (!productos) {
        productos = await readFile()
    }
    const { id } = req.params
    if (productos.length >= id) {
        const oneProduct = productos.filter((el) => el.id == id)
        res.status(200).json(oneProduct)
    } else {
        res.status(404).json('El producto no existe')
    }
})

router.put('/:id', async (req, res) => {
    if (!productos) {
        productos = await readFile()
    }
    const { id } = req.params
    const changeDetail = { title: "Nuevo Producto XTZ", price: 1150, thumbnail: "https//nuevoproducto.com" }
    const { title, price, thumbnail } = changeDetail
    if (title && price && thumbnail) {
        productos.forEach((product) => {
            if (product.id == id) {
                product.title = title
                product.price = price
                product.thumbnail = thumbnail
            }
        });
        res.json(productos)
    } else {
        res.status(500).json("Hubo un error")
    }
})

router.delete('/:id', async (req, res) => {
    if (!productos) {
        productos = await readFile()
    }
    const { id } = req.params
    productos.forEach((product, i) => {
        if (product.id == id) {
            productos.splice(i, 1)
        }
    });
    res.json(productos)


})

module.exports = router