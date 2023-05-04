import { FastifyRequest } from 'fastify'

import { knex } from '../database'

export async function listMealsController(request: FastifyRequest) {
  const { sessionId } = request.cookies

  const meals = await knex('meals').where('session_id', sessionId).select()

  return {
    meals,
  }
}
