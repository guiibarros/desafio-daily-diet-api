import { FastifyInstance } from 'fastify'

import { mealsRoutes } from './meals.routes'

export async function routes(app: FastifyInstance) {
  app.register(mealsRoutes, {
    prefix: 'meals',
  })
}
