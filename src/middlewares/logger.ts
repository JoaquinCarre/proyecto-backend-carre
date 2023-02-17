import { Context } from '../../deps.ts'

export const logger = async (ctx: Context, next: () => void) => {
  await next()
  console.log(`${ctx.request.method} request to ${ctx.request.url}`)
}