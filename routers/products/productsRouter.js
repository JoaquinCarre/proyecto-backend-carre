import { Router } from 'express';
import {
    getAllProducts,
    addProduct,
    getProductById,
    deleteProductById,
    generateProductFaker
} from '../../controllers/productController.js';

const router = Router();

router.get('/productos', getAllProducts);
router.post('/productos', addProduct)
router.get('/productos/:id', getProductById)
router.delete('/producto/:id', deleteProductById)
router.get('/productos-test', generateProductFaker)

export default router;
