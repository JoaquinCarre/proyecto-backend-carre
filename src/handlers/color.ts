import { Context } from '../../deps.ts';
import { get, add } from '../db/index.ts';
import { red, bgWhite, bold } from '../../deps.ts';

const availableColors = ["black", "white", "gray", "red", "orange", "yellow", "green", "blue", "purple", "pink", "brown", "tan", "olive", "navy", "teal", "maroon", "coral", "gold", "silver", "plum", "orchid", "lavender", "skyblue", "turquoise", "salmon", "crimson", "violet", "magenta", "chartreuse", "chocolate", "tomato", "limegreen"];

export const getColors = (ctx: Context) => {
    ctx.response.status = 200
    ctx.response.body = get();
}

export const addColor = async (ctx: Context) => {
    const body = await ctx.request.body().value;
    const color = body.get('color');
    if(availableColors.includes(color)) {
        ctx.response.status = 201;
        ctx.response.body = add(color);
        ctx.response.redirect('/');
    } else {
        console.error(bgWhite(bold(red(`${color} no existe en la base de datos`))));
        ctx.response.redirect('/');
    }   
}

export const getAvailableColors = (ctx: Context) => {
    ctx.response.body = availableColors;
}