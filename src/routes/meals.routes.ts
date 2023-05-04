import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'

import { knex } from '../database'

export async function mealsRoutes(app: FastifyInstance) {
  app.get('/', async (request) => {
    const { sessionId } = request.cookies

    const meals = await knex('meals').where('session_id', sessionId).select()

    return {
      meals,
    }
  })

  app.post('/', async (request, reply) => {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      mealedAt: z.string(),
      inDiet: z.boolean(),
    })

    const { name, description, mealedAt, inDiet } = createMealBodySchema.parse(
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
      in_diet: inDiet,
    })

    return reply.code(201).send()
  })

  app.put('/:id', async (request, reply) => {
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

    await knex('meals').where('id', id).update({
      name,
      description,
      mealed_at: mealedAt,
      in_diet: inDiet,
    })

    return reply.code(204).send()
  })
}
