import { logger } from '../logs/logger.js';
import {
  getAll,
  addProduct,
  getProductById,
  deleteProductById,
  generateProduct
} from '../services/productServices.js';

export async function getAllProducts(_, res, next) {
  try {
    const productos = await getAll();
    const data = {
      isEmpty: !productos.length
    };
    res.render('index', data);
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
}

export async function addNewProduct(req, res, next) {
  try {
    const data = req.body;
    await addProduct(data);
    res.redirect('/');
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
}

export async function getProduct(req, res, next) {
  try {
    const { params: { id } } = req
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).end()
    }
    res.json(product);
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    await deleteProductById(id);
    res.redirect('/');
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
}

export async function generateProductFaker(req, res, next) {
  try {
    const q = req.query.q;
    let quantity;
    if (q) {
      if (isNaN(Number(q))) {
        res.send("<h1>Debe ingresar un número para el parámetro 'q'</h1>")
        return
      } else {
        if (q <= 5) {
          console.log(`Generando ${cant} producto/s aleatorio/s`);
          quantity = q; 
        } else {
          console.log(`Generando 5 productos aleatorios`);
          quantity = 5;
        }
      }
    } 
    const data = await generateProduct(quantity);
    res.json(data);
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
}