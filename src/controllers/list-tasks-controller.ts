import { TasksRepository } from '@/repositories/tasks-repository'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listTasks(request: FastifyRequest, reply: FastifyReply) {
  const { title, description } = request.query as {
    title?: string
    description?: string
  }

  const tasks = await TasksRepository.findAll({
    title,
    description,
  })

  return reply.status(200).send({ tasks })
}
