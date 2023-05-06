import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { knex } from '../database'

export async function deleteMealController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { sub: userId } = request.user

  const updateMealParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = updateMealParamsSchema.parse(request.params)

  await knex('meals')
    .where({
      id,
      user_id: userId,
    })
    .delete()

  return reply.code(204).send()
}
