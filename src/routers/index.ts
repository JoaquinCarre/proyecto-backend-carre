import { Router } from '../../deps.ts';
import { home } from '../handlers/home.ts';
import { addColor, getAvailableColors } from '../handlers/color.ts';

export const router = new Router();

router.get('/', home);
router.post('/', addColor);
router.get('/colors', getAvailableColors);