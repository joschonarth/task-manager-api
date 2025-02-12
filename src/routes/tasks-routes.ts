import { createTask } from '@/controllers/create-task-controller'
import { listTasks } from '@/controllers/list-tasks-controller'
import { FastifyInstance } from 'fastify'

export async function tasksRoutes(app: FastifyInstance) {
  app.post('/', createTask)
  app.get('/', listTasks)
}
