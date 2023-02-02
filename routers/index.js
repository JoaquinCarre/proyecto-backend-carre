import { Router } from 'express';
import products from './products/productsRouter.js';
import info from './api/info.js';
import randoms from './api/randoms.js'
import auth from './users/auth.js';
import users from './users/users.js';

const router = Router()

router.use('/', products);
router.use('/api', info, randoms)
router.use('/auth', auth);
router.use('/users', users);

export default router