const { Router } = require('express')

const router = Router()

const productos = [
    {
        title: 'Iphone X-18',
        price: 339.40,
        thumbnail: 'https://iphone.net',
        id: 1
    },
    {
        title: 'Procesador Intel i6 1ºGen',
        price: 120,
        thumbnail: 'https://intel.com',
        id: 2
    },
    {
        title: 'Teclado Gamer XYZ Pro',
        price: 10,
        thumbnail: 'https://tutecladoconluces.com.ar',
        id: 3
    }
]

router.get('/', (req, res) => {
    res.status(200).json(productos)
})

router.post('/', (req, res) => {
    const product = {
        title: "Secarropas TurboVueltas",
        price: 1150,
        thumbnail: "http://alavueltadetulavanderia.com.ar"
    }
    const { title, price, thumbnail } = product
    if (title && price && thumbnail) {
        const id = productos.length + 1
        const newProduct = { ...product, id }
        productos.push(newProduct)
        res.json(productos)
    } else {
        res.status(500).json('No es posible subir el producto, faltan datos')
    }
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    if (productos.length >= id) {
        const oneProduct = productos.filter((el) => el.id == id)
        res.status(200).json(oneProduct)
    } else {
        res.status(404).json('El producto no existe')
    }
})

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const { id } = req.params
    productos.forEach((product, i) => {
        if (product.id == id) {
            productos.splice (i, 1) 
        } 
    });
    res.json(productos)
    

})

module.exports = router