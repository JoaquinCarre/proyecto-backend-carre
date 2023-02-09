import ProductRepository from "../models/repository/productRepository.js";
import { logger } from "../logs/logger.js";
import { generateOneProductFaker } from "../utils/generateProductFaker.js";

const repository = new ProductRepository();

async function getAll() {
  try {
    return await repository.getAll();
  } catch (err) {
    logger.error("No es posible obtener los productos de la base de datos ", err);
  }
}

async function addProduct(product) {
  try {
    return await repository.create(product);
  } catch (err) {
    logger.error("No es posible crear la base de datos para los productos ", err);
  }
}

async function getProductById(id) {
  try {
    return await repository.getProdByid(id);
  } catch (err) {
    logger.error("No es posible obtener el producto ", err);
  }
}

async function updateProductById(id, data) {
  try {
    return await repository.update(id, data);
  } catch (err) {
    logger.error("No es posible borrar el producto ", err);
  }
}

async function deleteProductById(id) {
  try {
    return await repository.delete(id);
  } catch (err) {
    logger.error("No es posible borrar el producto ", err);
  }
}

async function generateProduct(cant) {
  try {
    const products = [];
    for (let i = 0; i < cant; i++) {
      products.push(await generateOneProductFaker());
    }
    console.log('productos generados: ', products);
    return products;
  } catch (err) {
    logger.error("No es posible obtener productos Faker de la base de datos ", err);
  }
}

export {
  getAll,
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  generateProduct,
};
