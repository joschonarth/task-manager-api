import { TasksRepository } from '@/repositories/tasks-repository'
import { AppError } from '@/utils/app-error'
import { FastifyReply, FastifyRequest } from 'fastify'

interface Params {
  id: string
}

export async function deleteTask(
  request: FastifyRequest<{ Params: Params }>,
  reply: FastifyReply,
) {
  const { id } = request.params

  try {
    const taskDeleted = await TasksRepository.delete(id)

    if (!taskDeleted) {
      return reply.status(404).send({ message: 'Task not found' })
    }

    return reply.status(200).send({ message: 'Task removed successfully' })
  } catch (error) {
    throw new AppError('Error deleting task')
  }
}
