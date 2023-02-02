import { productDB } from '../db/index.js';
import { logger } from '../logs/logger.js';
import generateProductFaker from '../utils/generateProductFaker.js';
//ver si se emite un producto al añadir o al obtener producto Faker

export async function getAll() {
    try {
        return await productDB.getAll();
    } catch (err) {
        logger.error('No es posible obtener los productos de la base de datos ', err)
    }
}

async function addProduct(product) {
    try {
        await productDB.create(product);
    } catch (err) {
        logger.error('No es posible crear la base de datos para los productos ', err)
    }
}

async function getProductById(id) {
    try {
        return await productDB.getByid(id);
    } catch (err) {
        logger.error('No es posible obtener el producto ', err);
    }
}

async function deleteProductById(id) {
    try {
        await productDB.deleteById(id);
    } catch (err) {
        logger.error('No es posible borrar el producto ', err);
    }
}

async function generateProduct(cant) {
    const addFakerProduct = new generateProductFaker();
    try {
        const products = [];
        for (let i = 0; i < cant; i++) {
            products.push(await addFakerProduct.generateProduct());
        }
        return products;
    } catch (err) {
        logger.error('No es posible obtener productos Faker de la base de datos ', err)
    }
}

export default {
    getAll,
    addProduct,
    getProductById,
    deleteProductById,
    generateProduct
};