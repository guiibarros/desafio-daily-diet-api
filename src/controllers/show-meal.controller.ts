import { FastifyRequest } from 'fastify'
import { z } from 'zod'

import { knex } from '../database'

export async function showMealController(request: FastifyRequest) {
  const { sessionId } = request.cookies

  const updateMealParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = updateMealParamsSchema.parse(request.params)

  const meal = await knex('meals')
    .where({
      id,
      session_id: sessionId,
    })
    .select()

  return {
    meal,
  }
}
