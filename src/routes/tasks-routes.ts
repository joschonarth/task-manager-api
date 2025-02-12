import { createTask } from '@/controllers/create-task-controller'
import { FastifyInstance } from 'fastify'

export async function tasksRoutes(app: FastifyInstance) {
  app.post('/', createTask)
}
