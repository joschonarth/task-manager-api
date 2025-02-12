import { TasksRepository } from '@/repositories/tasks-repository'
import { AppError } from '@/utils/app-error'
import { FastifyReply, FastifyRequest } from 'fastify'

interface Params {
  id: string
}

export async function completeTask(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
) {
  const { id } = request.params

  try {
    const completedTask = await TasksRepository.complete(id)

    if (!completedTask) {
      return reply.status(404).send({ message: 'Task not found' })
    }

    return reply.status(200).send({ task: completedTask })
  } catch (error) {
    throw new AppError('Error updating task')
  }
}
