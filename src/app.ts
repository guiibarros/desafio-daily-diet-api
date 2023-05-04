import fastify from 'fastify'

import cookie from '@fastify/cookie'

import { routes } from './routes'

const app = fastify({ logger: true })

app.register(cookie)
app.register(routes)

export { app }
