import { FastifyReply, FastifyRequest } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'

import { knex } from '../database'

export async function createMealController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    mealedAt: z.string(),
    isDiet: z.boolean(),
  })

  const { name, description, mealedAt, isDiet } = createMealBodySchema.parse(
    request.body,
  )

  let { sessionId } = request.cookies

  if (!sessionId) {
    sessionId = randomUUID()

    reply.setCookie('sessionId', sessionId, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })
  }

  await knex('meals').insert({
    id: randomUUID(),
    session_id: sessionId,
    name,
    description,
    mealed_at: mealedAt,
    is_diet: isDiet,
  })

  return reply.code(201).send()
}
