import { Router } from 'express';
import Contenedor from '../contenedor.js';
import { router as sessionLog } from './sessionLog.js';
import auth from './auth.js';
import users from './users.js';
import info from './info.js';
import { logger } from "../logs/logger.js";

import { optionsMySQL, createTableProducts, initialMessages } from '../db-config/createTables.js';

const router = Router()

router.use('/', sessionLog, info);
router.use('/auth', auth);
router.use('/users', users);

const products = new Contenedor(optionsMySQL, 'productos');

let productos = [];

router.get('/', async (req, res, next) => {
    try {
        await createTableProducts();
        await initialMessages();
        const getProductos = await products.getData();
        productos = getProductos;
        const data = {
            isEmpty: !productos.length
        };
        res.render('index', data);
        //ver como adherir data con .then luego de que carguen los productos, para que no aparezca el cartel que no hay productos
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res) => {
    const product = req.body
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

router.get('/:id', async (req, res) => {
    const { id } = req.params
    if (productos.length >= id) {
        const oneProduct = productos.filter((el) => el.id == id)
        res.status(200).json(oneProduct)
    } else {
        res.status(404).json('El producto no existe')
    }
})

router.put('/:id', async (req, res) => {
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
    const { id } = req.params
    productos.forEach((product, i) => {
        if (product.id == id) {
            productos.splice(i, 1)
        }
    });
    res.json(productos)


})

//resto de rutas inexistentes para que advierta con un warning
router.get("*", (req, res, next) => {
    try {
        logger.warn(`Acceso a ruta inexistente ${req.originalUrl} con el método ${req.method}`);
        res.redirect("/");
    } catch (err) {
        logger.error(`${err.message}`);
        next(err);
    }
});

export default router