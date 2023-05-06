import { randomUUID } from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { knex } from '../database'

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
  })

  const { name, email, password } = createUserBodySchema.parse(request.body)

  const userAlreadyExists = await knex('users').where('email', email).first()

  if (userAlreadyExists) {
    return reply.code(400).send({
      error: 'User already exists',
    })
  }

  await knex('users').insert({
    id: randomUUID(),
    name,
    email,
    password,
  })

  return reply.code(201).send()
}
