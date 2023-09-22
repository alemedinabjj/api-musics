import { fastify } from 'fastify'
import { routes } from './routes/musics.js'
import { routes as userRoutes } from './routes/users.js'
import cors from '@fastify/cors'

const app = fastify()
app.register(cors)

const port = process.env.PORT ?? 3332

const allRoutes = [...routes, ...userRoutes]

allRoutes.forEach((route) => {
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
