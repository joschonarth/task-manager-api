import { TasksRepository } from '@/repositories/tasks-repository'
import { Task } from '@/schemas/tasks-schema'
import { updateTaskSchema } from '@/schemas/update-task-schema'
import { AppError } from '@/utils/app-error'
import { FastifyReply, FastifyRequest } from 'fastify'

interface Params {
  id: string
}

export async function updateTask(
  request: FastifyRequest<{ Params: Params; Body: Partial<Task> }>,
  reply: FastifyReply,
) {
  const parseResult = updateTaskSchema.safeParse(request.body)

  if (!parseResult.success) {
    return reply.status(400).send({
      message: 'Invalid request data',
      errors: parseResult.error.errors,
    })
  }

  const { id } = request.params
  const { title, description } = request.body

  try {
    const updatedTask = await TasksRepository.update(id, { title, description })

    if (!updatedTask) {
      return reply.status(404).send({ message: 'Task not found' })
    }

    return reply.status(200).send({ task: updatedTask })
  } catch (error) {
    throw new AppError('Error updating task')
  }
}
