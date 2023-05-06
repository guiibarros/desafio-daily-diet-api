import { FastifyRequest } from 'fastify'

import { knex } from '../database'

export async function listMealsController(request: FastifyRequest) {
  const { sub: userId } = request.user

  const meals = await knex('meals')
    .where('user_id', userId)
    .orderBy('mealed_at')
    .select()

  return {
    meals,
  }
}
