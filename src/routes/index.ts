import { FastifyInstance } from 'fastify'

import { mealsRoutes } from './meals.routes'
import { usersRoutes } from './users.routes'

export async function routes(app: FastifyInstance) {
  app.register(usersRoutes, {
    prefix: 'users',
  })

  app.register(mealsRoutes, {
    prefix: 'meals',
  })
}
