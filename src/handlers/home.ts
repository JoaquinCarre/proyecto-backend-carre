import HomePage from '../views/HomePage.tsx';
import { Context } from '../../deps.ts';

export const home = (ctx: Context) => {
    ctx.response.type = '.html'
    ctx.response.body = HomePage()
}