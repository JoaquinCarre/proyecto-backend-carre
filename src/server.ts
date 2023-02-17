import { Application, Context } from '../deps.ts'
import { router } from './routers/index.ts'
import { logger } from './middlewares/logger.ts'

const app = new Application()

app
  .use(logger)
  .use(router.routes())
  .use(router.allowedMethods())
  .use((ctx: Context) => {
    ctx.response.status = 404
    ctx.response.body = 'Not Found'
  })

console.log('Server runnig in http://localhost:8080')

await app.listen({ port: 8080 })