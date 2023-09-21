import { fastify } from 'fastify'
import { routes } from './routes/musics.js'

const app = fastify()
const port = process.env.PORT ?? 3332

routes.forEach((route) => {
  app.route(route)
})

app
  .listen({
    host: '0.0.0.0',
    port,
  })
  .then(() => {
    console.log(`Server is running on port ${port}`)
  })
