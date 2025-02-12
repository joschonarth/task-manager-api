import { TasksRepository } from '@/repositories/tasks-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as fastcsv from 'fast-csv'
import { Readable } from 'stream'
import { AppError } from '@/utils/app-error'

interface TaskCSV {
  title: string
  description?: string
  completed_at?: string
}

export async function importTasks(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data: Array<{
    title: string
    description?: string
    completed_at: Date | null
    created_at: string
    updated_at: string
  }> = []

  try {
    if (!request.isMultipart()) {
      return reply.status(400).send({ message: 'Invalid content type' })
    }

    const parts = request.parts()

    for await (const part of parts) {
      if (part.type === 'file') {
        const stream = Readable.from(part.file)

        await new Promise<void>((resolve, reject) => {
          fastcsv
            .parseStream(stream, { headers: true })
            .on('data', (row: TaskCSV) => {
              data.push({
                title: row.title,
                description: row.description || undefined,
                completed_at: row.completed_at
                  ? new Date(row.completed_at)
                  : null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              })
            })
            .on('end', resolve)
            .on('error', reject)
        })
      }
    }

    if (data.length > 0) {
      await TasksRepository.createMany(data)
    }

    return reply.status(200).send({ message: 'Tasks imported successfully' })
  } catch (error) {
    throw new AppError('Error importing tasks', 500)
  }
}
