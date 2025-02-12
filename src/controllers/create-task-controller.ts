import { TasksRepository } from '@/repositories/tasks-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createTask(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    title: z.string(),
    description: z.string(),
  })

  const { title, description } = createBodySchema.parse(request.body)

  const task = await TasksRepository.create({ title, description })

  return reply.status(201).send(task)
}
