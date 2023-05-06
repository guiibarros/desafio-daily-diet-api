import { FastifyInstance } from 'fastify'

import { createMealController } from '../controllers/create-meal.controller'
import { deleteMealController } from '../controllers/delete-meal.controller'
import { getSummaryController } from '../controllers/get-summary.controller'
import { listMealsController } from '../controllers/list-meals.controller'
import { showMealController } from '../controllers/show-meal.controller'
import { updateMealController } from '../controllers/update-meal.controller'
import { verifyJwt } from '../plugins/verify-jwt'

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/', listMealsController)

  app.get('/:id', showMealController)

  app.get('/summary', getSummaryController)

  app.post('/', createMealController)

  app.put('/:id', updateMealController)

  app.delete('/:id', deleteMealController)
}
