import { FastifyInstance } from 'fastify'

import { authUserController } from '../controllers/auth-user.controller'

export async function authRoutes(app: FastifyInstance) {
  app.post('/', authUserController)
}
