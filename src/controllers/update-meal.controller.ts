import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { knex } from '../database'

export async function updateMealController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { sessionId } = request.cookies

  const updateMealParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = updateMealParamsSchema.parse(request.params)

  const updateMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    mealedAt: z.string(),
    inDiet: z.boolean(),
  })

  const { name, description, mealedAt, inDiet } = updateMealBodySchema.parse(
    request.body,
  )

  await knex('meals')
    .where({
      id,
      session_id: sessionId,
    })
    .update({
      name,
      description,
      mealed_at: mealedAt,
      in_diet: inDiet,
    })

  return reply.code(204).send()
}