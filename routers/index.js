import { Router } from 'express';
import products from './products/productsRouter.js';
import noAccess from './no-access/no-access.js';
import info from './api/info.js';
import randoms from './api/randoms.js'
import auth from './users/auth.js';
import users from './users/users.js';

const router = Router()

router.use('/', products, noAccess);
router.use('/api', info, randoms)
router.use('/auth', auth);
router.use('/users', users);

export default router