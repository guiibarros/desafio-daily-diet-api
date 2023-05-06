import { FastifyRequest } from 'fastify'
import { z } from 'zod'

import { knex } from '../database'

export async function showMealController(request: FastifyRequest) {
  const { sub: userId } = request.user

  const updateMealParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = updateMealParamsSchema.parse(request.params)

  const meal = await knex('meals')
    .where({
      id,
      user_id: userId,
    })
    .select()

  return {
    meal,
  }
}
