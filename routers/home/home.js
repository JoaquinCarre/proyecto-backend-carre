import { Router } from 'express';
import { logger } from '../../logs/logger.js';

const router = Router();

router.get('/', (_, res, next) => {
    try {
        res.render('index');
    } catch (err) {
        logger.error('No ha sido posible cargar la página principal');
        next(err);
    }
});

export default router;

