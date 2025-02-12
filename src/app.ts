import fastify from 'fastify'
import { tasksRoutes } from './routes/tasks-routes'

export const app = fastify()

app.register(tasksRoutes, { prefix: '/tasks' })
