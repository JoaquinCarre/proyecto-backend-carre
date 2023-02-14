import ProductRepository from "../models/repository/productRepository.js";
import { logger } from "../logs/logger.js";
import { generateOneProductFaker } from "../utils/generateProductFaker.js";

const repository = new ProductRepository();

async function getAll() {
  try {
    return await repository.getAll();
  } catch {
    throw new Error
  }
}

async function addProduct(product) {
  try {
    return await repository.create(product);
  } catch {
    throw new Error
  }
}

async function getProductById(id) {
  try {
    return await repository.getProdByid(id);
  } catch {
    throw new Error
  }
}

async function updateProductById(id, data) {
  try {
    return await repository.update(id, data);
  } catch {
    throw new Error
  }
}

async function deleteProductById(id) {
  try {
    return await repository.delete(id);
  } catch {
    throw new Error
  }
}

async function generateProduct(cant) {
  try {
    const products = [];
    for (let i = 0; i < cant; i++) {
      products.push(await generateOneProductFaker());
    }
    return products;
  } catch {
    throw new Error
  }
}

export default {
  getAll,
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  generateProduct,
};
