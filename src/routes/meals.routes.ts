import { FastifyInstance } from 'fastify'

import { createMealController } from '../controllers/create-meal.controller'
import { deleteMealController } from '../controllers/delete-meal.controller'
import { getSummaryController } from '../controllers/get-summary.controller'
import { listMealsController } from '../controllers/list-meals.controller'
import { showMealController } from '../controllers/show-meal.controller'
import { updateMealController } from '../controllers/update-meal.controller'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function mealsRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    listMealsController,
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    showMealController,
  )

  app.get(
    '/summary',
    {
      preHandler: [checkSessionIdExists],
    },
    getSummaryController,
  )

  app.post('/', createMealController)

  app.put(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    updateMealController,
  )

  app.delete(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    deleteMealController,
  )
}
