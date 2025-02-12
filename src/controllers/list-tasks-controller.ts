import { TasksRepository } from '@/repositories/tasks-repository'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listTasks(request: FastifyRequest, reply: FastifyReply) {
  const tasks = await TasksRepository.findAll()

  return reply.status(200).send({ tasks })
}
