import { completeTask } from '@/controllers/complete-task-controller'
import { createTask } from '@/controllers/create-task-controller'
import { deleteTask } from '@/controllers/delete-task-controller'
import { importTasks } from '@/controllers/import-tasks-controller'
import { listTasks } from '@/controllers/list-tasks-controller'
import { updateTask } from '@/controllers/update-task-controller'
import { FastifyInstance } from 'fastify'

export async function tasksRoutes(app: FastifyInstance) {
  app.post('/', createTask)
  app.get('/', listTasks)
  app.put('/:id', updateTask)
  app.delete('/:id', deleteTask)
  app.patch('/:id/complete', completeTask)
  app.post('/import', importTasks)
}
