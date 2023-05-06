import { FastifyRequest } from 'fastify'
import { Meal } from 'knex/types/tables'

import { knex } from '../database'

export async function getSummaryController(request: FastifyRequest) {
  const { sub: userId } = request.user

  const meals = await knex('meals')
    .where('user_id', userId)
    .orderBy('mealed_at')
    .select()

  const summary = getSummary(meals)

  return {
    summary,
  }
}

function getSummary(meals: Meal[]) {
  const { dietMeals, nonDietMeals } = meals.reduce(
    (acc, meal) => {
      if (meal.is_diet) {
        acc.dietMeals += 1
        return acc
      }

      acc.nonDietMeals += 1
      return acc
    },
    {
      dietMeals: 0,
      nonDietMeals: 0,
    },
  )

  const bestDietSequence = getBestDietSequence(meals)
  const total = meals.length
  const dietRate = dietMeals / total

  return {
    dietMeals,
    nonDietMeals,
    total,
    dietRate,
    bestDietSequence,
  }
}

function getBestDietSequence(meals: Meal[]) {
  let bestDietSequence = 0
  let currentDietSequence = 0

  meals.forEach((meal) => {
    if (meal.is_diet) {
      currentDietSequence += 1
    } else {
      currentDietSequence = 0
    }

    if (currentDietSequence > bestDietSequence) {
      bestDietSequence = currentDietSequence
    }
  })

  return bestDietSequence
}
