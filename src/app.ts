import fastify from 'fastify'

import cookie from '@fastify/cookie'
import jwt from '@fastify/jwt'

import { env } from './env'
import { routes } from './routes'

const app = fastify({ logger: true })

app.register(cookie)

app.register(jwt, {
  secret: env.JWT_SECRET,
})

app.register(routes)

export { app }
