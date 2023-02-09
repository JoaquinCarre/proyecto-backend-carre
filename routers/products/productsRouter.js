import { Router } from 'express';
import {
    getAllProducts,
    addNewProduct,
    getProduct,
    deleteProduct,
    generateProductFaker
} from '../../controllers/productController.js';

const router = Router();

router.get('/', getAllProducts);
router.post('/', addNewProduct)
router.get('/productos-test', generateProductFaker)
router.get('/:id', getProduct)
router.delete('/:id', deleteProduct)

export default router;
