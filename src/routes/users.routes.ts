import { FastifyInstance } from 'fastify'

import { createUserController } from '../controllers/create-user.controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', createUserController)
}
