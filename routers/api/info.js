import { Router } from 'express';
import compression from 'compression';
import {
    infoCompressed,
    infoNonCompressed
} from '../../controllers/infoController.js'

const router = Router();

router.get('/info', compression(), infoCompressed);
router.get('/info-nc', infoNonCompressed);

export default router;