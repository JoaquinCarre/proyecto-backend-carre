import { Router } from 'express';
import generateProductFaker from '../utils/generateProductFaker.js';

const router = Router();

const addFakerProduct = new generateProductFaker();

/* GET add product */
router.get('/', async function (req, res, next) {
    try {
        const products = [];
        for (let i = 0; i < 5; i++) {
            products.push(await addFakerProduct.generateProduct());
        }
        res.json(products);
    } catch (error) {
        next(error);
    }
})

export default router;