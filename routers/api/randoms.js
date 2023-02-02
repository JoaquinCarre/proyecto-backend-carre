//Agregado para el desafío 14:
import { Router } from 'express';
import { randomize } from '../../controllers/randomizeController.js';

const router = Router();

router.get('/randoms', randomize);

export default router;