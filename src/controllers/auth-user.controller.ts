import { compare } from 'bcrypt'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { knex } from '../database'

export async function authUserController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authUserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authUserSchema.parse(request.body)

  const user = await knex('users').where('email', email).first()

  if (!user) {
    return reply.code(401).send({
      error: {
        message: 'Invalid email or password',
      },
    })
  }

  const isPasswordValid = await compare(password, user.password)

  if (!isPasswordValid) {
    return reply.code(401).send({
      error: 'Invalid email or password',
    })
  }

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: user.id,
        expiresIn: '1d',
      },
    },
  )

  return {
    user: {
      name: user.name,
    },
    token,
  }
}
