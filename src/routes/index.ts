import { FastifyInstance } from 'fastify'

import { authRoutes } from './auth.routes'
import { mealsRoutes } from './meals.routes'
import { usersRoutes } from './users.routes'

export async function routes(app: FastifyInstance) {
  app.register(usersRoutes, {
    prefix: 'users',
  })

  app.register(mealsRoutes, {
    prefix: 'meals',
  })

  app.register(authRoutes, {
    prefix: 'sessions',
  })
}
